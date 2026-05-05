"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import EcgLine from "@/components/ecg-line"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Activity,
  ArrowRight,
  BatteryCharging,
  Bluetooth,
  CheckCircle2,
  Cpu,
  Droplets,
  HeartPulse,
  ShieldCheck,
} from "lucide-react"

const wordVariants = {
  hidden: { y: 28, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const headingWords: { text: string; italic?: boolean }[] = [
  { text: "Wellysis" },
  { text: "Holter", italic: true },
  { text: "with" },
  { text: "Samsung", italic: true },
  { text: "Bio-Sensors", italic: true },
]

const specs = [
  { icon: BatteryCharging, label: "Battery Life", value: "Up to 14 days" },
  { icon: Activity, label: "ECG Channels", value: "Lead II · 250 Hz" },
  { icon: Droplets, label: "Water Resistance", value: "IP55 — showerproof" },
  { icon: Cpu, label: "Onboard Memory", value: "Continuous, offline-ready" },
  { icon: Bluetooth, label: "Connectivity", value: "BLE 5.0 wireless upload" },
  { icon: ShieldCheck, label: "Certifications", value: "FDA · CE · KFDA" },
]

const benefits = [
  {
    title: "Medical-Grade Precision",
    body: "Hospital-quality signal fidelity on a wearable form factor. Lead II ECG with diagnostic-class accuracy.",
  },
  {
    title: "Consumer-Level Convenience",
    body: "Light, low-profile, adhesive-mounted. Patients forget they're wearing it — no cables, no clips.",
  },
  {
    title: "Continuous Long-Term Capture",
    body: "Up to 14 days of uninterrupted recording with quick patch swap to extend monitoring further.",
  },
]

export default function HolterMonitoringPage() {
  return (
    <>
      <main className="relative text-white">
        {/* Hero — full viewport with integrated header */}
        <section className="relative overflow-hidden min-h-screen flex flex-col">
          <div className="absolute -top-40 right-1/4 w-[42rem] h-[42rem] rounded-full bg-cyan-500/25 blur-[160px] pointer-events-none" />
          <div className="absolute top-1/3 -left-40 w-[36rem] h-[36rem] rounded-full bg-emerald-500/20 blur-[160px] pointer-events-none" />
          <div className="absolute -bottom-32 right-1/3 w-[32rem] h-[32rem] rounded-full bg-teal-500/15 blur-[160px] pointer-events-none" />

          <Header showLogo />

          <div className="relative flex-1 flex items-center py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 text-[10px] font-light uppercase tracking-[0.18em] mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Holter Monitoring · Samsung Bio-Sensors
            </motion.span>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] max-w-4xl mb-6"
            >
              {headingWords.map((w, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-3">
                  {w.italic ? (
                    <span className="instrument italic font-medium bg-gradient-to-r from-cyan-200 via-emerald-200 to-teal-200 bg-clip-text text-transparent">
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
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl font-light text-white/75 leading-relaxed max-w-2xl mb-10"
            >
              Continuous cardiac monitoring on a patch as light as two sheets of paper. Powered by
              the <span className="text-white">Samsung Smart Health Processor</span> for medical-grade
              accuracy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Request Device Demo
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white text-sm font-light hover:bg-white/10 transition-colors"
              >
                View Spec Sheet
              </Link>
            </motion.div>
            </div>
          </div>
        </section>

        {/* Hardware focus + visual */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative md:order-1"
              >
                <div className="relative rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-950/40 via-black/80 to-black backdrop-blur-md overflow-hidden p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <motion.span
                        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-2.5 h-2.5 rounded-full bg-cyan-400"
                      />
                      <span className="text-[10px] font-mono text-cyan-200 tracking-widest">
                        WELLYSIS · S-PATCH
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-white/40">Lead II · 72 BPM</span>
                  </div>

                  <div className="rounded-xl bg-black/50 border border-cyan-500/20 p-4 mb-4 h-28">
                    <EcgLine color="#67e8f9" duration={2.4} />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Uptime", value: "13d 04h" },
                      { label: "Storage", value: "98%" },
                      { label: "Signal", value: "Excellent" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-lg bg-white/[0.04] border border-cyan-400/15 p-3"
                      >
                        <p className="text-sm font-light text-white">{s.value}</p>
                        <p className="text-[10px] text-cyan-200/70 mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-cyan-500/30 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-emerald-500/25 blur-3xl pointer-events-none" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="md:order-2"
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                  Hardware
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-5 leading-tight">
                  Wellysis devices,{" "}
                  <span className="instrument italic font-medium bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                    Samsung-engineered
                  </span>
                </h2>
                <p className="text-base font-light text-white/70 leading-relaxed mb-6">
                  At the core of every patch is the Samsung Smart Health Processor — the same
                  silicon trusted in flagship wearables, tuned for clinical-grade ECG capture.
                </p>
                <ul className="space-y-3">
                  {[
                    "Single-lead ECG with R-peak precision",
                    "On-device noise filtering & artifact rejection",
                    "Encrypted transmission · HIPAA-aligned",
                  ].map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-cyan-300 flex-shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tech specs */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-12 max-w-2xl mx-auto"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                Technical Specs
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">
                Built for{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                  long-term wear
                </span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {specs.map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -4 }}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 hover:border-cyan-300/35 hover:bg-cyan-500/[0.04] transition-colors"
                  >
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/25 to-emerald-500/15 border border-cyan-400/30 mb-4">
                      <Icon className="w-5 h-5 text-cyan-200" />
                    </span>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-200/70 mb-1.5">
                      {s.label}
                    </p>
                    <p className="text-lg font-light text-white">{s.value}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-14 max-w-3xl"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                Benefits
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">
                Hospital fidelity,{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                  consumer comfort
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-950/30 via-black/70 to-black p-7 overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
                  <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-emerald-500/20 border border-cyan-400/30 mb-5">
                    <HeartPulse className="w-5 h-5 text-cyan-100" />
                  </span>
                  <h3 className="relative text-xl font-light text-white mb-2.5">{b.title}</h3>
                  <p className="relative text-sm font-light text-white/70 leading-relaxed">
                    {b.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
