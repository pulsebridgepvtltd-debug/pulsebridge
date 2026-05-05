"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Brain, FlaskConical, Gauge, Heart } from "lucide-react"

interface Specialty {
  icon: typeof Heart
  title: string
  tag: string
  body: string
  bullets: string[]
  accent: string
  border: string
  iconColor: string
  dot: string
  glow: string
}

const specialties: Specialty[] = [
  {
    icon: Heart,
    title: "Cardiology",
    tag: "AF · ECG · MCT",
    body: "Detect early AF transformation by capturing continuous ECG rhythm from patients in remote and ambulatory settings.",
    bullets: [
      "Real-time arrhythmia detection",
      "Continuous ECG capture",
      "AFib burden tracking",
    ],
    accent: "from-rose-500/35 to-rose-500/0",
    border: "border-rose-400/30",
    iconColor: "text-rose-200",
    dot: "bg-rose-400",
    glow: "rgba(244,63,94,0.45)",
  },
  {
    icon: FlaskConical,
    title: "Oncology",
    tag: "Neutropenic · Vitals",
    body: "Detect neutropenic events following chemotherapy by correlating multiple human vitals in discharged patients.",
    bullets: [
      "Multi-vital correlation",
      "Post-chemo monitoring",
      "Discharge follow-up",
    ],
    accent: "from-emerald-500/35 to-emerald-500/0",
    border: "border-emerald-400/30",
    iconColor: "text-emerald-200",
    dot: "bg-emerald-400",
    glow: "rgba(16,185,129,0.45)",
  },
  {
    icon: Brain,
    title: "Neurology",
    tag: "Therapy · Temperature",
    body: "Conduct safety assessments of a neurological therapy by monitoring body temperature over extended periods.",
    bullets: [
      "Long-term temperature data",
      "Therapy safety windows",
      "Continuous monitoring",
    ],
    accent: "from-violet-500/35 to-violet-500/0",
    border: "border-violet-400/30",
    iconColor: "text-violet-200",
    dot: "bg-violet-400",
    glow: "rgba(139,92,246,0.45)",
  },
  {
    icon: Gauge,
    title: "Hypertension",
    tag: "6MWT · HR",
    body: "Assess pulmonary hypertension therapy efficacy by monitoring heart rate before, during, and after a six-minute walk test.",
    bullets: [
      "6-minute walk test data",
      "Pre/peri/post analysis",
      "Therapy efficacy",
    ],
    accent: "from-amber-500/35 to-amber-500/0",
    border: "border-amber-400/30",
    iconColor: "text-amber-200",
    dot: "bg-amber-400",
    glow: "rgba(245,158,11,0.45)",
  },
]

const FLIP_CLOSE_DELAY_MS = 130

function SpecialtyCard({ specialty, index }: { specialty: Specialty; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const Icon = specialty.icon

  // Detect touch device once on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(hover: none)").matches)
    }
  }, [])

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const handleEnter = () => {
    if (isTouch) return
    cancelClose()
    setFlipped(true)
  }

  const handleLeave = () => {
    if (isTouch) return
    cancelClose()
    closeTimer.current = setTimeout(() => {
      setFlipped(false)
      closeTimer.current = null
    }, FLIP_CLOSE_DELAY_MS)
  }

  const handleClick = () => {
    if (isTouch) {
      setFlipped((prev) => !prev)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotateX: -28, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.0, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1500px", willChange: "transform" }}
      className="h-72 sm:h-80 cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d", pointerEvents: "none" }}
        className="relative w-full h-full"
      >
        {/* FRONT */}
        <div
          className={`absolute inset-0 rounded-2xl border ${specialty.border} bg-white/[0.04] backdrop-blur-md p-7 flex flex-col justify-between overflow-hidden`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
          <div
            aria-hidden
            className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-50"
            style={{ background: specialty.glow }}
          />
          <div
            aria-hidden
            className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full blur-3xl opacity-25"
            style={{ background: specialty.glow }}
          />

          <div className="relative">
            <div
              className={`relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${specialty.accent} border ${specialty.border} mb-5`}
            >
              <Icon className={`w-6 h-6 ${specialty.iconColor}`} />
              <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${specialty.dot} animate-pulse`} />
            </div>
            <h3 className="text-2xl font-light text-white mb-2 tracking-tight">
              {specialty.title}
            </h3>
            <p className={`text-[10px] font-light ${specialty.iconColor} tracking-[0.2em] uppercase`}>
              {specialty.tag}
            </p>
          </div>

          <div className="relative flex items-center justify-between">
            <span className="text-[10px] font-light text-white/45 uppercase tracking-[0.18em]">
              {isTouch ? "Tap to flip" : "Hover to flip"}
            </span>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="text-white/40"
            >
              ↻
            </motion.span>
          </div>
        </div>

        {/* BACK */}
        <div
          className={`absolute inset-0 rounded-2xl border ${specialty.border} bg-gradient-to-br from-black/85 to-violet-950/60 backdrop-blur-md p-7 flex flex-col justify-between overflow-hidden`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
          <div
            aria-hidden
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-35"
            style={{ background: specialty.glow }}
          />

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className={`w-1.5 h-1.5 rounded-full ${specialty.dot}`} />
              <h3 className={`text-base font-medium text-white tracking-tight`}>
                {specialty.title}
              </h3>
            </div>
            <p className="text-xs font-light text-white/70 leading-relaxed mb-4">
              {specialty.body}
            </p>
            <ul className="space-y-2">
              {specialty.bullets.map((b) => (
                <li
                  key={b}
                  className="text-xs font-light text-white/65 flex items-start gap-2"
                >
                  <span className={`w-1 h-1 rounded-full ${specialty.dot} mt-1.5 flex-shrink-0`} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex items-center justify-between">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 text-xs font-light text-white/85 hover:text-white transition-colors"
              style={{ pointerEvents: "auto" }}
            >
              Learn more
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <span
              className={`text-[9px] font-light ${specialty.iconColor} uppercase tracking-[0.2em]`}
            >
              {String(index + 1).padStart(2, "0")} / 04
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function BiometricsPlatform() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-3xl mx-auto text-center"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/15 text-white/80 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
            Biometrics Platform
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-5 leading-tight">
            Advanced Biometrics Platform for{" "}
            <span className="instrument italic font-medium bg-gradient-to-r from-rose-200 via-violet-300 to-cyan-200 bg-clip-text text-transparent">
              Data Collection &amp; Analysis
            </span>
          </h2>
          <p className="text-base font-light text-white/70 leading-relaxed">
            One unified intelligence layer powering digital healthcare — from mobile cardiac
            telemetry to neutropenic fever monitoring, COPD management, and beyond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {specialties.map((s, i) => (
            <SpecialtyCard key={s.title} specialty={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
