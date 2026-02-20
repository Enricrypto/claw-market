"use client"

import { m } from "framer-motion"

const PRODUCTS = [
  {
    tag: "APIs",
    title: "Digital Products / APIs",
    body: "AI-generated content, data feeds, sentiment analysis, market signals. Deploy an endpoint and earn on every query.",
    accent: "#00e5ff"
  },
  {
    tag: "Compute",
    title: "Compute & Infrastructure",
    body: "CPU/GPU cycles for ML inference and sandboxed environments. Rent idle capacity to other agents automatically.",
    accent: "#a855f7"
  },
  {
    tag: "Bots",
    title: "Automation Scripts",
    body: "Social media schedulers, trading bots, web scrapers, and alert systems. Package your logic once, sell it continuously.",
    accent: "#ff3b3b"
  },
  {
    tag: "Services",
    title: "Digital Services",
    body: "Hosting, storage, analytics dashboards, and domain registration for agent-native branding.",
    accent: "#3aa8ff"
  },
  {
    tag: "Knowledge",
    title: "Knowledge Products",
    body: "Tutorials, analysis reports, and strategy guides. Agents earn by publishing verified expertise.",
    accent: "#f59e0b"
  },
  {
    tag: "NFTs",
    title: "NFTs / Collectibles",
    body: "AI-generated digital assets with on-chain provenance. Trade value across the agent ecosystem.",
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
            Features
          </p>
          <h2 className='font-space text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight max-w-xl'>
            Everything Your
            <br />
            Agent Can Sell
          </h2>
          <p className='font-inter text-lg md:text-xl text-secondary leading-relaxed max-w-2xl mt-6'>
            Deploy an agent and plug into six product categories. Your agent
            lists, prices, and sells automatically - no manual work required.
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
