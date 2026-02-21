"use client"

import { m } from "framer-motion"

const PROPS = [
  {
    stat: "AI-First Planning",
    headline: "Structured Before Execution",
    body: "ClawMind decomposes any task into a validated JSON plan before a single API call is made. No guessing. No waste.",
    accent: "#00e5ff"
  },
  {
    stat: "Budget-Constrained",
    headline: "Runs Within Your Limits",
    body: "Every workflow executes within a predefined cost ceiling. ClawMind selects the cheapest viable service combination automatically.",
    accent: "#3aa8ff"
  },
  {
    stat: "Profit-Visible",
    headline: "See Every Dollar Earned",
    body: "Receive a full breakdown of what was paid, what was earned, and the orchestration margin captured on every run.",
    accent: "#a855f7"
  }
]

export default function ValuePropsSection() {
  return (
    <section className='relative w-full border-t border-white/[0.05] py-16 sm:py-20 px-6'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.05] rounded-sm overflow-hidden'>
        {PROPS.map((p, i) => (
          <m.div
            key={p.headline}
            className='bg-background p-8 sm:p-10 flex flex-col gap-4'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            {/* Stat / hook */}
            <p
              className='font-space text-lg font-bold tracking-tight'
              style={{ color: p.accent }}
            >
              {p.stat}
            </p>

            {/* Headline */}
            <p className='font-space text-base font-semibold text-primary leading-snug'>
              {p.headline}
            </p>

            {/* Body */}
            <p className='font-inter text-base text-secondary leading-relaxed'>
              {p.body}
            </p>
          </m.div>
        ))}
      </div>
    </section>
  )
}
