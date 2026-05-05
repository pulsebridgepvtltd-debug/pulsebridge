"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Calendar,
  FileText,
  HeartHandshake,
  Sparkles,
  ShieldCheck,
  Waves,
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
  { text: "Non-invasive" },
  { text: "Therapy", italic: true },
  { text: "for", italic: true },
  { text: "Women's", italic: true },
  { text: "Health" },
]

const features = [
  {
    icon: Sparkles,
    title: "Painless Procedure",
    body: "No incisions, no needles. LIFU energy is delivered through the skin without pain or discomfort.",
  },
  {
    icon: Zap,
    title: "Zero Downtime",
    body: "Resume daily activities immediately. No hospital stay, no recovery period required.",
  },
  {
    icon: ShieldCheck,
    title: "Non-Surgical",
    body: "Targeted ultrasound replaces surgical intervention while preserving surrounding tissue.",
  },
]

const symptoms = [
  "Irregular menstrual cycles",
  "Ovarian cysts and follicle imbalance",
  "Hormonal acne and skin issues",
  "Insulin resistance",
  "Pelvic pain and discomfort",
  "Fertility-related concerns",
]

export default function LifuPage() {
  return (
    <>
      <main className="relative text-white">
        {/* Hero — full viewport with integrated header */}
        <section className="relative overflow-hidden min-h-screen flex flex-col">
          <div className="absolute -top-40 right-1/4 w-[42rem] h-[42rem] rounded-full bg-rose-500/25 blur-[160px] pointer-events-none" />
          <div className="absolute top-1/3 -left-40 w-[36rem] h-[36rem] rounded-full bg-fuchsia-500/20 blur-[160px] pointer-events-none" />
          <div className="absolute -bottom-32 right-1/3 w-[32rem] h-[32rem] rounded-full bg-pink-500/15 blur-[160px] pointer-events-none" />

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
              Flagship Technology · LIFU
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
                    <span className="instrument italic font-medium bg-gradient-to-r from-rose-200 via-fuchsia-200 to-pink-200 bg-clip-text text-transparent">
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
              Clear, non-invasive therapeutic solutions for PCOD & PCOS using{" "}
              <span className="text-white">Low-Intensity Focused Ultrasound</span> — precision care
              without surgery.
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
                <FileText className="w-4 h-4" />
                Request Clinical Data
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white text-sm font-light hover:bg-white/10 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book a Consultation
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            </div>
          </div>
        </section>

        {/* How LIFU works */}
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
                  How it works
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-5 leading-tight">
                  Focused acoustic energy,{" "}
                  <span className="instrument italic font-medium bg-gradient-to-r from-rose-300 to-fuchsia-300 bg-clip-text text-transparent">
                    targeted precisely
                  </span>
                </h2>
                <p className="text-base font-light text-white/70 leading-relaxed mb-6">
                  Low-Intensity Focused Ultrasound delivers controlled acoustic waves to specific
                  tissue depth — modulating ovarian and hormonal function without affecting
                  surrounding cells. The procedure is guided by real-time imaging for accuracy.
                </p>
                <ul className="space-y-3">
                  {[
                    "Controlled energy delivery (mW/cm²)",
                    "Real-time imaging guidance",
                    "Outpatient setting · 30-minute sessions",
                  ].map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-white/75">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative rounded-2xl border border-rose-400/15 bg-gradient-to-br from-rose-950/40 via-black/80 to-black backdrop-blur-md overflow-hidden p-8 aspect-square flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-64 h-64 rounded-full bg-rose-500/30 blur-3xl"
                  />
                  {[1, 2, 3, 4].map((ring) => (
                    <motion.div
                      key={ring}
                      animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: ring * 0.5,
                        ease: "easeOut",
                      }}
                      className="absolute w-32 h-32 rounded-full border border-rose-300/40"
                    />
                  ))}
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-rose-300 to-fuchsia-400 flex items-center justify-center shadow-[0_0_60px_rgba(244,63,94,0.6)]">
                    <Waves className="w-9 h-9 text-white" />
                  </div>
                </div>
                <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-fuchsia-500/30 blur-3xl pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key features */}
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
                Why LIFU
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">
                A new standard for{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-rose-300 via-fuchsia-300 to-pink-200 bg-clip-text text-transparent">
                  women's care
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
                    whileHover={{ y: -6 }}
                    className="group relative rounded-2xl border border-rose-400/15 bg-white/[0.04] backdrop-blur-md p-7 hover:border-rose-300/40 hover:bg-rose-500/[0.05] transition-colors overflow-hidden"
                  >
                    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-rose-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/30 to-fuchsia-500/20 border border-rose-400/30 mb-5">
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

        {/* PCOS symptoms */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="md:col-span-5"
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-400/30 text-fuchsia-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                  Applications
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-5 leading-tight">
                  Helping address{" "}
                  <span className="instrument italic font-medium bg-gradient-to-r from-rose-300 to-fuchsia-300 bg-clip-text text-transparent">
                    PCOD & PCOS
                  </span>
                </h2>
                <p className="text-base font-light text-white/70 leading-relaxed">
                  An estimated 1 in 10 women of reproductive age live with PCOS. LIFU offers a path
                  forward where conservative treatment has plateaued — without the burden of
                  surgery.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
                className="md:col-span-7 grid sm:grid-cols-2 gap-3"
              >
                {symptoms.map((s) => (
                  <motion.div
                    key={s}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                    }}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm px-4 py-3.5 hover:border-rose-300/30 hover:bg-rose-500/[0.05] transition-colors"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-md bg-rose-500/15 border border-rose-400/30 flex items-center justify-center">
                      <HeartHandshake className="w-3.5 h-3.5 text-rose-200" />
                    </span>
                    <span className="text-sm font-light text-white/85">{s}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-rose-400/20 bg-gradient-to-br from-rose-950/60 via-black/80 to-fuchsia-950/40 overflow-hidden p-10 md:p-14 text-center"
            >
              <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-rose-500/30 blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-fuchsia-500/25 blur-[120px] pointer-events-none" />

              <h3 className="relative text-3xl md:text-4xl font-light tracking-tight text-white mb-4 leading-tight">
                Ready to learn more about{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-rose-200 to-fuchsia-200 bg-clip-text text-transparent">
                  LIFU therapy?
                </span>
              </h3>
              <p className="relative text-base font-light text-white/70 mb-8 max-w-xl mx-auto">
                Speak to our clinical team for protocol details, evidence summaries, and patient
                fit assessment.
              </p>
              <div className="relative flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Request Clinical Data
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white text-sm font-light hover:bg-white/10 transition-colors"
                >
                  Book a Consultation
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
