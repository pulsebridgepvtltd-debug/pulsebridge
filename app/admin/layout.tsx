"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Briefcase,
  ChevronLeft,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react"
import { adminSignOut, getAdminSession } from "@/lib/admin-store"
import { supabase } from "@/lib/supabase"
import AdminLogin from "@/components/admin-login"

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Demo Requests", href: "/admin/demo-requests", icon: Inbox },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "Applications", href: "/admin/applications", icon: FileText },
  { label: "Jobs", href: "/admin/jobs", icon: Briefcase },
]

type AuthState =
  | { status: "loading" }
  | { status: "anon" }
  | { status: "authed"; email: string }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [auth, setAuth] = useState<AuthState>({ status: "loading" })

  const handleSignOut = async () => {
    await adminSignOut()
    router.push("/")
    router.refresh()
  }

  useEffect(() => {
    let cancelled = false

    const verify = async () => {
      const session = await getAdminSession()
      if (cancelled) return
      if (session?.isAdmin) {
        setAuth({ status: "authed", email: session.email })
      } else {
        setAuth({ status: "anon" })
      }
    }

    verify()

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      verify()
    })

    return () => {
      cancelled = true
      sub.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  if (auth.status === "loading") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-32 w-[40rem] h-[40rem] rounded-full bg-violet-600/15 blur-[180px]" />
        </div>
        <div className="relative flex flex-col items-center gap-3">
          <span className="w-8 h-8 rounded-full border-2 border-white/20 border-t-violet-300 animate-spin" />
          <p className="text-xs font-mono tracking-widest text-violet-300/70 uppercase">
            Verifying session
          </p>
        </div>
      </div>
    )
  }

  if (auth.status === "anon") {
    return <AdminLogin onSuccess={() => setAuth({ status: "loading" })} />
  }

  return (
    <div className="relative min-h-screen text-white">
      {/* Background — covers global animated bg */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-violet-950/40 via-black to-black pointer-events-none" />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-40 -left-32 w-[40rem] h-[40rem] rounded-full bg-violet-600/15 blur-[180px]" />
        <div className="absolute -bottom-40 -right-32 w-[40rem] h-[40rem] rounded-full bg-fuchsia-600/12 blur-[180px]" />
      </div>

      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex lg:flex-col w-64 flex-shrink-0 border-r border-white/10 bg-black/40 backdrop-blur-xl">
          <SidebarContent
            pathname={pathname}
            email={auth.email}
            onSignOut={handleSignOut}
          />
        </aside>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[85%] border-r border-white/10 bg-black/95 backdrop-blur-xl flex flex-col lg:hidden"
              >
                <SidebarContent
                  pathname={pathname}
                  email={auth.email}
                  onSignOut={handleSignOut}
                  onClose={() => setMobileOpen(false)}
                  withClose
                />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/10 bg-black/50 backdrop-blur-xl px-5 md:px-8 h-16">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/85 hover:bg-white/10 transition-colors"
              >
                <Menu className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-mono tracking-[0.22em] text-violet-300/80 uppercase">
                Admin Console
              </span>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-light text-white/65 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Back to site
            </Link>
          </header>

          <div className="px-5 md:px-8 py-8 md:py-10">{children}</div>
        </main>
      </div>
    </div>
  )
}

function SidebarContent({
  pathname,
  email,
  onSignOut,
  onClose,
  withClose,
}: {
  pathname: string
  email: string
  onSignOut: () => void | Promise<void>
  onClose?: () => void
  withClose?: boolean
}) {
  return (
    <>
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2.5 group">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 border border-violet-400/30">
            <ShieldCheck className="w-4 h-4 text-violet-200" />
          </span>
          <div className="leading-tight">
            <p className="text-base font-light text-white">
              Pulse<span className="instrument italic font-medium">Bridge</span>
            </p>
            <p className="text-[10px] font-mono tracking-widest text-violet-300/70">ADMIN</p>
          </div>
        </Link>
        {withClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon
          const active =
            item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-light transition-colors ${
                active
                  ? "bg-violet-500/15 border border-violet-400/30 text-white"
                  : "border border-transparent text-white/65 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2.5">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40 mb-0.5">
            Signed in as
          </p>
          <p className="text-xs font-light text-white/85 truncate">{email}</p>
        </div>
        <button
          type="button"
          onClick={() => onSignOut()}
          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-light text-white/75 hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign out
        </button>
      </div>
    </>
  )
}
