'use client'

import { m } from 'framer-motion'
import Image from 'next/image'

/**
 * Full-scene micro-agent texture layer.
 *
 * Variant switching — set in .env.local:
 *   NEXT_PUBLIC_AGENTS_VARIANT=2   → lobster scatter field  (micro-agents-v2.webp)
 *   NEXT_PUBLIC_AGENTS_VARIANT=1   → pillbug / isopod field (micro-agents.webp)  ← default
 *
 * Animation: the entire layer oscillates vertically (easeInOut, 20s loop),
 * simulating agents slowly drifting through the field.
 */
const SRC =
  process.env.NEXT_PUBLIC_AGENTS_VARIANT === '2'
    ? '/assets/micro-agents-v2.webp'
    : '/assets/micro-agents.webp'

export default function MicroAgentsLayer() {
  return (
    /*
     * Outer div: strict clip boundary.
     * overflow-hidden here clips BOTH the visual content and the browser's
     * hit-testing area, so the extended inner div can never absorb clicks
     * intended for CTAs or other interactive elements below.
     */
    <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
      <m.div
        className="absolute inset-x-0 pointer-events-none"
        style={{ top: '-5%', bottom: '-5%', willChange: 'transform' }}
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src={SRC}
          alt=""
          fill
          className="object-cover opacity-40"
          aria-hidden
        />
      </m.div>
    </div>
  )
}
