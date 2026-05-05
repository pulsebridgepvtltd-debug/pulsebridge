"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Mail, User, X } from "lucide-react"
import { useEffect, useState } from "react"
import { addDemoRequest } from "@/lib/admin-store"
import PhoneInput from "@/components/phone-input"

interface RequestDemoModalProps {
  open: boolean
  onClose: () => void
  source?: string
}

export default function RequestDemoModal({ open, onClose, source }: RequestDemoModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Lock scroll while modal is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Reset on close
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setName("")
        setEmail("")
        setPhone("")
        setSubmitted(false)
        setSubmitting(false)
        setError(null)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [open])

  // Esc to close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(null)
    const ok = await addDemoRequest({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      source,
    })
    setSubmitting(false)
    if (ok) {
      setSubmitted(true)
    } else {
      setError("Couldn't send right now. Please try again.")
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md"
          />
          <div className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md pointer-events-auto"
            >
              <div className="relative rounded-3xl border border-violet-400/25 bg-gradient-to-br from-violet-950/90 via-black/95 to-fuchsia-950/60 backdrop-blur-xl overflow-hidden p-7 md:p-8">
                <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-violet-500/30 blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-fuchsia-500/25 blur-[100px] pointer-events-none" />

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute top-4 right-4 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="relative space-y-5">
                    <div>
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-400/30 text-violet-200 text-[10px] font-light uppercase tracking-[0.18em] mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                        Request Demo
                      </span>
                      <h3 className="text-2xl font-light tracking-tight text-white leading-tight">
                        See PulseBridge in{" "}
                        <span className="instrument italic font-medium bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
                          action
                        </span>
                      </h3>
                      <p className="text-sm font-light text-white/65 mt-1.5">
                        Drop your details — we'll set up a 20-minute walkthrough.
                      </p>
                    </div>

                    <ModalField
                      icon={<User className="w-4 h-4 text-violet-200" />}
                      label="Full name"
                    >
                      <input
                        required
                        type="text"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full bg-transparent border-0 outline-none text-sm font-light text-white placeholder-white/30"
                      />
                    </ModalField>

                    <ModalField
                      icon={<Mail className="w-4 h-4 text-violet-200" />}
                      label="Work email"
                    >
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@hospital.org"
                        className="w-full bg-transparent border-0 outline-none text-sm font-light text-white placeholder-white/30"
                      />
                    </ModalField>

                    <div>
                      <span className="text-[10px] font-light uppercase tracking-[0.18em] text-violet-200/80 mb-1.5 block">
                        Phone number
                      </span>
                      <PhoneInput
                        required
                        value={phone}
                        onChange={setPhone}
                        tone="violet"
                      />
                    </div>

                    {error && (
                      <p className="text-sm font-light text-rose-300 text-center">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <span className="w-3 h-3 rounded-full border-2 border-black/40 border-t-black animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Request
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <p className="text-[10px] font-light text-white/40 text-center">
                      We'll only use these to schedule your demo.
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative text-center py-6"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.05 }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 mb-5"
                    >
                      <CheckCircle2 className="w-8 h-8 text-emerald-300" />
                    </motion.span>
                    <h3 className="text-2xl font-light text-white mb-2">Request received</h3>
                    <p className="text-sm font-light text-white/70 max-w-sm mx-auto mb-6">
                      Our team will reach out within 24 hours to schedule your walkthrough.
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-full bg-white/8 border border-white/15 text-white text-sm font-light hover:bg-white/12 transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

function ModalField({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-light uppercase tracking-[0.18em] text-violet-200/80 mb-1.5 block">
        {label}
      </span>
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] focus-within:border-violet-300/50 focus-within:bg-white/[0.07] transition-colors px-4 py-3">
        <span className="flex-shrink-0">{icon}</span>
        {children}
      </div>
    </label>
  )
}
