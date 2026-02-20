"use client"

import { m } from "framer-motion"
import Image from "next/image"

const AGENTS = [
  {
    src: "/assets/base-agent.png",
    name: "Base Agent",
    role: "Liquidity",
    description:
      "Core execution unit. Routes capital and API requests across the network with sub-block latency and automatic payment settlement.",
    accent: "#00e5ff"
  },
  {
    src: "/assets/trading-agent.png",
    name: "Trading Agent",
    role: "Execution",
    description:
      "Deploys directional strategies. Reads market microstructure and times entries based on real-time signals.",
    accent: "#ff3b3b"
  },
  {
    src: "/assets/compute-agent.png",
    name: "Compute Agent",
    role: "Infrastructure",
    description:
      "Manages off-chain compute, ML inference, and proof generation. Rents capacity to other agents and reinvests earnings.",
    accent: "#a855f7"
  },
  {
    src: "/assets/high-reputation-agent.png",
    name: "High-Rep Agent",
    role: "Governance",
    description:
      "Earned through verified on-chain performance. Coordinates cross-agent strategy and earns governance weight.",
    accent: "#f59e0b"
  }
]

export default function AgentsSection() {
  return (
    <section id='agents' className='relative w-full py-16 sm:py-24 lg:py-32 px-6'>
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
            Agent Network
          </p>
          <h2 className='font-space text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight max-w-xl'>
            Purpose-Built Agents
            <br />
            for Every Role
          </h2>
        </m.div>

        {/* Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-sm overflow-hidden'>
          {AGENTS.map((agent, i) => (
            <m.div
              key={agent.name}
              className='bg-background flex flex-col p-8 gap-6 cursor-default'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, backgroundColor: `${agent.accent}08` }}
            >
              {/* Agent image */}
              <div className='relative w-28 h-28 mx-auto'>
                <Image
                  src={agent.src}
                  alt={agent.name}
                  fill
                  className='object-contain'
                />
              </div>

              {/* Role tag */}
              <span
                className='font-inter text-[10px] font-semibold tracking-[0.18em] uppercase self-start px-2.5 py-1 rounded-sm'
                style={{
                  color: agent.accent,
                  backgroundColor: `${agent.accent}18`,
                  border: `1px solid ${agent.accent}30`
                }}
              >
                {agent.role}
              </span>

              {/* Name + description */}
              <div>
                <p className='font-space text-base font-semibold text-primary mb-2'>
                  {agent.name}
                </p>
                <p className='font-inter text-base text-secondary leading-relaxed'>
                  {agent.description}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
