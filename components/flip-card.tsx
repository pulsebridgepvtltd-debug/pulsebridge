"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FlipCardProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  axis?: "y" | "x"
  from?: number
}

export default function FlipCard({
  children,
  className = "",
  delay = 0,
  duration = 1.2,
  axis = "y",
  from = -75,
}: FlipCardProps) {
  const initial =
    axis === "y"
      ? { rotateY: from, opacity: 0, y: 24 }
      : { rotateX: from, opacity: 0, y: 24 }

  const animate =
    axis === "y"
      ? { rotateY: 0, opacity: 1, y: 0 }
      : { rotateX: 0, opacity: 1, y: 0 }

  return (
    <div style={{ perspective: "1600px" }} className={className}>
      <motion.div
        initial={initial}
        whileInView={animate}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformStyle: "preserve-3d", transformOrigin: "center", willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  )
}
