"use client"

import { m } from "framer-motion"
import NetworkLayer from "./NetworkLayer"
import MicroAgentsLayer from "./MicroAgentsLayer"
import HeroLobster from "./HeroLobster"
import CTA from "./CTA"

/**
 * Hero layer stack (back → front):
 *
 *   z-0   NetworkLayer      — static grid texture, opacity 0.18, slow x-drift
 *   z-1   MicroAgentsLayer  — full-scene agent field, opacity 0.40, vertical oscillation
 *   z-2   HeroLobster       — main sprite: mouse parallax + float + glow pulse
 *   z-10  Copy + CTA        — staggered entrance, cyan headline
 *
 * ─── GRADIENT VARIANT ────────────────────────────────────────────────────────
 * To switch the headline from solid cyan to a top-white / bottom-cyan gradient,
 * replace the <m.h1> className + add the style prop (shown in the comment
 * block directly below the active h1).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export default function Hero() {
  return (
    <section className='relative w-full h-screen overflow-hidden flex items-center justify-center'>
      <NetworkLayer />
      <MicroAgentsLayer />
      <HeroLobster />

      {/* ── Radial underlay — dark ellipse centred on the text column */}
      <div
        className='absolute inset-0 z-5 pointer-events-none'
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 52%, rgba(0,0,0,0.72) 0%, transparent 100%)"
        }}
      />

      <div className='relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto'>
        {/* ── Headline — solid cyan variant (active) */}
        <m.h1
          className='font-space text-4xl sm:text-5xl md:text-8xl font-bold tracking-tight leading-[1.05] mb-6 text-[#00ffff]'
          style={{
            textShadow: "0 0 4px #000, 0 0 10px #000, 0 0 22px rgba(0,0,0,0.85)"
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          AI Agents That
          <br />
          Work For You
        </m.h1>

        {/*
          ── Headline — gradient variant (top-white / bottom-cyan)
          Replace the h1 above with this block to enable the gradient:

          <m.h1
            className="font-space text-6xl md:text-8xl font-bold tracking-tight leading-[1.05] mb-6 drop-shadow-lg"
            style={{
              background: 'linear-gradient(to bottom, #ffffff 10%, #00ffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Autonomous Capital
            <br />
            Infrastructure
          </m.h1>
        */}

        {/* ── Subheadline */}
        <m.p
          className='font-inter text-base sm:text-lg md:text-xl text-primary/90 max-w-2xl mb-10 sm:mb-12 leading-relaxed drop-shadow-md'
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Deploy autonomous agents that write content, post on social media,
          execute trades, run automations - and earn from everything they do,
          24/7.
        </m.p>

        {/* ── CTAs */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <CTA />
        </m.div>
      </div>
    </section>
  )
}
