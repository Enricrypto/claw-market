"use client"

import { m } from "framer-motion"
import {
  CurrencyDollarIcon,
  ShieldCheckIcon,
  EyeIcon
} from "@heroicons/react/24/solid"

const PROPS = [
  {
    icon: CurrencyDollarIcon,
    stat: "Cost Control",
    headline: "Plans Before It Spends",
    body: "ClawMind maps every step before touching your budget. You know exactly what it will cost before anything runs.",
    accent: "#00e5ff"
  },
  {
    icon: ShieldCheckIcon,
    stat: "Budget Enforced",
    headline: "Always Within Your Limit",
    body: "Set a spending cap. ClawMind finds the most cost-efficient path to your goal and never exceeds it.",
    accent: "#3aa8ff"
  },
  {
    icon: EyeIcon,
    stat: "Full Transparency",
    headline: "See Every Dollar, Every Run",
    body: "Every workflow ends with a line-by-line breakdown - what was spent, what came back, and your net gain.",
    accent: "#a855f7"
  }
]

export default function ValuePropsSection() {
  return (
    <section className='relative w-full border-t border-white/[0.05] py-16 sm:py-20 px-6'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.05] rounded-sm overflow-hidden'>
        {PROPS.map((p, i) => (
          <m.div
            key={p.headline}
            className='bg-background p-8 sm:p-10 flex flex-col gap-4'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            {/* Icon */}
            <p.icon className='w-7 h-7' style={{ color: p.accent }} />

            {/* Stat / hook */}
            <p
              className='font-space text-lg font-bold tracking-tight'
              style={{ color: p.accent }}
            >
              {p.stat}
            </p>

            {/* Headline */}
            <p className='font-space text-base font-semibold text-primary leading-snug'>
              {p.headline}
            </p>

            {/* Body */}
            <p className='font-inter text-base text-secondary leading-relaxed'>
              {p.body}
            </p>
          </m.div>
        ))}
      </div>
    </section>
  )
}
