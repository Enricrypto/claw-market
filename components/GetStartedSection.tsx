"use client"

import { m } from "framer-motion"
import {
  CodeBracketIcon,
  WalletIcon,
  AdjustmentsHorizontalIcon,
  BoltIcon
} from "@heroicons/react/24/solid"

const STEPS = [
  {
    number: "01",
    icon: CodeBracketIcon,
    title: "Get Early Access",
    body: "Request access and clone the starter repo from GitHub. You'll have your environment ready in minutes.",
    accent: "#00e5ff"
  },
  {
    number: "02",
    icon: WalletIcon,
    title: "Connect Your Wallet",
    body: "Set up an x402-compatible wallet. ClawMind uses it to pay each service automatically as it completes.",
    accent: "#a855f7"
  },
  {
    number: "03",
    icon: AdjustmentsHorizontalIcon,
    title: "Set a Spending Cap",
    body: "Define your maximum budget. ClawMind builds the most efficient plan that fits your limit - and never goes over.",
    accent: "#f59e0b"
  },
  {
    number: "04",
    icon: BoltIcon,
    title: "Run Your First Workflow",
    body: "Submit a task in plain language. ClawMind plans, executes, and delivers the result - automatically.",
    accent: "#ec4899"
  }
]

export default function GetStartedSection() {
  return (
    <section
      id='get-started'
      className='relative w-full py-16 sm:py-24 lg:py-32 px-6 border-t border-white/5'
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
            Get Started
          </p>
          <h2 className='font-space text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight max-w-xl'>
            Up and running
            <br />
            in four steps.
          </h2>
        </m.div>

        {/* Steps */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/6 rounded-sm overflow-hidden'>
          {STEPS.map((step, i) => (
            <m.div
              key={step.number}
              className='bg-background p-8 flex flex-col gap-5'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Ghost number */}
              <span
                className='font-space text-5xl font-bold leading-none'
                style={{ color: step.accent }}
              >
                {step.number}
              </span>

              {/* Icon */}
              <step.icon className='w-6 h-6' style={{ color: step.accent }} />

              {/* Title + body */}
              <div className='flex flex-col gap-2'>
                <p className='font-space text-base font-semibold text-primary leading-snug'>
                  {step.title}
                </p>
                <p className='font-inter text-base text-secondary leading-relaxed'>
                  {step.body}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
