/**
 * claw-market — asset pipeline
 *
 * Input:   app/raw-files/   (falls back to app/raw-assets/ if not found)
 * Output:  public/assets/
 *
 * Kinds:
 *   agent      — luminosity-to-alpha mask → transparent PNG, trimmed, ≤ 1024 px
 *   background — keep black bg → WebP, ≤ 1920 px wide
 *   pass       — already transparent → compressed PNG
 *   favicon    — luminosity mask + ICO (16 × 32 embedded PNG)
 *
 * Run:   npm run process-assets
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

// ─── Config ───────────────────────────────────────────────────────────────────

const OUT_DIR = path.resolve(process.cwd(), 'public', 'assets')

const MAX_AGENT_PX   = 1024
const MAX_BG_PX      = 1920
/** Grid-agent sprites are centered on this square canvas for visual parity */
const AGENT_CANVAS_PX = 512

/**
 * Alpha mapping constants:
 *   NOISE_FLOOR    — luminosity below this → alpha 0 (clip black background / noise)
 *   BODY_THRESHOLD — luminosity at or above this → alpha 255 (solid body)
 *
 * In between, alpha ramps linearly from 0 → 255, giving a soft glow fade.
 *
 * Why the threshold matters:
 *   Without it, dark-colored sprites (e.g. dark teal base agent, lum ≈ 60–80)
 *   get only 25–30% alpha, making them visually smaller than brighter sprites.
 *   Setting BODY_THRESHOLD = 60 guarantees all body pixels are fully opaque
 *   while preserving the glow transition for faint outer-glow pixels.
 */
const NOISE_FLOOR    = 10
const BODY_THRESHOLD = 60

// ─── Source directory detection ───────────────────────────────────────────────

function resolveRawDir(): string {
  const candidates = [
    path.resolve(process.cwd(), 'app', 'raw-files'),
    path.resolve(process.cwd(), 'app', 'raw-assets'),
  ]
  for (const d of candidates) {
    if (fs.existsSync(d)) return d
  }
  throw new Error(
    `Raw assets directory not found. Checked:\n${candidates.map(d => `  ${d}`).join('\n')}`
  )
}

// ─── Manifest ─────────────────────────────────────────────────────────────────

/**
 * brightnessBoost — optional multiplier applied via sharp.modulate() BEFORE
 * the luminosity mask.  Use this for sprites whose body colours are too dark
 * to be visible on the site's dark background (e.g. the dark-teal base agent).
 * A value of 2.5 triples perceived lightness while keeping pure black at zero,
 * so the background removal still works correctly.
 */
type AgentEntry      = { kind: 'agent';      input: string; output: string; normalize?: number; brightnessBoost?: number; chromaKey?: boolean }
type BackgroundEntry = { kind: 'background'; input: string; output: string }
type PassEntry       = { kind: 'pass';       input: string; output: string }
type FaviconEntry    = { kind: 'favicon';    input: string }
type Entry = AgentEntry | BackgroundEntry | PassEntry | FaviconEntry

/**
 * Manifest — defines every file processed and its output name.
 *
 * Background variants:
 *   network-grid.webp    → network_grid_bg_var2  (flat cyan grid — primary)
 *   network-grid-v2.webp → network_grid_bg_var1  (cinematic 3D nodes — alternate)
 *   micro-agents.webp    → micro_agents_bg_var1  (pillbug field — primary)
 *   micro-agents-v2.webp → micro_agents_bg_var2  (lobster field — alternate)
 *
 * To switch variants at runtime, set NEXT_PUBLIC_GRID_VARIANT or
 * NEXT_PUBLIC_AGENTS_VARIANT to "2" in .env.local — see component notes.
 */
const MANIFEST: Entry[] = [
  // ── Agents (transparent PNG)
  { kind: 'agent', input: 'hero_master.png',                output: 'hero-lobster.png'          },
  { kind: 'agent', input: 'base_agent_var1.png',            output: 'base-agent.png',            normalize: AGENT_CANVAS_PX, chromaKey: true },
  { kind: 'agent', input: 'trading_agent_var2.png',         output: 'trading-agent.png',         normalize: AGENT_CANVAS_PX },
  { kind: 'agent', input: 'compute_agent_var2.png',         output: 'compute-agent.png',         normalize: AGENT_CANVAS_PX },
  { kind: 'agent', input: 'high_reputation_agent_var2.png', output: 'high-reputation-agent.png', normalize: AGENT_CANVAS_PX },
  { kind: 'agent', input: 'clawmind-logo.png',               output: 'logo.png'                  },

  // ── Already transparent
  { kind: 'pass', input: 'claw-marketplace.png', output: 'claw-marketplace.png' },

  // ── Backgrounds (WebP, black bg preserved)
  //    var2 = crisp engineering grid      → PRIMARY  (network-grid.webp)
  //    var1 = cinematic 3D network nodes  → ALTERNATE (network-grid-v2.webp)
  { kind: 'background', input: 'network_grid_bg_var2.png', output: 'network-grid.webp'    },
  { kind: 'background', input: 'network_grid_bg_var1.png', output: 'network-grid-v2.webp' },

  //    var1 = pillbug / isopod field → PRIMARY  (micro-agents.webp)
  //    var2 = lobster scatter field  → ALTERNATE (micro-agents-v2.webp)
  { kind: 'background', input: 'micro_agents_bg_var1.png', output: 'micro-agents.webp'    },
  { kind: 'background', input: 'micro_agents_bg_var2.png', output: 'micro-agents-v2.webp' },

  // ── Favicon (dedicated icon, background removed)
  { kind: 'favicon', input: 'favicon.png' },
]

// ─── Luminosity-to-alpha mask ─────────────────────────────────────────────────
//
//  alpha = max(R, G, B)
//
//  Why this works for black-background sprites:
//    • Pure black (0,0,0)         → alpha 0   — invisible
//    • Solid pixel (0,200,200)    → alpha 200 — fully reads on dark bg
//    • Soft glow (0,60,60)        → alpha 60  — naturally semi-transparent
//
//  The NOISE_FLOOR clips residual near-black noise to exactly alpha 0,
//  preventing a grey fringe around hard-edged pixel-art sprites.

// ─── Body bounds ──────────────────────────────────────────────────────────────
//
//  Scans the masked pixel buffer and returns the tight bounding box of all
//  fully-opaque (alpha = 255) body pixels.  Glow pixels that received partial
//  alpha in the ramp zone are intentionally excluded so that the crop is based
//  on the real sprite body — not the ambient glow radius.
//
//  This is the key fix for visual size consistency: every sprite is cropped to
//  its body extent before being scaled to the canvas, so agents with a small
//  glow (e.g. dark-teal base agent) are scaled up to the same visual size as
//  agents with a large bright glow (e.g. gold high-rep agent).

interface Bounds { left: number; top: number; right: number; bottom: number }

function findBodyBounds(pixels: Uint8Array, width: number, height: number): Bounds | null {
  let left = width, top = height, right = -1, bottom = -1
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (pixels[(y * width + x) * 4 + 3] === 255) {
        if (x < left)   left   = x
        if (x > right)  right  = x
        if (y < top)    top    = y
        if (y > bottom) bottom = y
      }
    }
  }
  return right >= 0 ? { left, top, right, bottom } : null
}

function applyLuminosityMask(pixels: Uint8Array): void {
  for (let i = 0; i < pixels.length; i += 4) {
    const lum = Math.max(pixels[i], pixels[i + 1], pixels[i + 2])
    if (lum < NOISE_FLOOR) {
      pixels[i + 3] = 0
    } else if (lum >= BODY_THRESHOLD) {
      pixels[i + 3] = 255
    } else {
      // Linear ramp in the glow zone: NOISE_FLOOR→0, BODY_THRESHOLD→255
      pixels[i + 3] = Math.round((lum - NOISE_FLOOR) / (BODY_THRESHOLD - NOISE_FLOOR) * 255)
    }
  }
}

// ─── Chroma-key mask ──────────────────────────────────────────────────────────
//
//  Used for sprites whose background is NOT black (e.g. a flat grey canvas).
//  Samples the average colour of the top-left 8×8 corner block to determine
//  the background colour, then keys out any pixel within CHROMA_HARD px of
//  that colour.  Pixels between CHROMA_SOFT and CHROMA_HARD get a linear
//  alpha ramp for a soft edge on anti-aliased or vignette borders.

const CHROMA_HARD = 28   // distance below this → alpha 0
const CHROMA_SOFT = 60   // distance above this → alpha 255

function applyChromaKeyMask(pixels: Uint8Array, width: number, height: number): void {
  // Sample background colour from the top-left 8×8 corner
  let sumR = 0, sumG = 0, sumB = 0, count = 0
  const sampleSize = Math.min(8, width, height)
  for (let y = 0; y < sampleSize; y++) {
    for (let x = 0; x < sampleSize; x++) {
      const idx = (y * width + x) * 4
      sumR += pixels[idx]; sumG += pixels[idx + 1]; sumB += pixels[idx + 2]
      count++
    }
  }
  const bgR = sumR / count, bgG = sumG / count, bgB = sumB / count

  for (let i = 0; i < pixels.length; i += 4) {
    const dist = Math.max(
      Math.abs(pixels[i]     - bgR),
      Math.abs(pixels[i + 1] - bgG),
      Math.abs(pixels[i + 2] - bgB),
    )
    if (dist <= CHROMA_HARD) {
      pixels[i + 3] = 0
    } else if (dist >= CHROMA_SOFT) {
      pixels[i + 3] = 255
    } else {
      pixels[i + 3] = Math.round((dist - CHROMA_HARD) / (CHROMA_SOFT - CHROMA_HARD) * 255)
    }
  }
}

// ─── Processors ───────────────────────────────────────────────────────────────

async function processAgent(
  rawDir: string,
  input: string,
  output: string,
  normalize?: number,
  brightnessBoost?: number,
  chromaKey?: boolean,
): Promise<void> {
  const src = path.join(rawDir, input)
  const dst = path.join(OUT_DIR, output)

  const meta = await sharp(src).metadata()
  const needsResize = (meta.width ?? 0) > MAX_AGENT_PX || (meta.height ?? 0) > MAX_AGENT_PX

  let pipeline = needsResize
    ? sharp(src).resize(MAX_AGENT_PX, MAX_AGENT_PX, { fit: 'inside', kernel: 'nearest' })
    : sharp(src)

  const { data, info } = await pipeline
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const pixels = new Uint8Array(data)

  // Selectively boost brightness on sprite pixels only (not background vignette).
  // We check max(R,G,B) >= 20 to skip pure-black / near-black background pixels —
  // modulate() would have lifted those above NOISE_FLOOR, creating a grey halo.
  if (brightnessBoost) {
    for (let i = 0; i < pixels.length; i += 4) {
      const maxCh = Math.max(pixels[i], pixels[i + 1], pixels[i + 2])
      if (maxCh < 20) continue                                         // background — leave untouched
      pixels[i]     = Math.min(255, Math.round(pixels[i]     * brightnessBoost))
      pixels[i + 1] = Math.min(255, Math.round(pixels[i + 1] * brightnessBoost))
      pixels[i + 2] = Math.min(255, Math.round(pixels[i + 2] * brightnessBoost))
    }
  }

  if (chromaKey) {
    applyChromaKeyMask(pixels, info.width, info.height)
  } else {
    applyLuminosityMask(pixels)
  }

  const maskedPng = await sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer()

  if (normalize) {
    // Crop to the tight bounding box of fully-opaque body pixels, then scale
    // to the canvas.  This ensures every sprite fills the same visual area
    // regardless of how large or dim its surrounding glow is.
    const bounds = findBodyBounds(pixels, info.width, info.height)
    if (!bounds) throw new Error(`No body pixels found in ${input}`)

    const spriteSpan = Math.max(bounds.right - bounds.left + 1, bounds.bottom - bounds.top + 1)
    const pad        = Math.round(spriteSpan * 0.06)  // 6 % padding around body

    const cropLeft   = Math.max(0, bounds.left   - pad)
    const cropTop    = Math.max(0, bounds.top    - pad)
    const cropRight  = Math.min(info.width  - 1, bounds.right  + pad)
    const cropBottom = Math.min(info.height - 1, bounds.bottom + pad)

    await sharp(maskedPng)
      .extract({
        left:   cropLeft,
        top:    cropTop,
        width:  cropRight  - cropLeft  + 1,
        height: cropBottom - cropTop   + 1,
      })
      .resize(normalize, normalize, {
        fit:        'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
        kernel:     'lanczos3',
      })
      .png({ compressionLevel: 9, palette: false })
      .toFile(dst)
  } else {
    await sharp(maskedPng)
      .trim()
      .png({ compressionLevel: 9, palette: false })
      .toFile(dst)
  }
}

async function processBackground(rawDir: string, input: string, output: string): Promise<void> {
  const src = path.join(rawDir, input)
  const dst = path.join(OUT_DIR, output)

  const meta = await sharp(src).metadata()
  const needsResize = (meta.width ?? 0) > MAX_BG_PX

  const pipeline = needsResize
    ? sharp(src).resize(MAX_BG_PX, undefined, { fit: 'inside', kernel: 'lanczos3' })
    : sharp(src)

  await pipeline.webp({ quality: 90, effort: 6 }).toFile(dst)
}

async function processPass(rawDir: string, input: string, output: string): Promise<void> {
  await sharp(path.join(rawDir, input))
    .png({ compressionLevel: 9, palette: false })
    .toFile(path.join(OUT_DIR, output))
}

// ─── ICO builder ──────────────────────────────────────────────────────────────
//
//  Packs N embedded-PNG images into a binary ICO file.
//  Modern ICO format (Vista+) supports embedded PNG blobs natively.
//
//  Layout:
//    [0..5]            ICONDIR   (6 bytes)
//    [6..6+N×16−1]     ICONDIRENTRY × N  (16 bytes each)
//    [6+N×16..]        PNG data blobs (consecutive)

function buildIco(images: Array<{ size: number; data: Buffer }>): Buffer {
  const HEADER = 6
  const ENTRY  = 16
  const count  = images.length

  let blobOffset = HEADER + count * ENTRY
  const entries = images.map(({ size, data }) => {
    const e = { size, data, offset: blobOffset }
    blobOffset += data.length
    return e
  })

  const buf = Buffer.alloc(blobOffset)
  buf.writeUInt16LE(0,     0)  // reserved
  buf.writeUInt16LE(1,     2)  // type = ICO
  buf.writeUInt16LE(count, 4)

  entries.forEach(({ size, data, offset }, i) => {
    const b = HEADER + i * ENTRY
    buf.writeUInt8(size >= 256 ? 0 : size, b)      // width  (0 = 256)
    buf.writeUInt8(size >= 256 ? 0 : size, b + 1)  // height (0 = 256)
    buf.writeUInt8(0,  b + 2)  // color count
    buf.writeUInt8(0,  b + 3)  // reserved
    buf.writeUInt16LE(1,           b + 4)   // color planes
    buf.writeUInt16LE(32,          b + 6)   // bits per pixel
    buf.writeUInt32LE(data.length, b + 8)   // image data size
    buf.writeUInt32LE(offset,      b + 12)  // image data offset
    data.copy(buf, offset)
  })

  return buf
}

async function processFavicon(rawDir: string, input: string): Promise<void> {
  const dst    = path.join(OUT_DIR, 'favicon.ico')
  const dstPng = path.join(OUT_DIR, 'favicon-192.png')

  const { data, info } = await sharp(path.join(rawDir, input))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const pixels = new Uint8Array(data)
  applyLuminosityMask(pixels)

  const maskedPng = await sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer()

  // Trim and get raw pixels for analysis
  const { data: tdata, info: tinfo } = await sharp(maskedPng)
    .trim()
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const tw = tinfo.width
  const th = tinfo.height
  const tpx = new Uint8Array(tdata)

  const trimmedPng = await sharp(Buffer.from(tdata), {
    raw: { width: tw, height: th, channels: 4 },
  })
    .png()
    .toBuffer()

  // For landscape logotypes (icon + wordmark text), detect the icon mark by
  // finding columns whose vertical span (distance from topmost to bottommost
  // opaque pixel) is large relative to the full image height.  Text glyphs
  // sit near one edge with a small span; the icon mark fills most of the height.
  let iconPng: Buffer
  if (tw > th) {
    const SPAN_THRESHOLD = th * 0.5
    let iconLeft = tw, iconRight = -1

    for (let x = 0; x < tw; x++) {
      let top = th, bot = -1
      for (let y = 0; y < th; y++) {
        if (tpx[(y * tw + x) * 4 + 3] > 30) {
          if (y < top) top = y
          if (y > bot) bot = y
        }
      }
      if (bot >= 0 && bot - top >= SPAN_THRESHOLD) {
        if (x < iconLeft)  iconLeft  = x
        if (x > iconRight) iconRight = x
      }
    }

    if (iconRight > iconLeft) {
      // Crop exactly to the icon column bounds — excludes any wordmark text
      // that sits outside those columns.  fit:'contain' at resize time will
      // letterbox the non-square crop into a clean square canvas.
      const iconW = iconRight - iconLeft + 1
      iconPng = await sharp(trimmedPng)
        .extract({ left: iconLeft, top: 0, width: iconW, height: th })
        .png()
        .toBuffer()
    } else {
      iconPng = trimmedPng
    }
  } else {
    iconPng = trimmedPng
  }

  const BG = { r: 0, g: 0, b: 0, alpha: 0 }
  const [png16, png32, png192] = await Promise.all([
    sharp(iconPng).resize(16,  16,  { fit: 'contain', background: BG, kernel: 'lanczos3' }).png().toBuffer(),
    sharp(iconPng).resize(32,  32,  { fit: 'contain', background: BG, kernel: 'lanczos3' }).png().toBuffer(),
    sharp(iconPng).resize(192, 192, { fit: 'contain', background: BG, kernel: 'lanczos3' }).png().toBuffer(),
  ])

  fs.writeFileSync(dst,    buildIco([{ size: 16, data: png16 }, { size: 32, data: png32 }]))
  fs.writeFileSync(dstPng, png192)
}

// ─── Runner ───────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n < 1024)       return `${n} B`
  if (n < 1024 ** 2)  return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1024 ** 2).toFixed(2)} MB`
}

function size(p: string): number {
  try { return fs.statSync(p).size } catch { return 0 }
}

async function run(): Promise<void> {
  const rawDir = resolveRawDir()
  fs.mkdirSync(OUT_DIR, { recursive: true })

  console.log('\nclaw-market — asset pipeline')
  console.log('─'.repeat(64))
  console.log(`  src : ${rawDir}`)
  console.log(`  dest: ${OUT_DIR}`)
  console.log('─'.repeat(64))

  let totalIn = 0
  let totalOut = 0

  for (const entry of MANIFEST) {
    const label =
      entry.kind === 'favicon'
        ? `${entry.input} → favicon.ico`
        : `${entry.input} → ${entry.output}`

    process.stdout.write(`  [${entry.kind.padEnd(10)}] ${label} … `)

    const srcPath = path.join(rawDir, entry.input)
    const dstPath =
      entry.kind === 'favicon'
        ? path.join(OUT_DIR, 'favicon.ico')
        : path.join(OUT_DIR, (entry as AgentEntry | BackgroundEntry | PassEntry).output)

    const inSize = size(srcPath)
    totalIn += inSize

    try {
      switch (entry.kind) {
        case 'agent':      await processAgent(rawDir, entry.input, entry.output, entry.normalize, entry.brightnessBoost, entry.chromaKey); break
        case 'background': await processBackground(rawDir, entry.input, entry.output); break
        case 'pass':       await processPass(rawDir, entry.input, entry.output);       break
        case 'favicon':    await processFavicon(rawDir, entry.input);                  break
      }

      const outSize = size(dstPath)
      totalOut += outSize
      const delta = inSize > 0 ? Math.round((1 - outSize / inSize) * 100) : 0
      const tag = delta > 0 ? `-${delta}%` : `+${Math.abs(delta)}%`
      console.log(`done  (${fmt(inSize)} → ${fmt(outSize)}, ${tag})`)
    } catch (err) {
      console.log('FAILED')
      console.error(`    ↳ ${(err as Error).message}`)
    }
  }

  const totalDelta = totalIn > 0 ? Math.round((1 - totalOut / totalIn) * 100) : 0
  console.log('─'.repeat(64))
  console.log(`  total: ${fmt(totalIn)} → ${fmt(totalOut)}  (${totalDelta > 0 ? `-${totalDelta}%` : `+${Math.abs(totalDelta)}%`} saved)\n`)
}

run().catch(err => { console.error(err); process.exit(1) })
