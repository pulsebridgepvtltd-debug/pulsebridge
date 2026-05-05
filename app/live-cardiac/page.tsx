"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import EcgLine from "@/components/ecg-line"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Activity,
  AlarmClockCheck,
  AlertTriangle,
  ArrowRight,
  Bell,
  CloudCog,
  Eye,
  Radio,
  Zap,
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
  { text: "Real-time" },
  { text: "Cardiac", italic: true },
  { text: "Monitoring" },
  { text: "+ Alerts", italic: true },
]

const dashboardFeatures = [
  {
    icon: Eye,
    title: "24/7 Monitoring Oversight",
    body: "Always-on clinician dashboard. Live patient cohorts, signal status, and adherence visible at a glance.",
  },
  {
    icon: AlertTriangle,
    title: "Automated Event Detection",
    body: "ML-driven arrhythmia, AFib, and bradycardia detection. Critical events surface immediately to oncall staff.",
  },
  {
    icon: CloudCog,
    title: "Cloud-Based Data Storage",
    body: "Encrypted, redundant storage with full audit trail. Replay any moment in a patient's recording history.",
  },
]

export default function LiveCardiacPage() {
  return (
    <>
      <main className="relative text-white">
        {/* Hero — full viewport with integrated header */}
        <section className="relative overflow-hidden min-h-screen flex flex-col">
          <div className="absolute -top-40 right-1/4 w-[42rem] h-[42rem] rounded-full bg-rose-500/25 blur-[160px] pointer-events-none" />
          <div className="absolute top-1/3 -left-40 w-[36rem] h-[36rem] rounded-full bg-orange-500/20 blur-[160px] pointer-events-none" />
          <div className="absolute -bottom-32 right-1/3 w-[32rem] h-[32rem] rounded-full bg-amber-500/15 blur-[160px] pointer-events-none" />

          <Header showLogo />

          <div className="relative flex-1 flex items-center py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-200 text-[10px] font-light uppercase tracking-[0.18em] mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              LIVE Cardiac Monitoring · 24/7
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
                    <span className="instrument italic font-medium bg-gradient-to-r from-rose-200 via-orange-200 to-amber-200 bg-clip-text text-transparent">
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
              <span className="text-white">Real-time heart health tracking</span> with emergency
              alert systems — clinicians see what matters, the moment it matters.
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
                Watch Live Demo
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white text-sm font-light hover:bg-white/10 transition-colors"
              >
                Talk to Cardiology Team
              </Link>
            </motion.div>
            </div>
          </div>
        </section>

        {/* Live dashboard mock */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                  Why it matters
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-5 leading-tight">
                  Every second a clinician saves,{" "}
                  <span className="instrument italic font-medium bg-gradient-to-r from-rose-300 to-amber-200 bg-clip-text text-transparent">
                    a patient gains
                  </span>
                </h2>
                <p className="text-base font-light text-white/70 leading-relaxed mb-6">
                  Episodic monitoring misses transient events. Live monitoring catches them in
                  motion — bringing emergency response forward by hours, sometimes days.
                </p>
                <ul className="space-y-3">
                  {[
                    { icon: Radio, text: "Continuous streaming · sub-second latency" },
                    { icon: Bell, text: "Triaged alerts to clinician phones & dashboards" },
                    { icon: AlarmClockCheck, text: "Audit trail of every event & response time" },
                  ].map((p) => {
                    const Icon = p.icon
                    return (
                      <li key={p.text} className="flex items-start gap-3 text-sm text-white/80">
                        <Icon className="w-4 h-4 text-rose-300 flex-shrink-0 mt-0.5" />
                        {p.text}
                      </li>
                    )
                  })}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative rounded-2xl border border-rose-400/15 bg-gradient-to-br from-rose-950/40 via-black/80 to-black backdrop-blur-md overflow-hidden p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <motion.span
                        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-2.5 h-2.5 rounded-full bg-rose-400"
                      />
                      <span className="text-[10px] font-mono text-rose-200 tracking-widest">
                        LIVE · CONTROL ROOM
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-white/40">
                      72 BPM · NSR · LEAD II
                    </span>
                  </div>

                  <div className="rounded-lg bg-black/50 border border-rose-500/20 p-4 mb-4 h-24">
                    <EcgLine color="#fb7185" duration={2.2} />
                  </div>

                  <div className="space-y-2 mb-4">
                    {[
                      { id: "P-2041", status: "Stable", color: "emerald", hr: 78 },
                      { id: "P-1872", status: "AFib alert", color: "amber", hr: 112 },
                      { id: "P-0356", status: "Stable", color: "emerald", hr: 64 },
                    ].map((p, i) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                        className="flex items-center justify-between rounded-lg bg-white/[0.04] border border-white/10 px-3 py-2"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              p.color === "emerald" ? "bg-emerald-400" : "bg-amber-400 animate-pulse"
                            }`}
                          />
                          <span className="text-xs text-white">{p.id}</span>
                          <span
                            className={`text-[10px] ${
                              p.color === "emerald" ? "text-emerald-300/80" : "text-amber-300/90"
                            }`}
                          >
                            {p.status}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-white/70">{p.hr} BPM</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="rounded-lg border border-amber-400/30 bg-amber-500/[0.07] p-3 flex items-center gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-md bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 text-amber-200" />
                    </span>
                    <div className="flex-1">
                      <p className="text-[11px] text-amber-100/90">
                        AFib detected · P-1872 · escalated to Dr. Patel
                      </p>
                      <p className="text-[9px] text-amber-200/60 mt-0.5">
                        Response time: 14s · auto-paged
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-rose-500/30 blur-3xl pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dashboard features */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-14 max-w-2xl mx-auto"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                Dashboard
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">
                Built for the{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-rose-300 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                  control room
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {dashboardFeatures.map((f, i) => {
                const Icon = f.icon
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                    className="group relative rounded-2xl border border-rose-400/15 bg-white/[0.04] backdrop-blur-md p-7 hover:border-rose-300/40 hover:bg-rose-500/[0.05] transition-colors overflow-hidden"
                  >
                    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-rose-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/30 to-amber-500/20 border border-rose-400/30 mb-5">
                      <Icon className="w-5 h-5 text-rose-100" />
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

        {/* CTA */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-rose-400/20 bg-gradient-to-br from-rose-950/60 via-black/80 to-amber-950/40 overflow-hidden p-10 md:p-14 text-center"
            >
              <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-rose-500/30 blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-amber-500/25 blur-[120px] pointer-events-none" />

              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-400/40 mb-5">
                <Activity className="w-6 h-6 text-rose-200" />
              </div>
              <h3 className="relative text-3xl md:text-4xl font-light tracking-tight text-white mb-4 leading-tight">
                See live monitoring{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-rose-200 to-amber-200 bg-clip-text text-transparent">
                  in action
                </span>
              </h3>
              <p className="relative text-base font-light text-white/70 mb-8 max-w-xl mx-auto">
                Walk through the clinician dashboard with our team — and see how alerts route to
                your on-call staff in real time.
              </p>
              <div className="relative flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  Schedule Demo
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white text-sm font-light hover:bg-white/10 transition-colors"
                >
                  Talk to Sales
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
