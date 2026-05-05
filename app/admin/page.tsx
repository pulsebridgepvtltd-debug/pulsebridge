"use client"

import Link from "next/link"
import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Briefcase,
  FileText,
  Inbox,
  Mail,
  Sparkles,
} from "lucide-react"
import {
  useApplications,
  useContactMessages,
  useDemoRequests,
  useJobs,
} from "@/lib/admin-store"

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return "just now"
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
}

export default function AdminOverviewPage() {
  const demos = useDemoRequests()
  const messages = useContactMessages()
  const applications = useApplications()
  const jobs = useJobs()

  const stats = useMemo(() => {
    const newDemos = demos.filter((d) => d.status === "new").length
    const newMessages = messages.filter((m) => m.status === "new").length
    const activeJobs = jobs.filter((j) => j.active).length
    const newApplications = applications.filter((a) => a.status === "new").length
    return { newDemos, newMessages, activeJobs, newApplications }
  }, [demos, messages, jobs, applications])

  const recent = useMemo(() => {
    type Item = {
      id: string
      type: "demo" | "message" | "application"
      title: string
      subtitle: string
      createdAt: string
    }
    const items: Item[] = [
      ...demos.map((d) => ({
        id: d.id,
        type: "demo" as const,
        title: d.name,
        subtitle: d.email,
        createdAt: d.createdAt,
      })),
      ...messages.map((m) => ({
        id: m.id,
        type: "message" as const,
        title: m.name,
        subtitle: `${m.inquiryType} · ${m.email}`,
        createdAt: m.createdAt,
      })),
      ...applications.map((a) => ({
        id: a.id,
        type: "application" as const,
        title: a.name,
        subtitle: `${a.jobTitle ?? "General application"} · ${a.email}`,
        createdAt: a.createdAt,
      })),
    ]
    return items
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 8)
  }, [demos, messages, applications])

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white">Overview</h1>
        <p className="text-sm font-light text-white/55 mt-1.5">
          What's happening across the site right now.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          label="New Demo Requests"
          value={stats.newDemos}
          total={demos.length}
          icon={<Inbox className="w-4 h-4 text-violet-200" />}
          accent="from-violet-500/30 to-fuchsia-500/15"
          border="border-violet-400/30"
          href="/admin/demo-requests"
        />
        <StatCard
          label="New Messages"
          value={stats.newMessages}
          total={messages.length}
          icon={<Mail className="w-4 h-4 text-cyan-200" />}
          accent="from-cyan-500/30 to-emerald-500/15"
          border="border-cyan-400/30"
          href="/admin/messages"
        />
        <StatCard
          label="Applications Received"
          value={stats.newApplications}
          total={applications.length}
          icon={<FileText className="w-4 h-4 text-emerald-200" />}
          accent="from-emerald-500/30 to-cyan-500/15"
          border="border-emerald-400/30"
          href="/admin/applications"
        />
        <StatCard
          label="Active Jobs"
          value={stats.activeJobs}
          total={jobs.length}
          icon={<Briefcase className="w-4 h-4 text-rose-200" />}
          accent="from-rose-500/30 to-amber-500/15"
          border="border-rose-400/30"
          href="/admin/jobs"
        />
      </motion.div>

      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-white/10">
          <div>
            <h2 className="text-base font-light text-white">Recent Activity</h2>
            <p className="text-[11px] font-light text-white/45 mt-0.5">
              Latest demo requests and contact form submissions
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-violet-300/80">
            <Sparkles className="w-3 h-3" />
            LIVE
          </span>
        </div>

        {recent.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <p className="text-sm font-light text-white/55">
              No activity yet. Submissions from the public site will appear here.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {recent.map((item) => {
              const meta =
                item.type === "demo"
                  ? {
                      tone: "bg-violet-500/15 border-violet-400/30",
                      iconClass: "text-violet-200",
                      Icon: Inbox,
                      href: "/admin/demo-requests",
                      label: "Demo",
                    }
                  : item.type === "message"
                    ? {
                        tone: "bg-cyan-500/15 border-cyan-400/30",
                        iconClass: "text-cyan-200",
                        Icon: Mail,
                        href: "/admin/messages",
                        label: "Message",
                      }
                    : {
                        tone: "bg-emerald-500/15 border-emerald-400/30",
                        iconClass: "text-emerald-200",
                        Icon: FileText,
                        href: "/admin/applications",
                        label: "Application",
                      }
              const Icon = meta.Icon
              return (
                <li key={item.id} className="px-5 md:px-6 py-4 flex items-center gap-4">
                  <span
                    className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center border ${meta.tone}`}
                  >
                    <Icon className={`w-4 h-4 ${meta.iconClass}`} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-light text-white truncate">{item.title}</p>
                      <span
                        className={`hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full border text-[9px] font-mono tracking-widest uppercase ${meta.tone} ${meta.iconClass}`}
                      >
                        {meta.label}
                      </span>
                    </div>
                    <p className="text-[11px] font-light text-white/50 truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-white/40 tracking-widest flex-shrink-0">
                    {timeAgo(item.createdAt)}
                  </span>
                  <Link
                    href={meta.href}
                    className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </motion.section>
    </div>
  )
}

function StatCard({
  label,
  value,
  total,
  icon,
  accent,
  border,
  href,
}: {
  label: string
  value: number
  total?: number
  icon: React.ReactNode
  accent: string
  border: string
  href?: string
}) {
  const inner = (
    <div
      className={`relative h-full rounded-2xl border ${border} bg-white/[0.03] backdrop-blur-md p-5 overflow-hidden group hover:bg-white/[0.05] transition-colors`}
    >
      <div
        className={`absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br ${accent} blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`}
      />
      <div className="relative flex items-center justify-between mb-3">
        <span
          className={`inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br ${accent} border ${border}`}
        >
          {icon}
        </span>
        {href && (
          <ArrowRight className="w-3.5 h-3.5 text-white/35 group-hover:text-white/85 group-hover:translate-x-0.5 transition-all" />
        )}
      </div>
      <p className="relative text-3xl font-light text-white">
        {value}
        {total !== undefined && (
          <span className="text-base text-white/35 ml-1.5">/ {total}</span>
        )}
      </p>
      <p className="relative text-[11px] font-light text-white/55 mt-1.5 uppercase tracking-[0.16em]">
        {label}
      </p>
    </div>
  )

  return (
    <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      {href ? <Link href={href}>{inner}</Link> : inner}
    </motion.div>
  )
}
