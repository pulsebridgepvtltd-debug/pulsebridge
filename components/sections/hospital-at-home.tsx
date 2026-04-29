"use client"

import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import EcgLine from "@/components/ecg-line"
import FlipCard from "@/components/flip-card"

const features = [
  "Integrated Clinician Portal",
  "Multi-Patient Monitoring",
  "Continuous and Episodic",
  "Real-Time ECG and Vitals",
  "Alerts, History and Trends",
]

const headingWords: { text: string; italic?: boolean }[] = [
  { text: "Advanced" },
  { text: "Acute" },
  { text: "Remote", italic: true },
  { text: "Patient", italic: true },
  { text: "Monitoring", italic: true },
]

const wordVariants = {
  hidden: { y: 32, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const patients = [
  { id: "P-2041", hr: 78, status: "Stable", color: "text-emerald-400", dot: "bg-emerald-400" },
  { id: "P-1872", hr: 102, status: "Watch", color: "text-amber-400", dot: "bg-amber-400" },
  { id: "P-0356", hr: 64, status: "Stable", color: "text-emerald-400", dot: "bg-emerald-400" },
]

export default function HospitalAtHome() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="mb-16 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5"
          >
            Hospital-at-Home
          </motion.span>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
            }}
            className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6 leading-tight"
          >
            {headingWords.map((w, i) => (
              <motion.span
                key={i}
                variants={wordVariants}
                className="inline-block mr-2.5 md:mr-3.5"
              >
                {w.italic ? (
                  <span className="instrument italic font-medium bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                    {w.text}
                  </span>
                ) : (
                  w.text
                )}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-base font-light text-white/70 leading-relaxed"
          >
            Continuity of acute patient care starts in the hospital and continues to the home. PulseBridge&apos;s
            integrated acute remote patient monitoring solution offers continuous and real-time monitoring of
            patient vitals, including live ECG, from virtually any location.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FlipCard duration={1.7} from={-85} className="relative">
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-violet-950/60 via-black/80 to-black backdrop-blur-md overflow-hidden p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-[10px] font-mono text-white/40 tracking-widest">CLINICIAN · PORTAL</span>
              </div>

              <div className="space-y-2.5 mb-5">
                {patients.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.9 + i * 0.12 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/[0.04] border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-[10px] text-violet-100">
                        {p.id.slice(-2)}
                      </div>
                      <div>
                        <p className="text-xs text-white">{p.id}</p>
                        <p className={`text-[10px] flex items-center gap-1.5 ${p.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
                          {p.status}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-light text-white leading-none">{p.hr}</p>
                      <p className="text-[10px] text-white/40 mt-0.5">BPM</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-lg bg-black/50 border border-violet-500/20 px-3 pt-3 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-violet-300 tracking-widest">LIVE ECG · LEAD II</span>
                  <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                  </span>
                </div>
                <div className="h-16">
                  <EcgLine color="#a78bfa" />
                </div>
              </div>
            </div>
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-violet-500/30 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-fuchsia-500/25 blur-3xl pointer-events-none" />
          </FlipCard>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ visible: { transition: { staggerChildren: 0.09, delayChildren: 0.3 } } }}
            className="space-y-4"
          >
            {features.map((label) => (
              <motion.li
                key={label}
                variants={{
                  hidden: { opacity: 0, x: 16 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                }}
                className="flex items-center gap-3 group"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/15 border border-violet-400/40 flex items-center justify-center group-hover:bg-violet-500/30 group-hover:border-violet-300/70 transition-colors">
                  <Check className="w-3.5 h-3.5 text-violet-100" strokeWidth={2.5} />
                </span>
                <span className="text-base font-light text-white/85 group-hover:text-white transition-colors">
                  {label}
                </span>
              </motion.li>
            ))}
            <motion.li
              variants={{
                hidden: { opacity: 0, x: 16 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
              className="pt-3"
            >
              <button className="inline-flex items-center gap-2 text-sm font-light text-violet-200 hover:text-white transition-colors group">
                Read More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.li>
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
