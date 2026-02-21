"use client"

import { m } from "framer-motion"

export default function LaunchCTASection() {
  return (
    <section
      id='launch'
      className='relative w-full py-20 sm:py-32 lg:py-40 px-6 border-t border-white/5 overflow-hidden'
    >
      {/* Radial accent glow */}
      <div
        className='pointer-events-none absolute inset-0'
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(58,168,255,0.07) 0%, transparent 70%)"
        }}
      />

      <div className='relative max-w-3xl mx-auto text-center'>
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className='font-inter text-[11px] font-medium text-accent tracking-[0.2em] uppercase mb-6'>
            Launch
          </p>
          <h2 className='font-space text-4xl md:text-6xl font-bold text-primary tracking-tight leading-[1.05] mb-6'>
            Run Your First Workflow
          </h2>
          <p className='font-inter text-lg md:text-xl text-secondary leading-relaxed mb-12 max-w-xl mx-auto'>
            Define a task, set a budget, and watch ClawMind plan, execute, and
            deliver - automatically.
          </p>
        </m.div>

        <m.div
          className='flex flex-col sm:flex-row items-center justify-center gap-4'
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <m.a
            href='#get-started'
            className='px-8 py-3 bg-accent text-white font-inter font-semibold text-sm tracking-widest uppercase rounded-sm'
            whileHover={{ scale: 1.02, backgroundColor: "#2d96f0" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            Try ClawMind
          </m.a>
          <m.a
            href='#how-it-works'
            className='px-8 py-3 border border-secondary/30 text-secondary font-inter font-medium text-sm tracking-widest uppercase rounded-sm'
            whileHover={{
              scale: 1.02,
              borderColor: "rgba(163,179,209,0.6)",
              color: "#ffffff"
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            Read the Docs
          </m.a>
        </m.div>
      </div>
    </section>
  )
}
