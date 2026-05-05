"use client"

import { motion } from "framer-motion"
import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react"
import { useState } from "react"
import { adminSignIn } from "@/lib/admin-store"

interface AdminLoginProps {
  onSuccess: () => void
}

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const result = await adminSignIn(email.trim(), password)
    setLoading(false)
    if (result.ok) {
      onSuccess()
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-32 w-[40rem] h-[40rem] rounded-full bg-violet-600/15 blur-[180px]" />
        <div className="absolute -bottom-40 -right-32 w-[40rem] h-[40rem] rounded-full bg-fuchsia-600/12 blur-[180px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="relative rounded-3xl border border-violet-400/25 bg-gradient-to-br from-violet-950/90 via-black/95 to-fuchsia-950/60 backdrop-blur-xl overflow-hidden p-8">
          <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-violet-500/30 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-fuchsia-500/25 blur-[100px] pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 border border-violet-400/30">
                <ShieldCheck className="w-5 h-5 text-violet-200" />
              </span>
              <div className="leading-tight">
                <p className="text-base font-light text-white">
                  Pulse<span className="instrument italic font-medium">Bridge</span>
                </p>
                <p className="text-[10px] font-mono tracking-widest text-violet-300/70">
                  ADMIN CONSOLE
                </p>
              </div>
            </div>

            <h1 className="text-2xl font-light tracking-tight text-white leading-tight mb-1.5">
              Sign in to{" "}
              <span className="instrument italic font-medium bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
                continue
              </span>
            </h1>
            <p className="text-sm font-light text-white/55 mb-7">
              Use your admin credentials to access the dashboard.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field icon={<Mail className="w-4 h-4 text-violet-200" />} label="Email">
                <input
                  required
                  type="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pulsebridgehealthcare.com"
                  className="w-full bg-transparent border-0 outline-none text-sm font-light text-white placeholder-white/30"
                />
              </Field>

              <Field icon={<Lock className="w-4 h-4 text-violet-200" />} label="Password">
                <input
                  required
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-0 outline-none text-sm font-light text-white placeholder-white/30"
                />
              </Field>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-light text-rose-300 text-center"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border-2 border-black/40 border-t-black animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <p className="text-[10px] font-light text-white/40 text-center pt-1">
                Authorized personnel only.
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
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
