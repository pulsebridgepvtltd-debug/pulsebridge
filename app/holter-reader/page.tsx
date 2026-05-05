"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Building2,
  Clock,
  FileBarChart,
  Globe2,
  HeartPulse,
  Lock,
  ShieldCheck,
  Stethoscope,
  Users,
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
  { text: "Global" },
  { text: "Holter", italic: true },
  { text: "Data" },
  { text: "Reader", italic: true },
  { text: "Services" },
]

const audiences = [
  {
    icon: Stethoscope,
    title: "Healthcare Providers",
    body: "Hospital cardiology departments, primary care groups, and telehealth networks needing fast, board-certified reads.",
  },
  {
    icon: Building2,
    title: "Clinics & Practices",
    body: "Outpatient cardiology clinics and multi-specialty practices wanting to scale Holter capacity without on-site readers.",
  },
  {
    icon: Globe2,
    title: "Diagnostic Centers",
    body: "Imaging and diagnostic services worldwide, integrating remote interpretation into existing workflows.",
  },
]

const features = [
  {
    icon: Clock,
    title: "24–48 Hour Turnaround",
    body: "Standard reports delivered within 48 hours. Priority-track reads in under 24 hours when clinically urgent.",
  },
  {
    icon: ShieldCheck,
    title: "HIPAA & Global Compliance",
    body: "End-to-end encrypted handoff. GDPR, HIPAA, PIPEDA aligned — secure across borders.",
  },
  {
    icon: FileBarChart,
    title: "Detailed Cardiologist Reports",
    body: "Board-certified interpretation with arrhythmia summaries, AFib burden, ectopy counts, and HRV indices.",
  },
]

const flow = [
  { step: "01", label: "Upload", body: "Encrypted study upload via secure portal" },
  { step: "02", label: "Triage", body: "Auto-prioritized by clinical urgency" },
  { step: "03", label: "Interpret", body: "Board-certified cardiologist review" },
  { step: "04", label: "Deliver", body: "Signed report returned in 24–48 hrs" },
]

export default function HolterReaderPage() {
  return (
    <>
      <main className="relative text-white">
        {/* Hero — full viewport with integrated header */}
        <section className="relative overflow-hidden min-h-screen flex flex-col">
          <div className="absolute -top-40 right-1/4 w-[42rem] h-[42rem] rounded-full bg-indigo-500/25 blur-[160px] pointer-events-none" />
          <div className="absolute top-1/3 -left-40 w-[36rem] h-[36rem] rounded-full bg-violet-500/20 blur-[160px] pointer-events-none" />
          <div className="absolute -bottom-32 right-1/3 w-[32rem] h-[32rem] rounded-full bg-purple-500/15 blur-[160px] pointer-events-none" />

          <Header showLogo />

          <div className="relative flex-1 flex items-center py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 text-[10px] font-light uppercase tracking-[0.18em] mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Remote Diagnostic Reading
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
                    <span className="instrument italic font-medium bg-gradient-to-r from-indigo-200 via-violet-200 to-purple-200 bg-clip-text text-transparent">
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
              Outsource your Holter reading to{" "}
              <span className="text-white">board-certified cardiologists</span> — fast, compliant,
              and detailed. Operating across time zones for healthcare providers worldwide.
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
                Start a Trial Read
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white text-sm font-light hover:bg-white/10 transition-colors"
              >
                Service Overview
              </Link>
            </motion.div>
            </div>
          </div>
        </section>

        {/* Service flow */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-14 max-w-3xl"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                How it works
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">
                A simple four-step{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
                  service model
                </span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {flow.map((f, i) => (
                <motion.div
                  key={f.step}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-2xl border border-indigo-400/15 bg-white/[0.03] backdrop-blur-md p-6 overflow-hidden group hover:border-indigo-300/35 transition-colors"
                >
                  <span className="absolute top-4 right-5 text-5xl font-light text-white/[0.06] group-hover:text-indigo-300/20 transition-colors">
                    {f.step}
                  </span>
                  <span className="relative text-[10px] font-mono text-indigo-300 tracking-widest mb-3 block">
                    STEP {f.step}
                  </span>
                  <h3 className="relative text-xl font-light text-white mb-1.5">{f.label}</h3>
                  <p className="relative text-sm font-light text-white/65 leading-relaxed">
                    {f.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Audiences */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-14 max-w-2xl mx-auto"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                Who we serve
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">
                Built for{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-indigo-300 via-violet-300 to-purple-200 bg-clip-text text-transparent">
                  global care delivery
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {audiences.map((a, i) => {
                const Icon = a.icon
                return (
                  <motion.div
                    key={a.title}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                    className="group relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-7 hover:border-indigo-300/40 hover:bg-indigo-500/[0.05] transition-colors overflow-hidden"
                  >
                    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-indigo-500/25 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/30 to-violet-500/20 border border-indigo-400/30 mb-5">
                      <Icon className="w-5 h-5 text-indigo-100" />
                    </span>
                    <h3 className="relative text-xl font-light text-white mb-2.5">{a.title}</h3>
                    <p className="relative text-sm font-light text-white/70 leading-relaxed">
                      {a.body}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-14 max-w-3xl"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                Key Features
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">
                Fast, compliant,{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
                  cardiologist-signed
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl border border-indigo-400/15 bg-gradient-to-br from-indigo-950/30 via-black/70 to-black p-7 overflow-hidden relative"
                  >
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-violet-500/20 blur-3xl pointer-events-none" />
                    <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/30 to-violet-500/20 border border-indigo-400/30 mb-5">
                      <Icon className="w-5 h-5 text-indigo-100" />
                    </span>
                    <h3 className="relative text-xl font-light text-white mb-2.5">{f.title}</h3>
                    <p className="relative text-sm font-light text-white/70 leading-relaxed">
                      {f.body}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-950/40 via-black/80 to-violet-950/40 p-10 md:p-14 grid sm:grid-cols-3 gap-8 text-center"
            >
              {[
                { value: "24h", label: "Priority turnaround", icon: Clock },
                { value: "Global", label: "Cross-border compliance", icon: Lock },
                { value: "ABIM", label: "Board-certified readers", icon: HeartPulse },
              ].map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="flex flex-col items-center">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-400/30 mb-3">
                      <Icon className="w-5 h-5 text-indigo-200" />
                    </span>
                    <p className="text-3xl md:text-4xl font-light text-white">{s.value}</p>
                    <p className="text-xs text-indigo-200/70 mt-1.5 uppercase tracking-[0.18em]">
                      {s.label}
                    </p>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
