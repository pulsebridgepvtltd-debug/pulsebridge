"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Waves, Grid3x3, Clock, Activity } from "lucide-react"

const techSections = [
  {
    id: "interference",
    num: "01",
    icon: Waves,
    title: "The physics of constructive interference",
    paragraphs: [
      "When two wavefronts arrive at the same point at the same time, they add together. When they arrive half a wavelength out of phase, they cancel. Open-LIFU exploits this: by firing all 64 elements with individually tuned delays, every wavefront is arranged to arrive at the target simultaneously.",
      "Amplitudes stack — constructive interference — producing a hot spot of acoustic pressure far more intense than any individual element could generate alone. Everywhere else, the waves cancel or disperse harmlessly through tissue.",
    ],
  },
  {
    id: "grid",
    num: "02",
    icon: Grid3x3,
    title: "From a line to a grid",
    paragraphs: [
      "A 1D array can steer and focus a beam, but only within a single plane — you get control in two dimensions, not three. Open-LIFU's 2D matrix layout changes that entirely.",
      "With elements arranged in a full grid, the focal point can be positioned anywhere in the volume in front of the transducer — left, right, up, down, near, far — without moving the headset at all.",
    ],
  },
  {
    id: "delay",
    num: "03",
    icon: Clock,
    title: "Steering by delay",
    paragraphs: [
      "The key variable is when each element fires. To focus at a target, the beamformer calculates the distance from that target to every element in the 8×8 grid. Elements farther away fire first; elements closer fire later.",
      "The delays are chosen so that every wavefront arrives at the target simultaneously. Open-LIFU's beamformer runs on a 10 MHz clock for fine-grained phase control, giving sub-microsecond timing precision across all 64 channels.",
      "Want to move the focus deeper? Increase delays uniformly around the perimeter and decrease them toward the center — the classic converging lens pattern. Want to steer laterally? Shift the delay map in that direction. These profiles are computed and updated in software, meaning the focal point can be repositioned electronically between pulses without touching the hardware.",
    ],
  },
  {
    id: "clinical",
    num: "04",
    icon: Activity,
    title: "Why 2D matters clinically",
    paragraphs: [
      "With a 1D array, a researcher must physically reposition the transducer to reach targets outside its focal plane. Open-LIFU's 2D matrix eliminates that constraint. The focal point can be steered across a volume electronically — useful for targeting irregular anatomical structures or adapting to subject-to-subject variation without re-seating the headset.",
      "This capability pairs directly with Open-LIFU's spatial localization system. An embossed faceplate pattern enables photogrammetric 3D localization via a standard Android phone, and that mesh feeds directly into the treatment-planning software, letting you target with anatomical precision before the first pulse is fired. The result is a closed loop: anatomy in, delay profile out, focused energy on target.",
    ],
  },
]

const inlineSpecs = [
  { value: "64", label: "Independently addressable elements" },
  { value: "8×8", label: "Grid layout — 2D matrix array" },
  { value: "10 MHz", label: "Beamformer clock — sub-μs precision" },
  { value: "2.16 MPa", label: "Peak negative pressure (dual 400 kHz)" },
  { value: "3–11 cm", label: "Axial steering range (2× config)" },
  { value: "0–1,200 kPa", label: "Programmable focal pressure" },
]

export default function LifuTechnologyPage() {
  return (
    <>
      <main className="relative text-white">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden min-h-[65vh] flex flex-col">
          <div className="absolute -top-40 right-1/4 w-[42rem] h-[42rem] rounded-full bg-violet-500/15 blur-[160px] pointer-events-none" />
          <div className="absolute top-1/2 -left-40 w-[36rem] h-[36rem] rounded-full bg-indigo-500/10 blur-[160px] pointer-events-none" />

          <Header showLogo />

          <div className="relative flex-1 flex items-center py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-6 md:px-10 w-full">
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8"
              >
                <Link
                  href="/lifu"
                  className="inline-flex items-center gap-2 text-sm font-light text-white/45 hover:text-white/80 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to LIFU
                </Link>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-200 text-[10px] font-light uppercase tracking-[0.18em] mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                Beamsteering Technology
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-6"
              >
                Precision Without Movement:{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-violet-300 via-purple-200 to-indigo-300 bg-clip-text text-transparent">
                  How Open-LIFU Steers Focused Ultrasound to a Point
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg md:text-xl font-light text-white/60 leading-relaxed max-w-2xl"
              >
                By precisely timing when each element fires, Open-LIFU&apos;s 2D matrix array
                concentrates acoustic energy anywhere in a three-dimensional volume — no
                mechanical repositioning required.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── Intro Paragraph ── */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl font-light text-white/65 leading-relaxed"
            >
              A single ultrasound transducer emits a cone of sound that spreads in every direction
              — useful for imaging, but too diffuse for neuromodulation. If you want to stimulate a
              precise structure deep in the brain, you need energy concentrated at an exact point in
              three-dimensional space. At the heart of the Open-LIFU platform sits a wearable
              headset housing one or two 64-element 2D matrix transmit modules. Each of those 64
              elements is independently addressable. Each fires at a calculated delay. Together,
              they do something no single transducer can:{" "}
              <span className="text-white font-normal">bend sound to a point.</span>
            </motion.p>
          </div>
        </section>

        {/* ── 2D Array Image ── */}
        <section className="py-8 md:py-12">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl overflow-hidden border border-violet-400/15 bg-white/[0.02]"
            >
              <Image
                src="/2d_array_beamsteering_8x8.png"
                alt="2D Array Beamsteering 8×8 — Open-LIFU"
                width={1200}
                height={620}
                className="w-full object-contain"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <span className="text-[10px] font-light text-white/40 uppercase tracking-[0.2em]">
                  2D Matrix Array Beamsteering — 8×8 Element Configuration
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Technical Sections ── */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <div className="space-y-0">
              {techSections.map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <div className="flex items-start gap-6 md:gap-8 py-14 md:py-16">
                      {/* Number + icon column */}
                      <div className="hidden md:flex flex-shrink-0 flex-col items-center gap-3 pt-1">
                        <div className="w-10 h-10 rounded-full border border-violet-400/30 bg-violet-500/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-violet-300/80" />
                        </div>
                        <span className="text-[10px] font-light text-white/25 uppercase tracking-[0.15em]">
                          {s.num}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-light text-white mb-6 leading-tight">
                          {s.title}
                        </h2>
                        <div className="space-y-4">
                          {s.paragraphs.map((p, j) => (
                            <p key={j} className="text-base font-light text-white/60 leading-relaxed">
                              {p}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    {i < techSections.length - 1 && (
                      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Inline Specs ── */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent pointer-events-none" />
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-200 text-[10px] font-light uppercase tracking-[0.18em] mb-4">
                Every parameter, fully programmable
              </span>
              <h3 className="text-2xl md:text-3xl font-light text-white leading-tight">
                Exact reproducibility across sessions and sites
              </h3>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {inlineSpecs.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-5"
                >
                  <div className="text-2xl md:text-3xl font-light text-white mb-1.5 leading-none">
                    {s.value}
                  </div>
                  <p className="text-xs font-light text-white/45 leading-relaxed">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Open Section ── */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-xl md:text-2xl font-light text-white mb-6 leading-tight">
                Open, documented, and ready to extend
              </h2>
              <div className="space-y-4 mb-8">
                <p className="text-base font-light text-white/60 leading-relaxed">
                  Every hardware schematic, firmware file, and software layer is published and
                  community-licensed — so the beamforming logic itself is transparent and auditable,
                  not a black box.
                </p>
                <p className="text-base font-light text-white/60 leading-relaxed">
                  Whether you&apos;re validating a protocol, building a novel neuromodulation study,
                  or extending the platform for a new application, the 2D array&apos;s delay
                  architecture is yours to understand and modify.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  "Hardware — CC BY-SA 4.0",
                  "Documentation — CC BY 4.0",
                  "DICOM-compatible",
                  "3D Slicer integration",
                  "Android localization",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/50 text-xs font-light"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Closing Quote ── */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-950/50 via-black/80 to-indigo-950/40 p-8 md:p-12 overflow-hidden"
            >
              <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-violet-500/20 blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-indigo-500/15 blur-[80px] pointer-events-none" />
              <p className="relative text-lg md:text-xl font-light text-white/75 leading-relaxed italic">
                &ldquo;The result is a tool that behaves less like a blunt instrument and more like a
                scalpel made of sound: precise, steerable, reproducible, and entirely
                non-invasive.&rdquo;
              </p>
            </motion.blockquote>
          </div>
        </section>

        {/* ── Bottom Nav ── */}
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10"
            >
              <div>
                <p className="text-lg font-light text-white mb-1">Explore the full LIFU platform</p>
                <p className="text-sm font-light text-white/45">
                  Hardware components, open-source community, and clinical applications
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/lifu"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to LIFU
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-white text-sm font-light hover:bg-white/10 transition-colors"
                >
                  Contact Us
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
