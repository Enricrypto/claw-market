"use client"

import { m } from "framer-motion"
import CTA from "./CTA"

export default function Hero() {
  return (
    <section className='relative w-full h-screen overflow-hidden flex items-center justify-center'>
      {/* ── Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className='absolute inset-0 w-full h-full object-cover z-0'
        src='/assets/hero-video.mp4'
      />

      {/* ── Dark overlay for text readability */}
      <div
        className='absolute inset-0 z-1 pointer-events-none'
        style={{ background: "rgba(11,13,20,0.55)" }}
      />

      {/* ── Radial underlay — dark ellipse centred on the text column */}
      <div
        className='absolute inset-0 z-2 pointer-events-none'
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 52%, rgba(0,0,0,0.65) 0%, transparent 100%)"
        }}
      />

      <div className='relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto'>
        {/* ── Headline */}
        <m.h1
          className='font-space text-4xl sm:text-5xl md:text-8xl font-bold tracking-tight leading-[1.05] mb-6 text-[#00ffff]'
          style={{
            textShadow: "0 0 4px #000, 0 0 10px #000, 0 0 22px rgba(0,0,0,0.85)"
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          The Brain of
          <br />
          Autonomous Commerce
        </m.h1>

        {/* ── Subheadline */}
        <m.p
          className='font-inter text-base sm:text-lg md:text-xl text-primary/90 max-w-2xl mb-10 sm:mb-12 leading-relaxed drop-shadow-md'
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          ClawMind orchestrates complex tasks into structured workflows -
          planning with AI, executing with x402 payments, and composing results
          into real economic output.
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
