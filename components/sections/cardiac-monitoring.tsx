"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Activity, ArrowRight, FileBarChart, Heart, Layers, Radio } from "lucide-react"
import EcgLine from "@/components/ecg-line"

const features = [
  { icon: Layers, label: "MCT or Holter Modes" },
  { icon: FileBarChart, label: "Customizable ECG Reports" },
  { icon: Activity, label: "Full Disclosure Views" },
  { icon: Radio, label: "Live ECG Monitoring" },
  { icon: Heart, label: "Events / Surveys" },
]

export default function CardiacMonitoring() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-3xl"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
            Cardiac Telemetry
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-5 leading-tight">
            Ambulatory{" "}
            <span className="instrument italic font-medium bg-gradient-to-r from-rose-300 via-orange-300 to-amber-200 bg-clip-text text-transparent">
              Cardiac Monitoring
            </span>
          </h2>
          <p className="text-base font-light text-white/70 leading-relaxed">
            Integrated technology solution for Mobile Cardiac Telemetry and Holter services. Turnkey patient
            RPM kits, arrhythmia detection, ECG reports, and a unified clinician portal.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-3 relative"
          >
            <div className="relative rounded-2xl border border-rose-400/15 bg-gradient-to-br from-rose-950/40 via-black/80 to-black backdrop-blur-md overflow-hidden p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-2.5 h-2.5 rounded-full bg-rose-400"
                  />
                  <span className="text-[10px] font-mono text-rose-200 tracking-widest">MCT MODE · ACTIVE</span>
                </div>
                <span className="text-[10px] font-mono text-white/40">72 BPM · NSR</span>
              </div>

              <div className="space-y-3">
                {["Lead I", "Lead II", "Lead III"].map((lead, i) => (
                  <div key={lead} className="rounded-lg bg-black/40 border border-rose-400/10 p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-rose-300/80">{lead}</span>
                      <span className="text-[10px] font-mono text-white/30">25 mm/s · 10 mm/mV</span>
                    </div>
                    <div className="h-10 overflow-hidden">
                      <EcgLine color={i === 0 ? "#fb7185" : i === 1 ? "#f97316" : "#fbbf24"} duration={2.4 + i * 0.3} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 mt-5">
                {[
                  { label: "Events", value: "12" },
                  { label: "Recording", value: "06:42:18" },
                  { label: "AFib Burden", value: "0.3%" },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg bg-white/[0.03] border border-rose-400/10 p-3">
                    <p className="text-sm font-light text-white">{s.value}</p>
                    <p className="text-[10px] text-rose-200/70 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="md:col-span-2 space-y-3">
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
              className="space-y-2.5"
            >
              {features.map((f) => {
                const Icon = f.icon
                return (
                  <motion.li
                    key={f.label}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    }}
                    whileHover={{ x: 4 }}
                    className="group flex items-center gap-3 p-3.5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-rose-400/40 hover:bg-rose-500/[0.06] transition-colors"
                  >
                    <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500/30 to-orange-500/20 border border-rose-400/30 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-rose-100" />
                    </span>
                    <span className="text-sm text-white font-light">{f.label}</span>
                  </motion.li>
                )
              })}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="pt-2"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-light text-rose-200 hover:text-white hover:translate-x-1 transition-all group"
              >
                Read More
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
