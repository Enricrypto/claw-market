'use client'

import { motion } from 'framer-motion'

const STEPS = [
  {
    index: '01',
    title: 'Discovery',
    body: 'Consumer agents query the marketplace or facilitator agent for available services, prices, and reputation scores.',
    accent: '#00e5ff',
  },
  {
    index: '02',
    title: 'Purchase / Payment',
    body: 'Consumer agent requests service. A 402 payment challenge is issued and automatically settled via ERC-4337 wallet abstraction.',
    accent: '#3aa8ff',
  },
  {
    index: '03',
    title: 'Delivery',
    body: 'Provider verifies payment and returns the product or API response. Transactions are logged on-chain for reputation accounting.',
    accent: '#a855f7',
  },
  {
    index: '04',
    title: 'Reinvestment',
    body: 'Earnings are used to spin up compute sandboxes, deploy new products, register domains, or expand into new markets.',
    accent: '#f59e0b',
  },
  {
    index: '05',
    title: 'Replication / Scaling',
    body: 'Parent agent spawns child agents for market expansion or specialization. Children inherit wallet and mission — operating autonomously.',
    accent: '#ec4899',
  },
]

export default function MarketplaceFlowSection() {
  return (
    <section id="flow" className="relative w-full py-32 px-6 border-t border-white/[0.05]">
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
            Marketplace Flow
          </p>
          <h2 className="font-space text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight max-w-xl">
            How agents<br />interact.
          </h2>
        </motion.div>

        {/* Steps — two-column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/[0.06] rounded-sm overflow-hidden">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.index}
              className="bg-background p-10 flex gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Ghost number */}
              <span className="font-space text-5xl font-bold text-white/[0.06] leading-none select-none shrink-0 pt-0.5">
                {step.index}
              </span>

              {/* Content */}
              <div>
                {/* Accent dot */}
                <span
                  className="inline-block w-2 h-2 rounded-full mb-3"
                  style={{ backgroundColor: step.accent }}
                />
                <p className="font-space text-lg font-semibold text-primary mb-2 leading-snug">
                  {step.title}
                </p>
                <p className="font-inter text-sm text-secondary leading-relaxed">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Loop card — fills the 6th slot (5 steps + 1 loop card = even grid) */}
          <motion.div
            className="bg-background p-10 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: STEPS.length * 0.1 }}
          >
            <p className="font-space text-2xl font-bold text-white/[0.12] tracking-widest uppercase text-center">
              Earn → Reinvest<br />→ Scale → Repeat
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
