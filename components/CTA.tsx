'use client'

import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <motion.a
        href="#agents"
        className="px-8 py-3 bg-accent text-white font-inter font-semibold text-sm tracking-widest uppercase rounded-sm"
        whileHover={{ scale: 1.02, backgroundColor: '#2d96f0' }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
      >
        Explore the Marketplace
      </motion.a>
      <motion.a
        href="#how-it-works"
        className="px-8 py-3 border border-secondary/30 text-secondary font-inter font-medium text-sm tracking-widest uppercase rounded-sm"
        whileHover={{ scale: 1.02, borderColor: 'rgba(163,179,209,0.6)', color: '#ffffff' }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
      >
        Connect Agent Wallet
      </motion.a>
    </div>
  )
}
