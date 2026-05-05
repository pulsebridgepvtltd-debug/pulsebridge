"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Briefcase,
  ChevronDown,
  Download,
  FileText,
  Mail,
  Phone,
  Search,
  Trash2,
  User,
} from "lucide-react"
import {
  type ApplicationStatus,
  type JobApplication,
  deleteApplication,
  getResumeSignedUrl,
  updateApplication,
  useApplications,
} from "@/lib/admin-store"

const STATUS_OPTIONS: { value: ApplicationStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "reviewed", label: "Reviewed" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "rejected", label: "Rejected" },
  { value: "archived", label: "Archived" },
]

const FILTERS: { key: "all" | ApplicationStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "reviewed", label: "Reviewed" },
  { key: "shortlisted", label: "Shortlisted" },
  { key: "rejected", label: "Rejected" },
  { key: "archived", label: "Archived" },
]

const STATUS_TONE: Record<ApplicationStatus, string> = {
  new: "bg-emerald-500/15 border-emerald-400/30 text-emerald-200",
  reviewed: "bg-cyan-500/15 border-cyan-400/30 text-cyan-200",
  shortlisted: "bg-violet-500/15 border-violet-400/30 text-violet-200",
  rejected: "bg-rose-500/15 border-rose-400/30 text-rose-200",
  archived: "bg-white/5 border-white/15 text-white/55",
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function ApplicationsPage() {
  const all = useApplications()
  const [filter, setFilter] = useState<"all" | ApplicationStatus>("all")
  const [query, setQuery] = useState("")
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let list = all
    if (filter !== "all") list = list.filter((a) => a.status === filter)
    if (query.trim()) {
      const q = query.toLowerCase().trim()
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          (a.jobTitle ?? "").toLowerCase().includes(q),
      )
    }
    return list
  }, [all, filter, query])

  return (
    <div className="space-y-7">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/30 to-cyan-500/15 border border-emerald-400/30">
            <FileText className="w-4 h-4 text-emerald-200" />
          </span>
          <h1 className="text-2xl md:text-3xl font-light tracking-tight text-white">
            Applications
          </h1>
        </div>
        <p className="text-sm font-light text-white/55">
          {all.length} total · {all.filter((a) => a.status === "new").length} new
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, job title…"
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-sm font-light text-white placeholder-white/30 focus:outline-none focus:border-emerald-300/40 focus:bg-white/[0.07] transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.key
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-light border transition-all duration-200 ${
                  active
                    ? "bg-emerald-500/20 border-emerald-400/40 text-white"
                    : "bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {f.label}
              </button>
            )
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md px-6 py-16 text-center">
          <p className="text-sm font-light text-white/55">
            {all.length === 0
              ? "No applications yet. They'll appear here when someone applies on /careers."
              : "No applications match your filters."}
          </p>
        </div>
      ) : (
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
          className="space-y-3"
        >
          {filtered.map((app) => (
            <ApplicationRow
              key={app.id}
              app={app}
              isExpanded={expanded === app.id}
              onToggle={() => setExpanded((p) => (p === app.id ? null : app.id))}
            />
          ))}
        </motion.ul>
      )}
    </div>
  )
}

function ApplicationRow({
  app,
  isExpanded,
  onToggle,
}: {
  app: JobApplication
  isExpanded: boolean
  onToggle: () => void
}) {
  const [resumeLoading, setResumeLoading] = useState(false)

  const openResume = async () => {
    if (resumeLoading) return
    setResumeLoading(true)
    const url = await getResumeSignedUrl(app.resumePath)
    setResumeLoading(false)
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
    } else {
      alert("Couldn't generate a download link.")
    }
  }

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden"
    >
      <div className="flex items-stretch">
        <button
          type="button"
          onClick={onToggle}
          className="flex-1 min-w-0 text-left p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/25 to-cyan-500/10 border border-emerald-400/25 flex items-center justify-center">
              <User className="w-4 h-4 text-emerald-200" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-base font-light text-white truncate">{app.name}</p>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[9px] font-mono tracking-widest uppercase ${STATUS_TONE[app.status]}`}
                >
                  {app.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] font-light text-white/55 mt-0.5">
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3" />
                  {app.jobTitle ?? "General application"}
                </span>
                <span className="text-white/30">·</span>
                <span className="truncate">{app.email}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
              {fmtDate(app.createdAt)}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-white/40 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        <div className="flex items-center pr-4 md:pr-5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              if (
                confirm(
                  `Delete application from ${app.name}? This also deletes the resume from storage.`,
                )
              ) {
                deleteApplication(app.id, app.resumePath)
              }
            }}
            aria-label="Delete application"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 text-white/55 hover:text-rose-200 hover:border-rose-400/40 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 pt-1 space-y-5">
              {/* Contact */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-light text-white/80 select-text">
                  <Mail className="w-4 h-4 text-emerald-200 flex-shrink-0" />
                  <span className="truncate">{app.email}</span>
                </div>
                {app.phone && (
                  <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-light text-white/80 select-text">
                    <Phone className="w-4 h-4 text-emerald-200 flex-shrink-0" />
                    <span className="truncate">{app.phone}</span>
                  </div>
                )}
              </div>

              {/* Cover note */}
              {app.coverNote && (
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-emerald-200/70 mb-2">
                    Cover note
                  </p>
                  <p className="text-sm font-light text-white/85 leading-relaxed whitespace-pre-wrap">
                    {app.coverNote}
                  </p>
                </div>
              )}

              {/* Resume */}
              <div className="rounded-xl border border-emerald-400/25 bg-emerald-500/[0.04] p-4 flex items-center gap-3">
                <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-400/30">
                  <FileText className="w-4 h-4 text-emerald-200" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-emerald-200/70">
                    Resume
                  </p>
                  <p className="text-sm font-light text-white truncate">
                    {app.resumePath.split("/").pop()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openResume}
                  disabled={resumeLoading}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {resumeLoading ? (
                    <span className="w-3 h-3 rounded-full border-2 border-black/40 border-t-black animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  View
                </button>
              </div>

              {/* Status switcher + delete */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40 mr-1">
                  Status:
                </span>
                {STATUS_OPTIONS.map((opt) => {
                  const active = app.status === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => updateApplication(app.id, { status: opt.value })}
                      className={`px-3 py-1 rounded-full text-[11px] font-light border transition-all ${
                        active
                          ? "bg-emerald-500/20 border-emerald-400/40 text-white"
                          : "bg-white/[0.02] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  )
                })}

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}
