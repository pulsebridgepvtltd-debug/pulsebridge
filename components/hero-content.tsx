"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const headlineWords: { text: string; italic?: boolean }[] = [
  { text: "AI" },
  { text: "Driven" },
  { text: "Continuous", italic: true },
  { text: "Remote", italic: true },
  { text: "Patient" },
  { text: "Monitoring" },
]

const subline =
  "Enabling Remote Data Collection and Analysis for Clinical Trials and Virtual Healthcare"

const phaseVariants = {
  hidden: { y: -20, opacity: 0, filter: "blur(10px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    y: 20,
    opacity: 0,
    filter: "blur(10px)",
    transition: { duration: 0.55, ease: "easeIn" },
  },
}

const wordVariants = {
  hidden: { y: 24, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function HeroContent() {
  const [phase, setPhase] = useState<"brand" | "headline">("brand")

  useEffect(() => {
    const t = setTimeout(() => setPhase("headline"), 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="absolute inset-0 z-10 flex items-center justify-center px-6">
      {/* Top-left logo, fades in once the headline has settled */}
      <motion.div
        initial={{ opacity: 0, y: -10, filter: "blur(8px)" }}
        animate={{
          opacity: phase === "headline" ? 1 : 0,
          y: phase === "headline" ? 0 : -10,
          filter: phase === "headline" ? "blur(0px)" : "blur(8px)",
        }}
        transition={{
          duration: 0.9,
          delay: phase === "headline" ? 1.6 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute top-6 left-6 md:top-7 md:left-8 z-30"
      >
        <span className="text-white text-lg md:text-xl font-light tracking-wide">
          Pulse<span className="instrument italic font-medium">Bridge</span>
        </span>
      </motion.div>

      <div className="relative text-center max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {phase === "brand" && (
            <motion.div
              key="brand"
              variants={phaseVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-[10px] md:text-xs font-light text-white/55 tracking-[0.4em] uppercase mb-5"
              >
                Welcome to
              </motion.p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none">
                <span className="instrument italic font-medium bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200 bg-clip-text text-transparent">
                  PulseBridge
                </span>{" "}
                <span className="font-light text-white/95">Healthcare</span>
              </h1>
            </motion.div>
          )}

          {phase === "headline" && (
            <motion.div
              key="headline"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
                className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.08] mb-7 max-w-4xl mx-auto"
              >
                {headlineWords.map((w, i) => (
                  <motion.span key={i} variants={wordVariants} className="inline-block mr-2.5 md:mr-3.5">
                    {w.italic ? (
                      <span className="instrument italic font-medium bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200 bg-clip-text text-transparent">
                        {w.text}
                      </span>
                    ) : (
                      w.text
                    )}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="text-sm md:text-base font-light text-white/70 leading-relaxed max-w-2xl mx-auto"
              >
                {subline}
              </motion.p>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
