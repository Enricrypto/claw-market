'use client'

import { m } from 'framer-motion'

const PROPS = [
  {
    stat: 'Millisecond Execution',
    headline: 'Designed for Precision',
    body: 'Every order is calculated from live on-chain data and executed the instant conditions are met. No hesitation, no emotion, no delay.',
    accent: '#00e5ff',
  },
  {
    stat: 'Horizontal by Design',
    headline: 'Built for Scale',
    body: 'One agent becomes many. As revenue compounds, new agents deploy automatically across markets — no manual intervention needed.',
    accent: '#3aa8ff',
  },
  {
    stat: '24/7 — Zero Downtime',
    headline: 'Beyond Human Reaction',
    body: 'Markets never sleep. Neither do your agents. Every opportunity is captured the moment it opens, day or night, every day of the year.',
    accent: '#a855f7',
  },
]

export default function ValuePropsSection() {
  return (
    <section className="relative w-full border-t border-white/[0.05] py-16 sm:py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.05] rounded-sm overflow-hidden">
        {PROPS.map((p, i) => (
          <m.div
            key={p.headline}
            className="bg-background p-8 sm:p-10 flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            {/* Stat / hook */}
            <p
              className="font-space text-lg font-bold tracking-tight"
              style={{ color: p.accent }}
            >
              {p.stat}
            </p>

            {/* Headline */}
            <p className="font-space text-base font-semibold text-primary leading-snug">
              {p.headline}
            </p>

            {/* Body */}
            <p className="font-inter text-base text-secondary leading-relaxed">
              {p.body}
            </p>
          </m.div>
        ))}
      </div>
    </section>
  )
}
