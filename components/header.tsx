"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import RequestDemoModal from "@/components/request-demo-modal"

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: "LIFU", href: "/lifu" },
  { label: "Holter Monitoring", href: "/holter-monitoring" },
  { label: "Holter Reader", href: "/holter-reader" },
  { label: "Live Cardiac", href: "/live-cardiac" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
]

interface HeaderProps {
  showLogo?: boolean
}

export default function Header({ showLogo = false }: HeaderProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <header className="relative z-30 flex items-center justify-between p-4 md:p-6">
      {showLogo ? (
        <Link
          href="/"
          className="text-white text-lg md:text-xl font-light tracking-wide hover:opacity-80 transition-opacity"
        >
          Pulse<span className="instrument italic font-medium">Bridge</span>
        </Link>
      ) : (
        <div aria-hidden />
      )}

      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`px-4 py-2 rounded-full text-sm font-light transition-all duration-200 ${
                isActive
                  ? "text-white bg-white/10"
                  : "text-white/85 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Desktop CTA */}
      <div className="hidden lg:flex items-center">
        <button
          type="button"
          onClick={() => setDemoOpen(true)}
          className="px-6 py-2 rounded-full bg-white text-black font-normal text-sm transition-all duration-200 hover:bg-white/90 cursor-pointer h-9 flex items-center"
        >
          Request Demo
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/15 text-white/90 hover:bg-white/10 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile slide-out panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[88%] max-w-sm bg-black/90 border-l border-white/15 lg:hidden flex flex-col"
              style={{
                backdropFilter: "blur(24px) saturate(160%)",
                WebkitBackdropFilter: "blur(24px) saturate(160%)",
              }}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <span className="text-base font-light text-white">
                  Pulse<span className="instrument italic font-medium">Bridge</span>
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/85 hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-3.5 px-2 text-base font-light border-b border-white/[0.06] last:border-0 transition-colors ${
                        isActive ? "text-white" : "text-white/85 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>

              <div className="p-5 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false)
                    setDemoOpen(true)
                  }}
                  className="w-full py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
                >
                  Request Demo
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <RequestDemoModal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        source="Header CTA"
      />
    </header>
  )
}
