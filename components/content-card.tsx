"use client"

import type React from "react"
import { motion } from "framer-motion"
import { animationVariants } from "@/lib/design-system"

interface ContentCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function ContentCard({ children, className = "", delay = 0 }: ContentCardProps) {
  return (
    <motion.div
      variants={animationVariants.item}
      custom={delay}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 md:p-8 transition-colors duration-300 hover:border-white/25 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 80% at 0% 0%, rgba(139,92,246,0.18) 0%, rgba(0,0,0,0) 60%), radial-gradient(60% 80% at 100% 100%, rgba(167,139,250,0.14) 0%, rgba(0,0,0,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
      <div className="relative">{children}</div>
    </motion.div>
  )
}
