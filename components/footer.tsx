"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone } from "lucide-react"

const globalOffices = [
  {
    country: "Australia",
    address: ["134 Larter Street", "Golden Point, Victoria 3350", "Australia"],
  },
  {
    country: "Canada",
    address: ["92 Bartley Drive", "North York, Ontario", "Canada, M4A 0A9"],
  },
  {
    country: "UK",
    address: ["2 60 Grosvenor St", "Cheltenham GL52 2SG, UK"],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-24 pb-10 mt-16 border-t border-white/10">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/40 to-transparent"
      />
      <div className="absolute -top-24 left-1/4 w-[28rem] h-[28rem] rounded-full bg-violet-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-[28rem] h-[28rem] rounded-full bg-fuchsia-600/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-8 mb-14"
        >
          {/* Brand */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:max-w-[15rem]"
          >
            <Link href="/" className="inline-flex items-center group mb-5">
              <span className="text-white text-xl md:text-2xl font-light tracking-wide">
                Pulse<span className="instrument italic font-medium">Bridge</span>
                <span className="ml-2 text-white/55 font-light">Healthcare</span>
              </span>
            </Link>
            <p className="text-base font-light text-white/75 leading-relaxed max-w-md">
              PulseBridge is a provider of digital healthcare solutions for remote patient monitoring in
              healthcare and clinical trials.
            </p>
          </motion.div>

          {/* Main Office */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="text-xs font-light uppercase tracking-[0.22em] text-violet-200 mb-5 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              Main Office
            </h4>
            <p className="text-base font-light text-white mb-2">Hyderabad</p>
            <address className="not-italic text-sm font-light text-white/70 leading-relaxed space-y-1">
              <p>Unit No. 203, 2nd floor, Suite #648,</p>
              <p>SBR CV Towers, Sector-I, Sy No. 64,</p>
              <p>HUDA Techno Enclave, Madhapur,</p>
              <p>Hyderabad – 500081.</p>
            </address>
          </motion.div>

          {/* Global Offices */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="text-xs font-light uppercase tracking-[0.22em] text-violet-200 mb-5 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              Global Offices
            </h4>
            <div className="space-y-5">
              {globalOffices.map((o) => (
                <div key={o.country}>
                  <p className="text-base font-light text-white mb-1">{o.country}</p>
                  <address className="not-italic text-sm font-light text-white/70 leading-relaxed space-y-0.5">
                    {o.address.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </address>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="text-xs font-light uppercase tracking-[0.22em] text-violet-200 mb-5">
              Contact Us
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:info@pulsebridgehealthcare.com"
                className="group flex items-center gap-3 text-sm font-light text-white/70 hover:text-white transition-colors"
              >
                <span className="flex-shrink-0 w-9 h-9 rounded-md bg-violet-500/15 border border-violet-400/25 flex items-center justify-center group-hover:border-violet-300/50 transition-colors">
                  <Mail className="w-4 h-4 text-violet-200" />
                </span>
                <span className="whitespace-nowrap">info@pulsebridgehealthcare.com</span>
              </a>
              <a
                href="tel:+914023420049"
                className="group flex items-center gap-3 text-sm font-light text-white/70 hover:text-white transition-colors"
              >
                <span className="flex-shrink-0 w-9 h-9 rounded-md bg-violet-500/15 border border-violet-400/25 flex items-center justify-center group-hover:border-violet-300/50 transition-colors">
                  <Phone className="w-4 h-4 text-violet-200" />
                </span>
                <span className="whitespace-nowrap">+91-40 23420049</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm font-light text-white/50">
            © {new Date().getFullYear()} PulseBridge Healthcare. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm font-light text-white/50">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
