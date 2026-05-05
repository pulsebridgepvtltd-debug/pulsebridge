"use client"

import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  FileText,
  Mail,
  Upload,
  User,
  X,
} from "lucide-react"
import { useEffect, useState } from "react"
import { addApplication, uploadResume } from "@/lib/admin-store"
import PhoneInput from "@/components/phone-input"

interface JobApplyModalProps {
  open: boolean
  onClose: () => void
  jobId: string | null
  jobTitle?: string | null
}

const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10 MB

export default function JobApplyModal({
  open,
  onClose,
  jobId,
  jobTitle,
}: JobApplyModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [coverNote, setCoverNote] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Lock scroll
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
        setCoverNote("")
        setFile(null)
        setError(null)
        setSubmitting(false)
        setSubmitted(false)
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

  const handleFile = (f: File | null) => {
    if (!f) {
      setFile(null)
      return
    }
    if (f.size > MAX_FILE_BYTES) {
      setError("Resume must be under 10 MB.")
      return
    }
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!allowed.includes(f.type)) {
      setError("Only PDF, DOC, or DOCX files are accepted.")
      return
    }
    setError(null)
    setFile(f)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    if (!file) {
      setError("Please attach your resume.")
      return
    }
    setSubmitting(true)
    setError(null)

    const path = await uploadResume(file)
    if (!path) {
      setSubmitting(false)
      setError("Couldn't upload your resume. Please try again.")
      return
    }

    const ok = await addApplication({
      jobId,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      resumePath: path,
      coverNote: coverNote.trim() || undefined,
    })

    setSubmitting(false)
    if (ok) {
      setSubmitted(true)
    } else {
      setError("Couldn't submit your application. Please try again.")
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
          <div className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg pointer-events-auto my-8"
            >
              <div className="relative rounded-3xl border border-emerald-400/25 bg-gradient-to-br from-emerald-950/85 via-black/95 to-cyan-950/60 backdrop-blur-xl overflow-hidden p-7 md:p-8">
                <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-emerald-500/30 blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-cyan-500/25 blur-[100px] pointer-events-none" />

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute top-4 right-4 inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="relative space-y-4">
                    <div>
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 text-[10px] font-light uppercase tracking-[0.18em] mb-4">
                        <Briefcase className="w-3 h-3" />
                        {jobTitle ? "Apply for" : "General Application"}
                      </span>
                      <h3 className="text-2xl font-light tracking-tight text-white leading-tight">
                        {jobTitle ?? (
                          <>
                            Drop your resume —{" "}
                            <span className="instrument italic font-medium bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                              we'll keep in touch
                            </span>
                          </>
                        )}
                      </h3>
                      {jobTitle && (
                        <p className="text-sm font-light text-white/55 mt-1.5">
                          Tell us about yourself and attach your resume.
                        </p>
                      )}
                    </div>

                    <Field icon={<User className="w-4 h-4 text-emerald-200" />} label="Full name">
                      <input
                        required
                        type="text"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full bg-transparent border-0 outline-none text-sm font-light text-white placeholder-white/30"
                      />
                    </Field>

                    <Field icon={<Mail className="w-4 h-4 text-emerald-200" />} label="Email">
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@example.com"
                        className="w-full bg-transparent border-0 outline-none text-sm font-light text-white placeholder-white/30"
                      />
                    </Field>

                    <div>
                      <span className="text-[10px] font-light uppercase tracking-[0.18em] text-emerald-200/80 mb-1.5 block">
                        Phone (optional)
                      </span>
                      <PhoneInput
                        value={phone}
                        onChange={setPhone}
                        tone="emerald"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] font-light uppercase tracking-[0.18em] text-emerald-200/80 mb-1.5 block">
                        Resume{" "}
                        <span className="text-rose-300">*</span>
                      </span>
                      <label className="cursor-pointer flex items-center gap-3 rounded-xl border-2 border-dashed border-white/15 hover:border-emerald-300/40 bg-white/[0.02] hover:bg-emerald-500/[0.04] transition-colors px-4 py-3.5">
                        <span className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-400/30">
                          {file ? (
                            <FileText className="w-4 h-4 text-emerald-200" />
                          ) : (
                            <Upload className="w-4 h-4 text-emerald-200" />
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-light text-white truncate">
                            {file ? file.name : "Click to choose a file"}
                          </p>
                          <p className="text-[10px] text-white/40 mt-0.5">
                            PDF, DOC or DOCX · max 10 MB
                          </p>
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className="hidden"
                          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                        />
                      </label>
                    </div>

                    <div>
                      <span className="text-[10px] font-light uppercase tracking-[0.18em] text-emerald-200/80 mb-1.5 block">
                        Cover note (optional)
                      </span>
                      <textarea
                        rows={3}
                        value={coverNote}
                        onChange={(e) => setCoverNote(e.target.value)}
                        placeholder="A few sentences about why you're a fit…"
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm font-light text-white placeholder-white/30 focus:outline-none focus:border-emerald-300/40 focus:bg-white/[0.07] transition-colors resize-none"
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
                          Submitting…
                        </>
                      ) : (
                        <>
                          Submit Application
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <p className="text-[10px] font-light text-white/40 text-center">
                      Your details and resume are stored securely.
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
                    <h3 className="text-2xl font-light text-white mb-2">Application sent</h3>
                    <p className="text-sm font-light text-white/70 max-w-sm mx-auto mb-6">
                      Thanks for applying. The hiring team will review your resume and reach out
                      if there's a fit.
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

function Field({
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
      <span className="text-[10px] font-light uppercase tracking-[0.18em] text-emerald-200/80 mb-1.5 block">
        {label}
      </span>
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] focus-within:border-emerald-300/50 focus-within:bg-white/[0.07] transition-colors px-4 py-3">
        <span className="flex-shrink-0">{icon}</span>
        {children}
      </div>
    </label>
  )
}
