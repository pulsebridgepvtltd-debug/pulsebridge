"use client"

import { motion } from "framer-motion"
import { Brain, FlaskConical, Gauge, Heart } from "lucide-react"
import FlipCard from "@/components/flip-card"

const specialties = [
  {
    icon: Heart,
    title: "Cardiology",
    body: "Detect early AF transformation by capturing continuous ECG rhythm from patients in remote and ambulatory settings.",
    accent: "from-rose-500/30 to-rose-500/0",
    border: "border-rose-400/30",
    iconColor: "text-rose-200",
    glow: "bg-rose-500/30",
  },
  {
    icon: FlaskConical,
    title: "Oncology",
    body: "Detect neutropenic events following chemotherapy by correlating multiple human vitals in discharged patients.",
    accent: "from-emerald-500/30 to-emerald-500/0",
    border: "border-emerald-400/30",
    iconColor: "text-emerald-200",
    glow: "bg-emerald-500/30",
  },
  {
    icon: Brain,
    title: "Neurology",
    body: "Conduct safety assessments of a neurological therapy by monitoring body temperature over extended periods of time.",
    accent: "from-violet-500/30 to-violet-500/0",
    border: "border-violet-400/30",
    iconColor: "text-violet-200",
    glow: "bg-violet-500/30",
  },
  {
    icon: Gauge,
    title: "Hypertension",
    body: "Assess pulmonary hypertension therapy efficacy by monitoring heart rate before, during, and after a six-minute walk test.",
    accent: "from-amber-500/30 to-amber-500/0",
    border: "border-amber-400/30",
    iconColor: "text-amber-200",
    glow: "bg-amber-500/30",
  },
]

export default function BiometricsPlatform() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
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
            PulseBridge Health Care Biometrics Data Platform provides a unified solution to streamline the
            development and deployment of digital healthcare applications — from mobile cardiac telemetry to
            neutropenic fever monitoring and COPD management.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 z-10"
          >
            <div className="relative w-full h-full">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-white/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-3 rounded-full border border-dashed border-violet-400/30"
              />
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-violet-500/40 via-fuchsia-500/30 to-cyan-500/30 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <span className="text-[10px] font-light text-white/90 text-center px-2 leading-tight">
                  Biometrics
                  <br />
                  Hub
                </span>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {specialties.map((s, idx) => {
              const Icon = s.icon
              const flipFrom = idx % 2 === 0 ? -75 : 75
              return (
                <FlipCard key={s.title} delay={idx * 0.18} duration={1.5} from={flipFrom}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={`group relative overflow-hidden rounded-2xl border ${s.border} bg-white/[0.04] backdrop-blur-md p-7 transition-colors`}
                  >
                    <div
                      className={`absolute -top-12 -right-12 w-40 h-40 rounded-full ${s.glow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    <div
                      className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${s.accent} border ${s.border} mb-5`}
                    >
                      <Icon className={`w-5 h-5 ${s.iconColor}`} />
                    </div>
                    <h3 className="relative text-xl font-light text-white mb-2">{s.title}</h3>
                    <p className="relative text-sm font-light text-white/70 leading-relaxed">{s.body}</p>
                  </motion.div>
                </FlipCard>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
