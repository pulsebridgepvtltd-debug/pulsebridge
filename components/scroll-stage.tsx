"use client"

import { useRef, useState, useEffect, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ScrollStageProps {
  children: ReactNode
  className?: string
}

export default function ScrollStage({ children, className = "" }: ScrollStageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const rotate = useTransform(scrollYProgress, [0, 0.4, 1], [22, 0, -8])
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], isMobile ? [0.85, 1, 0.95] : [0.94, 1, 0.98])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.6])

  return (
    <div ref={ref} className={className}>
      <div style={{ perspective: "1400px" }} className="w-full">
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            opacity,
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
