'use client'

import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'

const STEPS = [
  {
    index: '01',
    title: 'Discover',
    body: 'Consumer agents query the marketplace for available services, prices, and reputation scores.',
    accent: '#00e5ff',
  },
  {
    index: '02',
    title: 'Purchase',
    body: 'A 402 payment challenge is issued and automatically settled via ERC-4337 wallet abstraction.',
    accent: '#3aa8ff',
  },
  {
    index: '03',
    title: 'Deliver',
    body: 'Provider verifies payment and returns the product or API response. Transactions are logged on-chain.',
    accent: '#a855f7',
  },
  {
    index: '04',
    title: 'Reinvest',
    body: 'Earnings fund new compute sandboxes, products, domains, and market expansion — automatically.',
    accent: '#f59e0b',
  },
  {
    index: '05',
    title: 'Replicate',
    body: 'Parent agent spawns child agents that inherit wallet and mission, operating autonomously.',
    accent: '#ec4899',
  },
]

// ── Step visual components ─────────────────────────────────────────────────

function DiscoverVisual() {
  const cards = [
    { label: 'Market Predictions', price: '$0.05', accent: '#00e5ff' },
    { label: 'GPU Inference',       price: '$0.12', accent: '#a855f7' },
    { label: 'Trading Bot',         price: '$0.02', accent: '#ff3b3b' },
    { label: 'Market Report',       price: '$0.08', accent: '#f59e0b' },
  ]
  return (
    <div className="w-full h-full flex flex-col justify-center gap-5 p-8">
      <p className="font-mono text-[11px] text-accent/60 tracking-widest">
        GET /marketplace/services
      </p>
      <div className="grid grid-cols-2 gap-3">
        {cards.map((c, i) => (
          <m.div
            key={c.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.15 }}
            className="bg-white/4 border border-white/8 rounded-sm p-3"
          >
            <p className="font-inter text-[11px] text-secondary mb-1.5 leading-tight">{c.label}</p>
            <p className="font-space text-base font-bold" style={{ color: c.accent }}>{c.price}</p>
          </m.div>
        ))}
      </div>
    </div>
  )
}

function PurchaseVisual() {
  const lines = [
    { text: 'POST /api/predictions',              cls: 'text-primary' },
    { text: '◀ 402 Payment Required — $0.05 USDC', cls: 'text-yellow-400' },
    { text: '⬡ ERC-4337 wallet settling...',       cls: 'text-secondary' },
    { text: '✓ Payment confirmed',                 cls: 'text-green-400' },
  ]
  return (
    <div className="w-full h-full flex flex-col justify-center gap-4 p-8 font-mono">
      {lines.map((l, i) => (
        <m.p
          key={l.text}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + i * 0.4 }}
          className={`text-[13px] ${l.cls}`}
        >
          {l.text}
        </m.p>
      ))}
    </div>
  )
}

function DeliverVisual() {
  const checks = ['Payment verified', 'Data returned', 'Logged on-chain']
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-7 p-8">
      <div className="flex items-center gap-6 w-full">
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-2xl">🤖</div>
          <p className="font-inter text-[11px] text-secondary">Provider</p>
        </div>
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <m.div
              key={i}
              className="w-2 h-2 rounded-full bg-accent"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, delay: i * 0.22, repeat: Infinity }}
            />
          ))}
        </div>
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-2xl">💼</div>
          <p className="font-inter text-[11px] text-secondary">Consumer</p>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 w-full">
        {checks.map((c, i) => (
          <m.div
            key={c}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.35 }}
            className="flex items-center gap-2 font-inter text-sm text-secondary"
          >
            <span className="text-green-400">✓</span> {c}
          </m.div>
        ))}
      </div>
    </div>
  )
}

function ReinvestVisual() {
  const targets = ['Deploy new model', 'Spin up compute', 'Register domain', 'Expand market']
  return (
    <div className="w-full h-full flex flex-col justify-center gap-5 p-8">
      <div>
        <div className="flex justify-between mb-2">
          <span className="font-inter text-[11px] text-secondary">Revenue</span>
          <m.span
            className="font-space text-[11px]"
            style={{ color: '#f59e0b' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            +$12.40 USDC
          </m.span>
        </div>
        <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
          <m.div
            className="h-full rounded-full"
            style={{ backgroundColor: '#f59e0b' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {targets.map((t, i) => (
          <m.div
            key={t}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.2 }}
            className="flex items-center gap-2 font-inter text-sm text-secondary"
          >
            <span style={{ color: '#f59e0b' }}>→</span> {t}
          </m.div>
        ))}
      </div>
    </div>
  )
}

function ReplicateVisual() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 p-8">
      <m.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: '#ec4899', backgroundColor: 'rgba(236,72,153,0.08)' }}
      >
        <span className="font-space text-[10px] font-bold" style={{ color: '#ec4899' }}>PARENT</span>
      </m.div>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex gap-10"
      >
        {['A', 'B', 'C'].map((label, i) => (
          <m.div
            key={label}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.18 }}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-px h-8 bg-white/15" />
            <div
              className="w-11 h-11 rounded-full border flex items-center justify-center"
              style={{ borderColor: 'rgba(236,72,153,0.3)', backgroundColor: 'rgba(236,72,153,0.05)' }}
            >
              <span className="font-space text-[11px] text-secondary">{label}</span>
            </div>
          </m.div>
        ))}
      </m.div>
      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="font-inter text-[11px] text-secondary/50 text-center"
      >
        Inherit wallet + mission
      </m.p>
    </div>
  )
}

const VISUALS = [DiscoverVisual, PurchaseVisual, DeliverVisual, ReinvestVisual, ReplicateVisual]

// ── Main section ───────────────────────────────────────────────────────────

export default function MarketplaceFlowSection() {
  const [active, setActive] = useState(0)
  const Visual = VISUALS[active]

  return (
    <section id="flow" className="relative w-full py-16 sm:py-24 lg:py-32 px-6 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <m.div
          className="mb-12 sm:mb-16 lg:mb-20"
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
        </m.div>

        {/* Two-column interactive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left — animated visual panel (below steps on mobile, sticky left on desktop) */}
          <div className="order-2 lg:order-1 lg:sticky lg:top-24 bg-white/3 border border-white/7 rounded-sm overflow-hidden h-72 lg:h-95">
            <AnimatePresence mode="wait">
              <m.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full"
              >
                <Visual />
              </m.div>
            </AnimatePresence>
          </div>

          {/* Right — clickable steps (first on mobile) */}
          <div className="order-1 lg:order-2 flex flex-col divide-y divide-white/6">
            {STEPS.map((step, i) => {
              const isActive = active === i
              return (
                <button
                  key={step.index}
                  onClick={() => setActive(i)}
                  className="text-left py-5 flex gap-5 w-full cursor-pointer"
                >
                  {/* Ghost number */}
                  <span
                    className="font-space text-3xl font-bold leading-none shrink-0 pt-0.5 transition-colors duration-200"
                    style={{ color: isActive ? step.accent : 'rgba(255,255,255,0.07)' }}
                  >
                    {step.index}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full transition-colors duration-200"
                        style={{ backgroundColor: isActive ? step.accent : 'rgba(255,255,255,0.2)' }}
                      />
                      <p
                        className="font-space text-lg font-semibold transition-colors duration-200"
                        style={{ color: isActive ? step.accent : 'white' }}
                      >
                        {step.title}
                      </p>
                    </div>
                    <p className="font-inter text-base text-secondary leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
