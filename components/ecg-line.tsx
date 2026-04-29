"use client"

import { motion } from "framer-motion"

interface EcgLineProps {
  className?: string
  color?: string
  duration?: number
}

export default function EcgLine({ className = "", color = "#a78bfa", duration = 2.6 }: EcgLineProps) {
  const path =
    "M 0 50 L 60 50 L 70 50 L 78 35 L 86 65 L 92 18 L 100 82 L 108 35 L 118 50 L 200 50 L 260 50 L 270 50 L 278 35 L 286 65 L 292 18 L 300 82 L 308 35 L 318 50 L 400 50"

  return (
    <svg
      className={`block w-full h-full ${className}`}
      viewBox="0 0 400 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`ecg-${color.replace("#", "")}`} x1="0%" x2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path} stroke={color} strokeOpacity={0.12} strokeWidth={1} fill="none" />
      <motion.path
        d={path}
        stroke={`url(#ecg-${color.replace("#", "")})`}
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0.25,
        }}
      />
    </svg>
  )
}
