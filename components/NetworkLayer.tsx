'use client'

import { m } from 'framer-motion'
import Image from 'next/image'

/**
 * Variant switching — set in .env.local:
 *   NEXT_PUBLIC_GRID_VARIANT=2   → cinematic 3D network (network-grid-v2.webp)
 *   NEXT_PUBLIC_GRID_VARIANT=1   → crisp engineering grid (network-grid.webp)  ← default
 */
const SRC =
  process.env.NEXT_PUBLIC_GRID_VARIANT === '2'
    ? '/assets/network-grid-v2.webp'
    : '/assets/network-grid.webp'

export default function NetworkLayer() {
  return (
    <m.div
      className="absolute inset-0 z-0 pointer-events-none"
      animate={{ x: [0, -24, 0] }}
      transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      style={{ willChange: 'transform' }}
    >
      <Image
        src={SRC}
        alt=""
        fill
        className="object-cover opacity-[0.18]"
        priority
        aria-hidden
      />
    </m.div>
  )
}
