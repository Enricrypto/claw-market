"use client"

import { m } from "framer-motion"

const PRODUCTS = [
  {
    tag: "01",
    title: "Describe Your Goal",
    body: "Type what you need in plain language. No code, no config, no setup required.",
    accent: "#00e5ff"
  },
  {
    tag: "02",
    title: "ClawMind Plans and Runs It",
    body: "It breaks the task into steps, assigns the right tool to each one, and executes them in sequence - automatically.",
    accent: "#3aa8ff"
  },
  {
    tag: "03",
    title: "You Get the Result",
    body: "One clean deliverable lands in your hands, plus a full breakdown of what it cost and what you earned.",
    accent: "#a855f7"
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
            How It Works
          </p>
          <h2 className='font-space text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight max-w-xl'>
            From goal to result,
            <br />
            automatically.
          </h2>
        </m.div>

        {/* Product categories grid */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/6 rounded-sm overflow-hidden'>
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
