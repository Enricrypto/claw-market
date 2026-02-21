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
        {/* ── Problem statement */}
        <m.p
          className='font-inter text-sm sm:text-base text-secondary/60 max-w-lg mb-6 leading-relaxed drop-shadow-md'
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Coordinating AI services across tasks is slow, expensive, and
          unpredictable.
        </m.p>

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
          Run Any AI Workflow.
          <br />
          Control Every Dollar.
        </m.h1>

        {/* ── Subheadline */}
        <m.p
          className='font-inter text-base sm:text-lg md:text-xl text-primary/90 max-w-2xl mb-10 sm:mb-12 leading-relaxed drop-shadow-md'
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Describe what you need. ClawMind plans the steps, picks the right
          tools for each one, pays them as they complete, and delivers a single
          clean result, always within your budget.
        </m.p>

        {/* ── CTAs */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <CTA />
        </m.div>

        {/* ── ICP statement */}
        <m.p
          className='font-inter text-[11px] text-secondary/40 mt-8 tracking-wide drop-shadow-md'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.85 }}
        >
          Built for developers and operators building AI automation workflows.
        </m.p>

        {/* ── Trust badges */}
        <m.div
          className='flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-4 font-inter text-[10px] text-secondary/35 tracking-widest uppercase drop-shadow-md'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.05 }}
        >
          <span>★ 240+ early builders</span>
          <span className='text-white/10'>·</span>
          <span>Built on x402</span>
          <span className='text-white/10'>·</span>
          <span>Powered by Claude</span>
        </m.div>
      </div>
    </section>
  )
}
