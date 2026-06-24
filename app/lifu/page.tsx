"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Cpu,
  Headphones,
  Layers3,
  Github,
  Smartphone,
  Radio,
  Zap,
  FlaskConical,
  BookOpen,
  Microscope,
} from "lucide-react"

const specs = [
  { value: "64", unit: "Elements", label: "per transmit module — 2D matrix array" },
  { value: "1× / 2×", unit: "Configs", label: "for shallow or deep anatomical targets" },
  { value: "2.16", unit: "MPa", label: "Peak negative pressure — dual 400 kHz, derated" },
  { value: "3–11", unit: "cm", label: "Axial steering range in 2× configuration" },
  { value: "1,200", unit: "kPa", label: "Programmable focal pressure range" },
  { value: "10", unit: "MHz", label: "Beamformer clock for sub-μs phase control" },
]

const components = [
  {
    icon: Cpu,
    name: "Console",
    tagline: "The control brain.",
    body: "Generates high-voltage drive signals (up to ±65 V), coordinates timing, and communicates with your PC over USB-C. Compact at 3 lb — fits any lab bench.",
  },
  {
    icon: Headphones,
    name: "Transducer",
    tagline: "A wearable headset.",
    body: "Houses one or two 64-element 2D matrix transmit modules. Ships with a disposable hydrogel coupling pad and spatial-localization markings built in.",
  },
  {
    icon: Layers3,
    name: "Software Stack",
    tagline: "Five layers, fully open.",
    body: "From 3D Slicer treatment planning to a low-level transmit-module SDK. Runs on Windows 11 with NVIDIA CUDA for real-time processing.",
  },
]

const openItems = [
  {
    icon: Github,
    label: "Fork the Repo",
    sub: "Submit PRs, file issues, contribute protocols",
  },
  {
    icon: Radio,
    label: "Discord Community",
    sub: "Researchers to neuromodulation teams",
  },
  {
    icon: Microscope,
    label: "3D Slicer Integration",
    sub: "Familiar neuronavigation environment",
  },
  {
    icon: Smartphone,
    label: "Android Localization",
    sub: "Photogrammetric 3D targeting — no external tracker",
  },
]

const highlights = [
  "64-Ch Synchronized Tiles",
  "155 kHz & 400 kHz",
  "Android Targeting App",
  "Open-Source Platform",
  "GUI · 3D Slicer · Python Control",
]

export default function LifuPage() {
  return (
    <>
      <main className="relative text-white">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden min-h-screen flex flex-col">
          <div className="absolute -top-40 right-1/4 w-[42rem] h-[42rem] rounded-full bg-violet-500/20 blur-[160px] pointer-events-none" />
          <div className="absolute top-1/3 -left-40 w-[36rem] h-[36rem] rounded-full bg-indigo-500/15 blur-[160px] pointer-events-none" />
          <div className="absolute -bottom-32 right-1/3 w-[32rem] h-[32rem] rounded-full bg-purple-500/10 blur-[160px] pointer-events-none" />

          <Header showLogo />

          <div className="relative flex-1 flex items-center py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center gap-2 mb-6"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-200 text-[10px] font-light uppercase tracking-[0.18em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  Open-source
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-white/50 text-[10px] font-light uppercase tracking-[0.18em]">
                  Feature Rich
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-white/50 text-[10px] font-light uppercase tracking-[0.18em]">
                  LIFU
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] max-w-5xl mb-4"
              >
                Low-Intensity{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-violet-300 via-purple-200 to-indigo-300 bg-clip-text text-transparent">
                  Focused Ultrasound
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl md:text-2xl font-light text-white/45 tracking-wide mb-5"
              >
                Precision Therapy, Reimagined for PCOD and PCOS.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
                className="text-base md:text-lg font-light text-white/65 leading-relaxed max-w-2xl mb-10"
              >
                A fully modular, open-source LIFU platform — flexible, easy-to-use, and capable of
                delivering focused ultrasound to targets nearly anywhere in the head or body.
                Designed for discovery, built for translation.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center gap-4 mb-10"
              >
                <Link
                  href="/lifu/technology"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-colors"
                >
                  Explore the Technology
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white text-sm font-light hover:bg-white/10 transition-colors"
                >
                  Request a Demo
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-wrap gap-2"
              >
                {highlights.map((h) => (
                  <span
                    key={h}
                    className="px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/50 text-xs font-light tracking-wide"
                  >
                    {h}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Platform Overview + Device Image ── */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                  LIFU Platform
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-5 leading-tight">
                  Modular and configurable{" "}
                  <span className="instrument italic font-medium bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
                    for many applications
                  </span>
                </h2>
                <p className="text-base font-light text-white/70 leading-relaxed mb-5">
                  The LIFU platform is flexible, easy-to-use, and can deliver focused ultrasound to
                  targets nearly anywhere in the head or body. While devices are ready out of the
                  box, the open-source design allows customization to support clinical research
                  across diverse users and applications.
                </p>
                <p className="text-base font-light text-white/55 leading-relaxed">
                  LIFU&apos;s controlled design features make it effective for developing regulated
                  medical devices that are portable and low-cost — bridging the gap from
                  proof-of-concept to commercially manufacturable hardware.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden border border-violet-400/15 bg-white/[0.02]">
                  <Image
                    src="/LIFU device.png"
                    alt="LIFU Device"
                    width={600}
                    height={520}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-violet-500/20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-indigo-500/15 blur-2xl pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Three Components ── */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/8 to-transparent pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-14 max-w-2xl mx-auto"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                Hardware Platform
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight mb-4">
                Three components.{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
                  Infinite configurations.
                </span>
              </h2>
              <p className="text-base font-light text-white/55 leading-relaxed">
                A clean separation of concerns — a powerful console, a wearable transducer, and
                the software stack that ties it all together. Each element is documented,
                serviceable, and open for extension.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5 mb-14">
              {components.map((c, i) => {
                const Icon = c.icon
                return (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                    className="group relative rounded-2xl border border-violet-400/15 bg-white/[0.04] backdrop-blur-md p-7 hover:border-violet-300/40 hover:bg-violet-500/[0.05] transition-colors overflow-hidden"
                  >
                    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-violet-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/30 to-indigo-500/20 border border-violet-400/30 mb-5">
                      <Icon className="w-5 h-5 text-violet-200" />
                    </span>
                    <h3 className="relative text-xl font-light text-white mb-1">{c.name}</h3>
                    <p className="relative text-xs font-light text-violet-300/70 mb-3">{c.tagline}</p>
                    <p className="relative text-sm font-light text-white/65 leading-relaxed">{c.body}</p>
                  </motion.div>
                )
              })}
            </div>

            {/* Architecture Image */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]"
            >
              <Image
                src="/lifu arch.webp"
                alt="LIFU System Architecture"
                width={1200}
                height={540}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="text-[10px] font-light text-white/40 uppercase tracking-[0.2em]">
                  System Architecture
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Specs Grid ── */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-14"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                Precision you can measure
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight max-w-2xl">
                Every parameter,{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
                  fully programmable
                </span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {specs.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-6 hover:border-violet-400/25 hover:bg-violet-500/[0.04] transition-colors"
                >
                  <div className="text-3xl md:text-4xl font-light text-white mb-1 leading-none">
                    {s.value}{" "}
                    <span className="text-base md:text-lg font-light text-violet-300/80">{s.unit}</span>
                  </div>
                  <p className="text-xs font-light text-white/45 leading-relaxed mt-2">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Research Spotlight ── */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-950/60 via-black/80 to-violet-950/40 overflow-hidden p-10 md:p-14"
            >
              <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-violet-500/15 blur-[120px] pointer-events-none" />

              <div className="relative">
                <div className="flex flex-wrap items-center gap-3 mb-7">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-200 text-[10px] font-light uppercase tracking-[0.18em]">
                    <FlaskConical className="w-3 h-3" />
                    Research Spotlight
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-light uppercase tracking-[0.18em]">
                    <BookOpen className="w-3 h-3" />
                    Webinar
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-light text-white mb-5 leading-tight max-w-3xl">
                  Transcranial Focused Ultrasound Neuromodulation of the{" "}
                  <span className="instrument italic font-medium text-indigo-200">
                    Default Mode Network
                  </span>{" "}
                  in the Treatment of Depression and Promotion of Wellness
                </h3>

                <div className="space-y-4 max-w-3xl">
                  <p className="text-base font-light text-white/65 leading-relaxed">
                    Repetitive Negative Thinking (RNT) — including rumination and worry — is a
                    transdiagnostic cognitive process central to major depressive disorder (MDD),
                    generalized anxiety disorder (GAD), and obsessive-compulsive disorder (OCD).
                    Elevated RNT is linked to increased connectivity within the brain&apos;s Default
                    Mode Network (DMN), which supports self-referential thought and is often
                    hyperactive in these conditions.
                  </p>
                  <p className="text-base font-light text-white/50 leading-relaxed">
                    Emerging evidence suggests that low-intensity transcranial focused ultrasound
                    (litFUS) may reduce Repetitive Negative Thinking and mood-related symptoms in
                    clinical populations, and also promote emotional wellness in nonclinical groups.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Deep Dive Teaser → /lifu/technology ── */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/lifu/technology" className="group block">
                <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-violet-400/30 transition-all duration-300">
                  <div className="grid md:grid-cols-2">
                    {/* Text side */}
                    <div className="p-10 md:p-14 flex flex-col justify-center">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-200 text-[10px] font-light uppercase tracking-[0.18em] mb-6 self-start">
                        <Zap className="w-3 h-3" />
                        Deep Dive
                      </span>
                      <h3 className="text-2xl md:text-3xl font-light text-white mb-4 leading-tight">
                        Precision Without Movement:{" "}
                        <span className="instrument italic font-medium bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
                          How Open-LIFU Steers Focused Ultrasound to a Point
                        </span>
                      </h3>
                      <p className="text-base font-light text-white/60 leading-relaxed mb-8">
                        By precisely timing when each of 64 elements fires, Open-LIFU&apos;s 2D matrix
                        array concentrates acoustic energy anywhere in a three-dimensional volume —
                        no mechanical repositioning required.
                      </p>
                      <div className="inline-flex items-center gap-2 text-violet-300 text-sm font-light group-hover:gap-3 transition-all">
                        Explore the Science
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                    {/* Image side */}
                    <div className="relative min-h-[280px] md:min-h-0">
                      <Image
                        src="/2d_array_beamsteering_8x8.png"
                        alt="2D Array Beamsteering 8×8"
                        fill
                        className="object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 md:from-black/50 via-black/20 to-transparent" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── Open Source ── */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-2 gap-14 items-center"
            >
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-white/55 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                  Open. Always.
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-5 leading-tight">
                  Every schematic,{" "}
                  <span className="instrument italic font-medium bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">
                    open and auditable
                  </span>
                </h2>
                <p className="text-base font-light text-white/65 leading-relaxed mb-8">
                  Open-LIFU isn&apos;t a black box. Every hardware schematic, firmware file, and
                  software layer is published and community-licensed — so you can validate,
                  extend, and build on a foundation you actually understand.
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    "Hardware under CC BY-SA 4.0",
                    "Documentation under CC BY 4.0",
                    "Community on GitHub and Discord",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-light text-white/55">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {openItems.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-violet-400/20 hover:bg-violet-500/[0.04] transition-colors"
                    >
                      <Icon className="w-5 h-5 text-violet-300/75 mb-3" />
                      <p className="text-sm font-light text-white mb-1.5">{item.label}</p>
                      <p className="text-xs font-light text-white/40 leading-snug">{item.sub}</p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950/60 via-black/80 to-indigo-950/40 overflow-hidden p-10 md:p-14 text-center"
            >
              <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-violet-500/25 blur-[120px] pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />

              <h3 className="relative text-3xl md:text-4xl font-light tracking-tight text-white mb-4 leading-tight">
                Ready to explore{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-violet-200 to-indigo-200 bg-clip-text text-transparent">
                  LIFU for your research?
                </span>
              </h3>
              <p className="relative text-base font-light text-white/60 mb-8 max-w-xl mx-auto">
                Get platform specs, clinical protocols, and direct access to our research team.
              </p>
              <div className="relative flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-colors"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/lifu/technology"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white text-sm font-light hover:bg-white/10 transition-colors"
                >
                  Explore Technology
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
