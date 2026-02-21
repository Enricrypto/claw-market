"use client"

import { m } from "framer-motion"

const PRODUCTS = [
  {
    tag: "Planning",
    title: "AI Task Decomposition",
    body: "Converts any natural language task into structured JSON subtasks with defined inputs, outputs, and service requirements.",
    accent: "#00e5ff"
  },
  {
    tag: "Economics",
    title: "Budget Control",
    body: "Defines and enforces a maximum spend per workflow. Tasks are planned to fit the budget before execution begins.",
    accent: "#3aa8ff"
  },
  {
    tag: "Efficiency",
    title: "Cost Optimization",
    body: "Selects the cheapest viable combination of services for each subtask. Efficiency is built into every plan.",
    accent: "#a855f7"
  },
  {
    tag: "Payments",
    title: "x402 Payments",
    body: "Settles each subtask payment on-chain via ERC-4337 wallet abstraction. Atomic, trustless, and logged.",
    accent: "#ff3b3b"
  },
  {
    tag: "Output",
    title: "Result Composition",
    body: "Merges outputs from each subtask into a single coherent deliverable - report, dataset, content, or action.",
    accent: "#f59e0b"
  },
  {
    tag: "Revenue",
    title: "Value Capture",
    body: "ClawMind earns orchestration margin on every workflow. Coordination and intelligence have economic value.",
    accent: "#ec4899"
  }
]

export default function HowItWorksSection() {
  return (
    <section
      id='how-it-works'
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
            Capabilities
          </p>
          <h2 className='font-space text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight max-w-xl'>
            What ClawMind
            <br />
            Orchestrates
          </h2>
          <p className='font-inter text-lg md:text-xl text-secondary leading-relaxed max-w-2xl mt-6'>
            Six modular capabilities that compose into any autonomous economic
            workflow - from a single API call to a full business operation.
          </p>
        </m.div>

        {/* Product categories grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-sm overflow-hidden'>
          {PRODUCTS.map((product, i) => (
            <m.div
              key={product.title}
              className='bg-background p-8 flex flex-col gap-4'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {/* Tag */}
              <span
                className='font-inter text-[10px] font-semibold tracking-[0.18em] uppercase self-start px-2.5 py-1 rounded-sm'
                style={{
                  color: product.accent,
                  backgroundColor: `${product.accent}18`,
                  border: `1px solid ${product.accent}30`
                }}
              >
                {product.tag}
              </span>

              {/* Title + body */}
              <div>
                <p className='font-space text-base font-semibold text-primary mb-2 leading-snug'>
                  {product.title}
                </p>
                <p className='font-inter text-base text-secondary leading-relaxed'>
                  {product.body}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
