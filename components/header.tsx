"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface NavChild {
  label: string
  href: string
}

interface NavGroup {
  label: string
  children: NavChild[]
}

const navGroups: NavGroup[] = [
  {
    label: "Digital Healthcare",
    children: [
      { label: "Hospital-at-Home", href: "#" },
      { label: "Ambulatory Cardiac Monitoring", href: "#" },
    ],
  },
  {
    label: "Clinical Trials",
    children: [
      { label: "Cardiology", href: "#" },
      { label: "Oncology", href: "#" },
      { label: "Pulmonary Hypertension", href: "#" },
      { label: "Neurology", href: "#" },
      { label: "Respiratory", href: "#" },
    ],
  },
  {
    label: "RPM Platform",
    children: [
      { label: "Biometrics Data Platform", href: "#" },
      { label: "Arrhythmia Detection", href: "#" },
    ],
  },
  {
    label: "Medical Wearables",
    children: [
      { label: "Wearable ECG Monitor", href: "#" },
      { label: "Wearable Temperature Monitor", href: "#" },
      { label: "Wearable SpO₂ Monitor", href: "#" },
      { label: "Wearable BP Cuff", href: "#" },
      { label: "More Sensors", href: "#" },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
]

const CLOSE_DELAY_MS = 150

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => {
      setOpen(null)
      closeTimer.current = null
    }, CLOSE_DELAY_MS)
  }

  const openGroup = (label: string) => {
    cancelClose()
    setOpen(label)
  }

  return (
    <header className="relative z-30 flex items-center justify-between p-6">
      <div aria-hidden />

      <nav className="flex items-center gap-1" onMouseLeave={scheduleClose}>
        {navGroups.map((group) => {
          const isOpen = open === group.label
          const isActive = group.children.some((c) => c.href === pathname)
          return (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => openGroup(group.label)}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-light transition-all duration-200 ${
                  isActive || isOpen
                    ? "text-white bg-white/10"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                {group.label}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-2 min-w-[16rem] z-50"
                    onMouseEnter={cancelClose}
                  >
                    {/* hover bridge so cursor can travel button → panel without closing */}
                    <div aria-hidden className="absolute inset-x-0 -top-1 h-3" />
                    <div
                      className="relative rounded-xl border border-white/15 bg-black/75 overflow-hidden"
                      style={{
                        backdropFilter: "blur(20px) saturate(160%)",
                        WebkitBackdropFilter: "blur(20px) saturate(160%)",
                        boxShadow:
                          "0 14px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)",
                      }}
                    >
                      <div
                        aria-hidden
                        className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/45 to-transparent"
                      />
                      <ul className="py-2">
                        {group.children.map((child) => {
                          const isCurrent = pathname === child.href
                          return (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                className={`block px-4 py-2.5 text-sm font-light transition-colors ${
                                  isCurrent
                                    ? "text-white bg-violet-500/20"
                                    : "text-white/80 hover:text-white hover:bg-white/[0.07]"
                                }`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </nav>

      <div className="flex items-center">
        <button className="px-6 py-2 rounded-full bg-white text-black font-normal text-sm transition-all duration-200 hover:bg-white/90 cursor-pointer h-9 flex items-center">
          Request Demo
        </button>
      </div>
    </header>
  )
}
