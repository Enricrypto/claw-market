'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'

/**
 * HeroLobster — three independent animation layers, composited via nesting:
 *
 *  Layer A (outermost): mouse parallax
 *    Follows cursor with spring physics. Max ±13 px translation.
 *
 *  Layer B (middle): vertical float
 *    Sinusoidal bob (0 → −14 px → 0), 6 s loop, easeInOut.
 *    Makes the lobster feel weightless / hovering.
 *
 *  Layer C (innermost): glow pulse
 *    CSS drop-shadow animates between dim and bright, 3.5 s loop.
 *    Delayed 0.8 s so float and glow peaks feel independent.
 *    Accent blue (#3AA8FF) on the white pixel sprite.
 */

const SPRING     = { stiffness: 40, damping: 18, mass: 0.6 }
const MAX_OFFSET = 13

const GLOW_DIM    = 'drop-shadow(0 0  6px rgba(58,168,255,0.25)) drop-shadow(0 0 18px rgba(58,168,255,0.08))'
const GLOW_BRIGHT = 'drop-shadow(0 0 18px rgba(58,168,255,0.75)) drop-shadow(0 0 48px rgba(58,168,255,0.25))'

export default function HeroLobster() {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, SPRING)
  const y = useSpring(rawY, SPRING)

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      rawX.set(((e.clientX - cx) / cx) * MAX_OFFSET)
      rawY.set(((e.clientY - cy) / cy) * MAX_OFFSET)
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [rawX, rawY])

  return (
    // Layer A — mouse parallax
    <motion.div
      className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none"
      style={{ x, y, opacity: 0.88, filter: 'brightness(1.6) saturate(0.65)', willChange: 'transform' }}
    >
      {/* Layer B — vertical float */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform' }}
        className="pointer-events-none"
      >
        {/* Layer C — glow pulse */}
        <motion.div
          animate={{ filter: [GLOW_DIM, GLOW_BRIGHT, GLOW_DIM] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="relative w-115 h-115 md:w-165 md:h-165 pointer-events-none"
        >
          <Image
            src="/assets/hero-lobster.png"
            alt="Claw Market"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
