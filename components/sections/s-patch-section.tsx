"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { Activity, BatteryCharging, Check, Droplets, Wifi } from "lucide-react"

const features = [
  { icon: Activity, title: "Clear P-wave", body: "Lead II position visualizing intact P-waves" },
  { icon: Droplets, title: "Showerproof", body: "Water-resistant patch (IP55 grade)" },
  { icon: Wifi, title: "Cable-Free & Offline", body: "Built-in memory · offline mode · wireless upload" },
  { icon: BatteryCharging, title: "Reuse by Quick Swap", body: "Coin battery & adhesive replacement in seconds" },
]

const variants = [
  { label: "S-Patch EX", duration: "1–3 days", weight: "8g", fda: "Aug 2023", accent: "cyan" },
  { label: "S-Patch EXL", duration: "14 days", weight: "11g", fda: "Feb 2024", accent: "emerald" },
]

function TealBackdrop() {
  return (
    <div className="absolute inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #051322 0%, #0c3a52 35%, #0f4860 55%, #0a2a3e 80%, #051624 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-1/2 -right-[18%] -translate-y-1/2 w-[110vh] h-[110vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(20,90,120,0.7) 0%, rgba(15,60,90,0.35) 50%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-[15%] right-1/4 w-[55vh] h-[55vh] rounded-full bg-cyan-400/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 w-[60vh] h-[60vh] rounded-full bg-emerald-500/10 blur-[160px]"
      />
    </div>
  )
}

function FeatureList() {
  return (
    <ul className="space-y-3.5">
      {features.map((f) => (
        <li key={f.title} className="flex items-start gap-3">
          <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-cyan-500/15 border border-cyan-400/45 flex items-center justify-center">
            <Check className="w-3 h-3 text-cyan-200" strokeWidth={3} />
          </span>
          <div>
            <p className="text-base font-medium text-white leading-tight">{f.title}</p>
            <p className="text-sm text-cyan-100/65 leading-snug mt-0.5">{f.body}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

function SpecList() {
  return (
    <div className="space-y-2.5">
      {variants.map((v) => (
        <div key={v.label} className="flex items-baseline gap-2 text-sm">
          <span
            className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${
              v.accent === "cyan" ? "bg-cyan-400" : "bg-emerald-400"
            }`}
          />
          <span
            className={`font-medium ${
              v.accent === "cyan" ? "text-cyan-200" : "text-emerald-200"
            }`}
          >
            {v.label}
          </span>
          <span className="text-cyan-100/35">·</span>
          <span className="text-white/85">{v.duration}</span>
          <span className="text-cyan-100/35">·</span>
          <span className="text-white/85">{v.weight}</span>
          <span className="text-cyan-100/35">·</span>
          <span className="text-white/55 text-xs">FDA {v.fda}</span>
        </div>
      ))}
    </div>
  )
}

function SpecTooltipCard({ variant }: { variant: (typeof variants)[number] }) {
  const isCyan = variant.accent === "cyan"
  return (
    <div
      className={`relative rounded-xl border backdrop-blur-xl overflow-hidden p-4 min-w-[14rem] ${
        isCyan
          ? "border-cyan-400/45 bg-[rgba(8,40,55,0.92)]"
          : "border-emerald-400/45 bg-[rgba(8,55,40,0.92)]"
      }`}
      style={{
        boxShadow:
          "0 18px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <div
        className={`absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent ${
          isCyan ? "text-cyan-300/60" : "text-emerald-300/60"
        }`}
      />
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`w-2 h-2 rounded-full animate-pulse ${
            isCyan ? "bg-cyan-300" : "bg-emerald-300"
          }`}
        />
        <p
          className={`text-[10px] uppercase tracking-[0.22em] font-light ${
            isCyan ? "text-cyan-300" : "text-emerald-300"
          }`}
        >
          {variant.label}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-lg font-light text-white leading-tight">{variant.duration}</p>
          <p className="text-[9px] text-white/45 uppercase tracking-wider mt-0.5">Duration</p>
        </div>
        <div>
          <p className="text-lg font-light text-white leading-tight">{variant.weight}</p>
          <p className="text-[9px] text-white/45 uppercase tracking-wider mt-0.5">Weight</p>
        </div>
      </div>
      <div
        className={`pt-2 border-t text-[11px] font-light ${
          isCyan ? "border-cyan-400/15 text-cyan-200/70" : "border-emerald-400/15 text-emerald-200/70"
        }`}
      >
        FDA cleared · {variant.fda}
      </div>
    </div>
  )
}

function MobileSPatch() {
  return (
    <div className="md:hidden relative overflow-hidden py-24 px-6">
      <TealBackdrop />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-10"
      >
        <p className="text-xs font-light uppercase tracking-[0.42em] text-cyan-300/85 mb-6">
          Smart ECG Patch
        </p>
        <h2 className="text-6xl font-black tracking-tighter leading-none select-none">
          <span className="text-white">S</span>
          <span className="text-emerald-400">-</span>
          <span className="text-white">PATCH</span>
          <sup className="text-lg font-light text-cyan-300/70 align-super ml-1">®</sup>
        </h2>
        <div className="mx-auto mt-5 mb-4 h-px w-24 bg-gradient-to-r from-cyan-400 via-emerald-400 to-transparent" />
        <p className="text-3xl instrument italic text-cyan-100/95 mb-3">
          &ldquo;Wear it. Be Healthy.&rdquo;
        </p>
        <p className="text-sm text-cyan-200/65 font-light tracking-wide">
          Powered by{" "}
          <span className="text-cyan-100/90 font-medium tracking-normal">
            Samsung Smart Health Processor
          </span>
        </p>
        <p className="text-base text-cyan-100/70 font-light leading-relaxed mt-5 max-w-md mx-auto">
          Medical-grade heart monitoring crafted into a wearable patch as light as two sheets
          of paper.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex justify-center mb-10"
      >
        <div className="relative flex flex-row items-center justify-center gap-2 w-full">
          <Image
            src="/product%201.png"
            alt="S-Patch device"
            width={500}
            height={500}
            priority
            className="w-1/2 h-auto object-contain -rotate-90 drop-shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
          />
          <Image
            src="/product%202.png"
            alt="S-Patch EXL device"
            width={500}
            height={500}
            priority
            className="w-1/2 h-auto object-contain -rotate-90 drop-shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-5 max-w-md mx-auto"
      >
        <FeatureList />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent" />
        <SpecList />
      </motion.div>
    </div>
  )
}

function DesktopSPatch() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const image1Y = useTransform(scrollYProgress, [0.15, 0.45, 0.85, 1.0], ["-100vh", "0vh", "0vh", "-30vh"])
  const image1Opacity = useTransform(scrollYProgress, [0.15, 0.30, 0.85, 0.97], [0, 1, 1, 0])

  const image2Y = useTransform(scrollYProgress, [0.15, 0.45, 0.85, 1.0], ["100vh", "0vh", "0vh", "30vh"])
  const image2Opacity = useTransform(scrollYProgress, [0.15, 0.30, 0.85, 0.97], [0, 1, 1, 0])

  const titleOpacity = useTransform(scrollYProgress, [0.30, 0.45, 0.85, 0.97], [0, 1, 1, 0])
  const titleY = useTransform(scrollYProgress, [0.30, 0.45], [30, 0])

  const detailsOpacity = useTransform(scrollYProgress, [0.50, 0.65, 0.85, 0.97], [0, 1, 1, 0])
  const detailsY = useTransform(scrollYProgress, [0.50, 0.65], [36, 0])

  // Cursor-following tooltip state
  const [hoveredVariant, setHoveredVariant] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cursorX = useMotionValue(-9999)
  const cursorY = useMotionValue(-9999)
  const tooltipX = useSpring(cursorX, { stiffness: 280, damping: 26, mass: 0.5 })
  const tooltipY = useSpring(cursorY, { stiffness: 280, damping: 26, mass: 0.5 })

  useEffect(() => {
    setMounted(true)
    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [cursorX, cursorY])

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const handleEnter = (variant: string) => {
    cancelClose()
    setHoveredVariant(variant)
  }

  const handleLeave = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => {
      setHoveredVariant(null)
      closeTimer.current = null
    }, 130)
  }

  const activeVariant = variants.find((v) => v.label === hoveredVariant)

  return (
    <div ref={ref} className="hidden md:block relative" style={{ minHeight: "220vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <TealBackdrop />

        <div className="absolute inset-y-0 left-0 w-1/2 z-20 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-20">
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="max-w-2xl"
          >
            <p className="text-sm font-light uppercase tracking-[0.42em] text-cyan-300/85 mb-6">
              Small · Simple · Smart ECG Patch
            </p>

            <h2 className="text-7xl lg:text-8xl font-black tracking-tighter leading-none select-none">
              <span className="text-white">S</span>
              <span className="text-emerald-400">-</span>
              <span className="text-white">PATCH</span>
              <sup className="text-xl font-light text-cyan-300/70 align-super ml-1">®</sup>
            </h2>

            <div className="mt-6 mb-5 h-px w-28 bg-gradient-to-r from-cyan-400 via-emerald-400 to-transparent" />

            <p className="text-4xl lg:text-5xl instrument italic text-cyan-100/95 mb-3">
              &ldquo;Wear it. Be Healthy.&rdquo;
            </p>

            <p className="text-sm text-cyan-200/65 font-light tracking-wide">
              Powered by{" "}
              <span className="text-cyan-100/90 font-medium tracking-normal">
                Samsung Smart Health Processor
              </span>
            </p>

            <p className="text-base text-cyan-100/70 font-light leading-relaxed mt-5 max-w-lg">
              Medical-grade heart monitoring crafted into a wearable patch as light as
              two sheets of paper.
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: detailsOpacity, y: detailsY }}
            className="mt-8 max-w-md"
          >
            <FeatureList />
            <p className="mt-6 text-[11px] font-light text-cyan-200/55 uppercase tracking-[0.22em]">
              Hover the device for specs →
            </p>
          </motion.div>
        </div>

        <div className="absolute inset-y-0 right-0 w-1/2 z-30 pointer-events-none">
          <motion.div
            style={{
              y: image1Y,
              opacity: image1Opacity,
              willChange: "transform, opacity",
            }}
            className="absolute top-0 left-0 right-0 flex justify-center"
          >
            <div
              onMouseEnter={() => handleEnter("S-Patch EXL")}
              onMouseLeave={handleLeave}
              className="relative pointer-events-auto translate-x-16 md:translate-x-20"
            >
              <Image
                src="/product%201.png"
                alt="S-Patch EXL device"
                width={800}
                height={800}
                priority
                className="h-[75vh] w-auto object-contain object-top drop-shadow-[0_25px_55px_rgba(0,0,0,0.55)] cursor-pointer block"
              />
            </div>
          </motion.div>

          <motion.div
            style={{
              y: image2Y,
              opacity: image2Opacity,
              willChange: "transform, opacity",
            }}
            className="absolute bottom-0 left-0 right-0 flex justify-center"
          >
            <div
              onMouseEnter={() => handleEnter("S-Patch EX")}
              onMouseLeave={handleLeave}
              className="relative pointer-events-auto -translate-x-16 md:-translate-x-20"
            >
              <Image
                src="/product%202.png"
                alt="S-Patch EX device"
                width={700}
                height={700}
                priority
                className="h-[65vh] w-auto object-contain object-bottom drop-shadow-[0_25px_55px_rgba(0,0,0,0.55)] cursor-pointer block"
              />
            </div>
          </motion.div>
        </div>

      </div>

      {/* Cursor-following spec tooltip — portaled to body so position:fixed works
          (template.tsx wraps everything in a motion.div with transform/filter,
           which would otherwise create a containing block for fixed positioning) */}
      {mounted &&
        createPortal(
          <motion.div
            style={{
              x: tooltipX,
              y: tooltipY,
              position: "fixed",
              top: 0,
              left: 0,
              pointerEvents: "none",
              zIndex: 60,
            }}
            className="hidden md:block"
          >
            <AnimatePresence>
              {activeVariant && (
                <motion.div
                  key={activeVariant.label}
                  initial={{ opacity: 0, scale: 0.92, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 8 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="ml-5 mt-5"
                >
                  <SpecTooltipCard variant={activeVariant} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>,
          document.body,
        )}
    </div>
  )
}

export default function SPatchSection() {
  return (
    <section className="relative">
      <MobileSPatch />
      <DesktopSPatch />
    </section>
  )
}
