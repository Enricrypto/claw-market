"use client"

import { useState } from "react"
import { m, AnimatePresence } from "framer-motion"

const STEPS = [
  {
    index: "01",
    title: "Plan",
    body: "ClawMind maps your task into a priced sequence of steps before anything runs.",
    accent: "#00e5ff"
  },
  {
    index: "02",
    title: "Execute",
    body: "Each step is sent to the right service and completes in order.",
    accent: "#3aa8ff"
  },
  {
    index: "03",
    title: "Pay",
    body: "Each step pays for itself as it finishes. No batch invoices. No surprises.",
    accent: "#a855f7"
  },
  {
    index: "04",
    title: "Compose",
    body: "Outputs from every step are merged into one clean deliverable.",
    accent: "#f59e0b"
  },
  {
    index: "05",
    title: "Report",
    body: "You receive a full breakdown: what was spent, what came back, and your net.",
    accent: "#ec4899"
  }
]

// ── Step visual components ─────────────────────────────────────────────────

function DiscoverVisual() {
  const cards = [
    { label: "Extract pricing data", price: "$0.021", accent: "#00e5ff" },
    { label: "Fetch market metrics", price: "$0.008", accent: "#a855f7" },
    { label: "Transform → summary", price: "$0.012", accent: "#f59e0b" },
    { label: "Evaluate & rank", price: "$0.007", accent: "#ec4899" }
  ]
  return (
    <div className='w-full h-full flex flex-col justify-center gap-5 p-8'>
      <p className='font-mono text-[11px] text-accent/60 tracking-widest'>
        POST /plan
      </p>
      <div className='grid grid-cols-2 gap-3'>
        {cards.map((c, i) => (
          <m.div
            key={c.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.15 }}
            className='bg-white/4 border border-white/8 rounded-sm p-3'
          >
            <p className='font-inter text-[11px] text-secondary mb-1.5 leading-tight'>
              {c.label}
            </p>
            <p
              className='font-space text-base font-bold'
              style={{ color: c.accent }}
            >
              {c.price}
            </p>
          </m.div>
        ))}
      </div>
    </div>
  )
}

function PurchaseVisual() {
  const lines = [
    { text: "DISPATCH /extract → pricing pages", cls: "text-primary" },
    { text: "DISPATCH /fetch → market metrics", cls: "text-primary" },
    { text: "DISPATCH /transform → summarize", cls: "text-primary" },
    { text: "✓ All subtasks complete", cls: "text-green-400" }
  ]
  return (
    <div className='w-full h-full flex flex-col justify-center gap-4 p-8 font-mono'>
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
  const checks = ["Payment issued", "Settled on-chain", "Receipt logged"]
  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-7 p-8'>
      <div className='flex items-center gap-6 w-full'>
        <div className='flex-1 flex flex-col items-center gap-2'>
          <div className='w-14 h-14 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-2xl'>
            🔌
          </div>
          <p className='font-inter text-[11px] text-secondary'>Service</p>
        </div>
        <div className='flex gap-2'>
          {[0, 1, 2].map((i) => (
            <m.div
              key={i}
              className='w-2 h-2 rounded-full bg-accent'
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, delay: i * 0.22, repeat: Infinity }}
            />
          ))}
        </div>
        <div className='flex-1 flex flex-col items-center gap-2'>
          <div className='w-14 h-14 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-2xl'>
            🧠
          </div>
          <p className='font-inter text-[11px] text-secondary'>ClawMind</p>
        </div>
      </div>
      <div className='flex flex-col gap-2.5 w-full'>
        {checks.map((c, i) => (
          <m.div
            key={c}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.35 }}
            className='flex items-center gap-2 font-inter text-sm text-secondary'
          >
            <span className='text-green-400'>✓</span> {c}
          </m.div>
        ))}
      </div>
    </div>
  )
}

function ReinvestVisual() {
  const targets = [
    "Merge extractions",
    "Apply transforms",
    "Finalize report",
    "Deliver output"
  ]
  return (
    <div className='w-full h-full flex flex-col justify-center gap-5 p-8'>
      <div>
        <div className='flex justify-between mb-2'>
          <span className='font-inter text-[11px] text-secondary'>Composition</span>
          <m.span
            className='font-space text-[11px]'
            style={{ color: "#f59e0b" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            Complete
          </m.span>
        </div>
        <div className='h-1.5 bg-white/6 rounded-full overflow-hidden'>
          <m.div
            className='h-full rounded-full'
            style={{ backgroundColor: "#f59e0b" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </div>
      <div className='flex flex-col gap-2.5'>
        {targets.map((t, i) => (
          <m.div
            key={t}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.2 }}
            className='flex items-center gap-2 font-inter text-sm text-secondary'
          >
            <span style={{ color: "#f59e0b" }}>→</span> {t}
          </m.div>
        ))}
      </div>
    </div>
  )
}

function ReplicateVisual() {
  const rows = [
    { label: "User paid", value: "$0.100", accent: "#ffffff" },
    { label: "Services cost", value: "$0.021", accent: "#a855f7" },
    { label: "Margin captured", value: "$0.079 (79%)", accent: "#ec4899" }
  ]
  return (
    <div className='w-full h-full flex flex-col justify-center gap-6 p-8'>
      <p className='font-mono text-[11px] text-accent/60 tracking-widest'>
        PROFIT REPORT
      </p>
      <div className='flex flex-col gap-3'>
        {rows.map((row, i) => (
          <m.div
            key={row.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.3 }}
            className='flex justify-between items-center py-2.5 border-b border-white/6'
          >
            <span className='font-inter text-sm text-secondary'>{row.label}</span>
            <span
              className='font-space text-sm font-semibold'
              style={{ color: row.accent }}
            >
              {row.value}
            </span>
          </m.div>
        ))}
      </div>
      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className='font-inter text-[11px] text-secondary/40'
      >
        Orchestration margin settled on-chain
      </m.p>
    </div>
  )
}

const VISUALS = [
  DiscoverVisual,
  PurchaseVisual,
  DeliverVisual,
  ReinvestVisual,
  ReplicateVisual
]

// ── Main section ───────────────────────────────────────────────────────────

export default function MarketplaceFlowSection() {
  const [active, setActive] = useState(0)
  const Visual = VISUALS[active]

  return (
    <section
      id='flow'
      className='relative w-full py-16 sm:py-24 lg:py-32 px-6 border-t border-white/[0.05]'
    >
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <m.div
          className='mb-12 sm:mb-16 lg:mb-20'
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className='font-inter text-[11px] font-medium text-accent tracking-[0.2em] uppercase mb-4'>
            Orchestration Flow
          </p>
          <h2 className='font-space text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight max-w-xl'>
            From task to profit,
            <br />
            automatically.
          </h2>
        </m.div>

        {/* Two-column interactive layout */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-start'>
          {/* Left — animated visual panel (below steps on mobile, sticky left on desktop) */}
          <div className='order-2 lg:order-1 lg:sticky lg:top-24 bg-white/3 border border-white/7 rounded-sm overflow-hidden h-72 lg:h-95'>
            <AnimatePresence mode='wait'>
              <m.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='w-full h-full'
              >
                <Visual />
              </m.div>
            </AnimatePresence>
          </div>

          {/* Right — clickable steps (first on mobile) */}
          <div className='order-1 lg:order-2 flex flex-col divide-y divide-white/6'>
            {STEPS.map((step, i) => {
              const isActive = active === i
              return (
                <button
                  key={step.index}
                  onClick={() => setActive(i)}
                  className='text-left py-5 flex gap-5 w-full cursor-pointer'
                >
                  {/* Ghost number */}
                  <span
                    className='font-space text-3xl font-bold leading-none shrink-0 pt-0.5 transition-colors duration-200'
                    style={{
                      color: isActive ? step.accent : "rgba(255,255,255,0.07)"
                    }}
                  >
                    {step.index}
                  </span>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-2'>
                      <span
                        className='inline-block w-1.5 h-1.5 rounded-full transition-colors duration-200'
                        style={{
                          backgroundColor: isActive
                            ? step.accent
                            : "rgba(255,255,255,0.2)"
                        }}
                      />
                      <p
                        className='font-space text-lg font-semibold transition-colors duration-200'
                        style={{ color: isActive ? step.accent : "white" }}
                      >
                        {step.title}
                      </p>
                    </div>
                    <p className='font-inter text-base text-secondary leading-relaxed'>
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
