"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ClipboardList,
  Database,
  HeartPulse,
  ScrollText,
  UserCheck,
} from "lucide-react"

const features = [
  { icon: HeartPulse, label: "Remote Data Collection" },
  { icon: Database, label: "Vitals and Biometrics" },
  { icon: ScrollText, label: "ePro / eCOA / Surveys" },
  { icon: ClipboardList, label: "Centralized Data Services" },
  { icon: UserCheck, label: "Patient Adherence" },
]

export default function ClinicalTrials() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(196,181,253,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(196,181,253,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="md:order-2"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
              Clinical Trials
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-5 leading-tight">
              Innovative Digital Solutions for{" "}
              <span className="instrument italic font-medium bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Clinical Trials
              </span>
            </h2>
            <p className="text-base font-light text-white/70 leading-relaxed mb-8">
              Turnkey remote data capture services for human vitals and biometrics in clinical trials.
              User-friendly wearable sensors combined with centralized data management help ensure optimal
              data integrity and patient adherence.
            </p>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
              className="space-y-2.5"
            >
              {features.map((f) => {
                const Icon = f.icon
                return (
                  <motion.li
                    key={f.label}
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                    }}
                    className="flex items-center gap-3 text-sm font-light text-white/80"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-md bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-cyan-200" />
                    </span>
                    {f.label}
                  </motion.li>
                )
              })}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-light text-cyan-200 hover:text-white hover:translate-x-1 transition-all group"
              >
                Read More
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="md:order-1 relative"
          >
            <div className="relative rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-950/40 via-black/80 to-black backdrop-blur-md overflow-hidden p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-mono text-cyan-300 tracking-widest">TRIAL · DATA · CAPTURE</span>
                <span className="text-[10px] font-mono text-white/40">N = 1,284</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: "Adherence", value: "94%" },
                  { label: "Active Sites", value: "37" },
                  { label: "Data Points", value: "2.1M" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="rounded-lg bg-white/[0.04] border border-cyan-400/15 p-3"
                  >
                    <p className="text-xl font-light text-white">{s.value}</p>
                    <p className="text-[10px] text-cyan-200/70 mt-0.5">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-lg bg-black/40 border border-cyan-400/15 p-4 h-44 relative overflow-hidden">
                <span className="text-[10px] font-mono text-cyan-300 tracking-widest">DAILY VITALS · 30D</span>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 160" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="ct-grad" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, delay: 0.4, ease: "easeInOut" }}
                    d="M 0 110 C 30 90 50 100 70 80 C 95 60 120 95 145 70 C 170 50 200 80 225 55 C 250 35 275 60 300 40"
                    stroke="#67e8f9"
                    strokeWidth="2"
                    fill="none"
                  />
                  <motion.path
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1.2 }}
                    d="M 0 110 C 30 90 50 100 70 80 C 95 60 120 95 145 70 C 170 50 200 80 225 55 C 250 35 275 60 300 40 L 300 160 L 0 160 Z"
                    fill="url(#ct-grad)"
                  />
                </svg>
              </div>
            </div>
            <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-cyan-500/30 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-teal-500/25 blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
