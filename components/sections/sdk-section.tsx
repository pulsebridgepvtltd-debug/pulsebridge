"use client"

import { motion } from "framer-motion"
import { ArrowRight, Droplets, Gauge, HeartPulse, Thermometer, Wind } from "lucide-react"
import FlipCard from "@/components/flip-card"

const sensors = [
  { icon: HeartPulse, label: "ECG & Heart Rate" },
  { icon: Wind, label: "Respiratory" },
  { icon: Thermometer, label: "Temperature" },
  { icon: Droplets, label: "SpO₂" },
  { icon: Gauge, label: "Blood Pressure" },
]

export default function SdkSection() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.20]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(196,181,253,0.6) 1px, transparent 0)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
              SDK · Build with us
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-5 leading-tight">
              Software{" "}
              <span className="instrument italic font-medium bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
                Development Kit
              </span>
            </h2>
            <p className="text-base font-light text-white/70 leading-relaxed mb-8">
              Partners interested in the Biometrics Data Platform can integrate their clinical application using
              our SDK. Components include a suite of medical-grade wearable sensors, mobile patient app, and
              cloud data services. Be up and running in as little as{" "}
              <span className="text-white">14 days</span>.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-full bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors inline-flex items-center gap-2"
              >
                Contact Us to Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white text-xs font-light hover:bg-white/10 transition-colors"
              >
                View Documentation
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-indigo-400/20 bg-gradient-to-br from-indigo-950/40 via-black/80 to-black backdrop-blur-md overflow-hidden p-6 font-mono text-[11px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                </div>
                <span className="text-[10px] text-indigo-200/60 tracking-widest">QUICKSTART.TS</span>
              </div>

              <div className="space-y-1.5 leading-relaxed">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <span className="text-violet-300">import</span>
                  <span className="text-white/80">{' { PulseBridge } from "@pulsebridge/sdk"'}</span>
                </motion.div>
                <div className="h-2" />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="text-white/80"
                >
                  <span className="text-violet-300">const</span>{" "}
                  <span className="text-cyan-200">client</span> ={" "}
                  <span className="text-amber-200">new</span>{" "}
                  <span className="text-emerald-200">PulseBridge</span>(&#123;
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="pl-4 text-white/70"
                >
                  apiKey: <span className="text-rose-200">process.env.PB_KEY</span>,
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="pl-4 text-white/70"
                >
                  sensors: [<span className="text-rose-200">&quot;ecg&quot;</span>,{" "}
                  <span className="text-rose-200">&quot;spo2&quot;</span>,{" "}
                  <span className="text-rose-200">&quot;temp&quot;</span>],
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="text-white/80"
                >
                  &#125;)
                </motion.div>
                <div className="h-2" />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.95 }}
                  className="text-white/80"
                >
                  <span className="text-violet-300">await</span> client.
                  <span className="text-cyan-200">stream</span>(<span className="text-rose-200">&quot;P-2041&quot;</span>)
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.4 }}
                  className="inline-block w-2 h-3.5 bg-indigo-300 align-middle ml-1"
                />
              </div>
            </div>
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-indigo-500/30 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-violet-500/25 blur-3xl pointer-events-none" />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {sensors.map((s, idx) => {
            const Icon = s.icon
            return (
              <FlipCard key={s.label} delay={idx * 0.1} duration={0.9} from={50}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col items-center text-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-5 hover:border-white/25 hover:bg-white/[0.07] transition-colors"
                >
                  <span className="w-11 h-11 rounded-lg border border-white/10 bg-white/[0.05] flex items-center justify-center group-hover:border-white/30 transition-colors">
                    <Icon className="w-5 h-5 text-white/85" />
                  </span>
                  <span className="text-xs font-light text-white/85">{s.label}</span>
                </motion.div>
              </FlipCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
