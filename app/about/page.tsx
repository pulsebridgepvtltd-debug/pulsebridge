"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Award,
  Compass,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
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
  { text: "Bridging" },
  { text: "the", italic: true },
  { text: "gap", italic: true },
  { text: "in" },
  { text: "diagnostics" },
]

const values = [
  {
    icon: HeartHandshake,
    title: "Patient-First",
    body: "Every product decision flows back to a single test — does this serve the patient at the end of the line?",
  },
  {
    icon: ShieldCheck,
    title: "Regulatory Rigor",
    body: "Quality systems built around ISO 13485 and global compliance from day one — not retrofitted later.",
  },
  {
    icon: Lightbulb,
    title: "Clinical Innovation",
    body: "Bridging consumer technology and medical-grade hardware — the way modern care should be delivered.",
  },
]

const milestones = [
  { year: "2019", label: "Founded with cardiac & women's health focus" },
  { year: "2021", label: "Wellysis · Samsung Bio-Sensor partnership" },
  { year: "2023", label: "Global Holter reading network launched" },
  { year: "2025", label: "LIFU clinical pilots for PCOS underway" },
]

export default function AboutPage() {
  return (
    <>
      <main className="relative text-white">
        {/* Hero — full viewport with integrated header */}
        <section className="relative overflow-hidden min-h-screen flex flex-col">
          <div className="absolute -top-40 right-1/4 w-[42rem] h-[42rem] rounded-full bg-violet-500/25 blur-[160px] pointer-events-none" />
          <div className="absolute top-1/3 -left-40 w-[36rem] h-[36rem] rounded-full bg-fuchsia-500/20 blur-[160px] pointer-events-none" />
          <div className="absolute -bottom-32 right-1/3 w-[32rem] h-[32rem] rounded-full bg-cyan-500/15 blur-[160px] pointer-events-none" />

          <Header showLogo />

          <div className="relative flex-1 flex items-center py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-200 text-[10px] font-light uppercase tracking-[0.18em] mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              About PulseBridge Healthcare
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
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl font-light text-white/75 leading-relaxed max-w-2xl"
            >
              We're a MedTech company committed to{" "}
              <span className="text-white">cardiac and women's health diagnostics</span> — building
              clinically rigorous, accessible, and globally scalable solutions.
            </motion.p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-400/30 text-fuchsia-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                  <Target className="w-3 h-3 mr-1.5" />
                  Our Mission
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-5 leading-tight">
                  Closing the diagnostic gap in{" "}
                  <span className="instrument italic font-medium bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                    cardiac & women's health
                  </span>
                </h2>
                <p className="text-base font-light text-white/70 leading-relaxed mb-4">
                  Cardiac arrhythmias and PCOS quietly affect millions, often diagnosed late or
                  not at all. Our mission is to put medical-grade tools in the hands of more
                  clinicians and more patients — across more geographies.
                </p>
                <p className="text-base font-light text-white/70 leading-relaxed">
                  We combine wearable hardware, clinical interpretation services, and a connected
                  data platform — engineered together, not bolted on after.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-950/40 via-black/80 to-black backdrop-blur-md overflow-hidden p-8 aspect-[4/3] flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-72 h-72 rounded-full bg-violet-500/30 blur-3xl"
                  />
                  <div className="relative grid grid-cols-2 gap-3 max-w-md">
                    {[
                      { icon: Award, label: "ISO 13485" },
                      { icon: ShieldCheck, label: "HIPAA · GDPR" },
                      { icon: Compass, label: "Health Canada" },
                      { icon: Sparkles, label: "AMTZ Partner" },
                    ].map((t, i) => {
                      const Icon = t.icon
                      return (
                        <motion.div
                          key={t.label}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                          className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md px-4 py-3 flex items-center gap-2.5"
                        >
                          <Icon className="w-4 h-4 text-violet-200" />
                          <span className="text-xs font-light text-white/85">{t.label}</span>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-fuchsia-500/30 blur-3xl pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-14 max-w-2xl mx-auto"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                What we stand for
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">
                The principles behind{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  every product
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {values.map((v, i) => {
                const Icon = v.icon
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                    className="group relative rounded-2xl border border-violet-400/15 bg-white/[0.04] backdrop-blur-md p-7 hover:border-violet-300/40 hover:bg-violet-500/[0.05] transition-colors overflow-hidden"
                  >
                    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-violet-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 border border-violet-400/30 mb-5">
                      <Icon className="w-5 h-5 text-violet-100" />
                    </span>
                    <h3 className="relative text-xl font-light text-white mb-2.5">{v.title}</h3>
                    <p className="relative text-sm font-light text-white/70 leading-relaxed">
                      {v.body}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="md:col-span-5 relative"
              >
                <div className="relative rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-950/40 via-black/80 to-fuchsia-950/30 overflow-hidden p-8 aspect-square flex flex-col items-center justify-center text-center">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-violet-300/40 to-fuchsia-400/30 border border-violet-300/30 flex items-center justify-center mb-5">
                    <span className="instrument text-4xl text-white/95 font-medium">PB</span>
                  </div>
                  <p className="text-[10px] font-mono tracking-[0.22em] text-violet-300 mb-1.5">
                    LEADERSHIP
                  </p>
                  <p className="text-lg font-light text-white">Founder & Clinical Lead</p>
                  <p className="text-xs font-light text-white/55 mt-1">
                    PulseBridge Healthcare
                  </p>
                </div>
                <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-violet-500/30 blur-3xl pointer-events-none" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="md:col-span-7"
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-400/30 text-fuchsia-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                  Leadership
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-5 leading-tight">
                  15+ years of regulatory expertise,{" "}
                  <span className="instrument italic font-medium bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                    a founder's vision
                  </span>
                </h2>
                <p className="text-base font-light text-white/70 leading-relaxed mb-4">
                  Our founder brings over a decade and a half navigating medical device approvals
                  across the FDA, Health Canada, and international regulatory bodies — combined
                  with a personal commitment to social entrepreneurship.
                </p>
                <p className="text-base font-light text-white/70 leading-relaxed">
                  PulseBridge was built on the belief that clinical excellence and accessibility
                  aren't trade-offs. They're a shared discipline.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12 max-w-3xl"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">
                Milestones along the way
              </h2>
            </motion.div>

            <div className="relative">
              <div className="absolute left-3 md:left-5 top-2 bottom-2 w-px bg-gradient-to-b from-violet-400/40 via-fuchsia-400/30 to-transparent" />
              <ul className="space-y-6">
                {milestones.map((m, i) => (
                  <motion.li
                    key={m.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="relative pl-12 md:pl-16"
                  >
                    <span className="absolute left-0 md:left-2 top-1 w-6 h-6 rounded-full border-2 border-violet-400/60 bg-black flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-300" />
                    </span>
                    <p className="text-sm font-mono text-violet-300 tracking-widest mb-1">
                      {m.year}
                    </p>
                    <p className="text-base font-light text-white/85">{m.label}</p>
                  </motion.li>
                ))}
              </ul>
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
              className="rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950/60 via-black/80 to-fuchsia-950/40 p-10 md:p-14 text-center relative overflow-hidden"
            >
              <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-violet-500/30 blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-fuchsia-500/25 blur-[120px] pointer-events-none" />

              <h3 className="relative text-3xl md:text-4xl font-light tracking-tight text-white mb-4 leading-tight">
                Want to{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
                  partner with us?
                </span>
              </h3>
              <p className="relative text-base font-light text-white/70 mb-8 max-w-xl mx-auto">
                We work with health systems, clinics, research groups, and distributors. Tell us
                about your context and we'll find the right path.
              </p>
              <Link
                href="/contact"
                className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
              >
                Get in Touch
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
