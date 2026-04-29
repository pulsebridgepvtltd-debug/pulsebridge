import type { Variants } from "framer-motion"

export const spacing = {
  section: "py-20 md:py-28",
  container: "max-w-6xl mx-auto px-6 md:px-10",
}

export const typography = {
  h1: "text-5xl md:text-6xl font-light tracking-tight text-white instrument",
  h2: "text-4xl md:text-5xl font-light tracking-tight text-white instrument",
  h3: "text-2xl md:text-3xl font-light tracking-tight text-white instrument",
  body: "text-sm md:text-base font-light text-white/70 leading-relaxed",
  label: "text-xs font-light text-white/80 uppercase tracking-wider",
}

export const buttons = {
  primary: {
    base: "px-6 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer inline-flex items-center justify-center",
  },
  secondary: {
    base: "px-6 py-3 rounded-full bg-white/10 text-white font-normal text-xs transition-all duration-200 hover:bg-white/20 cursor-pointer inline-flex items-center justify-center border border-white/20",
  },
}

export const animationVariants: Record<"container" | "item", Variants> = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
}
