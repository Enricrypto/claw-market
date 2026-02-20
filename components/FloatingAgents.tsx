'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

type Agent = {
  x: string
  y: string
  size: number
  delay: number
  drift: number
}

const AGENTS: Agent[] = [
  { x: '6%',  y: '11%', size: 56, delay: 0.0, drift: 14 },
  { x: '84%', y: '9%',  size: 48, delay: 2.4, drift: 18 },
  { x: '18%', y: '70%', size: 52, delay: 1.1, drift: 12 },
  { x: '76%', y: '66%', size: 56, delay: 3.7, drift: 16 },
  { x: '44%', y: '84%', size: 44, delay: 0.7, drift: 20 },
  { x: '91%', y: '42%', size: 50, delay: 2.0, drift: 13 },
  { x: '3%',  y: '46%', size: 46, delay: 4.4, drift: 17 },
  { x: '37%', y: '7%',  size: 54, delay: 1.6, drift: 15 },
  { x: '61%', y: '13%', size: 42, delay: 3.1, drift: 11 },
  { x: '14%', y: '30%', size: 40, delay: 0.4, drift: 19 },
  { x: '79%', y: '28%', size: 44, delay: 3.9, drift: 14 },
  { x: '54%', y: '76%', size: 48, delay: 2.7, drift: 16 },
]

export default function FloatingAgents() {
  return (
    <div
      className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
      aria-hidden
    >
      {AGENTS.map((agent, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: agent.x,
            top: agent.y,
            width: agent.size,
            height: agent.size,
            willChange: 'transform',
          }}
          animate={{ y: [0, -agent.drift, 0] }}
          transition={{
            duration: 12 + (i % 5) * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: agent.delay,
          }}
        >
          <Image
            src="/micro-agents.png"
            alt=""
            width={agent.size}
            height={agent.size}
            className="opacity-35"
          />
        </motion.div>
      ))}
    </div>
  )
}
