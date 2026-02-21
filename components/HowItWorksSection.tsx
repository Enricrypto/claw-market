"use client"

import { m } from "framer-motion"

const USE_CASES = [
  {
    tag: "Market Research",
    title: "Competitive Intelligence, Automated",
    body: "Scrape competitor pricing, fetch live market data, and get a ranked summary - without writing a single line of code.",
    accent: "#00e5ff"
  },
  {
    tag: "Content Generation",
    title: "From Source to Finished Draft",
    body: "Pull reference material from any source, run it through AI, and receive a finished draft ready to publish or hand off.",
    accent: "#3aa8ff"
  },
  {
    tag: "Data Pipeline",
    title: "Extract, Enrich, Deliver",
    body: "Extract structured data from any website or API, clean and enrich it with AI, and output a usable dataset - on demand.",
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
            Use Cases
          </p>
          <h2 className='font-space text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight max-w-xl'>
            What You
            <br />
            Can Build
          </h2>
        </m.div>

        {/* Use case grid */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/6 rounded-sm overflow-hidden'>
          {USE_CASES.map((uc, i) => (
            <m.div
              key={uc.title}
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
                  color: uc.accent,
                  backgroundColor: `${uc.accent}18`,
                  border: `1px solid ${uc.accent}30`
                }}
              >
                {uc.tag}
              </span>

              {/* Title + body */}
              <div>
                <p className='font-space text-base font-semibold text-primary mb-2 leading-snug'>
                  {uc.title}
                </p>
                <p className='font-inter text-base text-secondary leading-relaxed'>
                  {uc.body}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
