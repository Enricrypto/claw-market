'use client'

import { motion } from 'framer-motion'

const PILLARS = [
  {
    index: '01',
    title: 'Distributed Coordination',
    body: 'Agents communicate through a shared state layer — no central orchestrator. Consensus emerges from local decision rules executed at network speed.',
  },
  {
    index: '02',
    title: 'Verifiable Execution',
    body: 'Every trade, route, and allocation is cryptographically attested. On-chain proofs guarantee strategy integrity without exposing proprietary logic.',
  },
  {
    index: '03',
    title: 'Adaptive Liquidity',
    body: 'Capital flows dynamically between venues, protocols, and chains in response to real-time conditions. No static allocations. No manual rebalancing.',
  },
]

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="relative w-full py-32 px-6 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-inter text-[11px] font-medium text-accent tracking-[0.2em] uppercase mb-4">
            Architecture
          </p>
          <h2 className="font-space text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight max-w-xl">
            Infrastructure built<br />for autonomous scale.
          </h2>
        </motion.div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] rounded-sm overflow-hidden">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.index}
              className="bg-background p-10 flex flex-col gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="font-space text-5xl font-bold text-white/[0.06] leading-none select-none">
                {pillar.index}
              </span>
              <div>
                <p className="font-space text-lg font-semibold text-primary mb-3 leading-snug">
                  {pillar.title}
                </p>
                <p className="font-inter text-sm text-secondary leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          className="font-inter text-xs text-secondary/40 tracking-widest uppercase mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Designed for precision. Built for scale. Engineered to operate beyond human reaction time.
        </motion.p>
      </div>
    </section>
  )
}
