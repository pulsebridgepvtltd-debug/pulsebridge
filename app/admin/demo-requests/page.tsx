"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Inbox, Mail, Phone, Search, Trash2, User } from "lucide-react"
import {
  type DemoRequest,
  type DemoRequestStatus,
  deleteDemoRequest,
  updateDemoRequest,
  useDemoRequests,
} from "@/lib/admin-store"

const STATUS_OPTIONS: { value: DemoRequestStatus; label: string; tone: string }[] = [
  { value: "new", label: "New", tone: "bg-violet-500/15 border-violet-400/30 text-violet-200" },
  {
    value: "contacted",
    label: "Contacted",
    tone: "bg-cyan-500/15 border-cyan-400/30 text-cyan-200",
  },
  {
    value: "converted",
    label: "Converted",
    tone: "bg-emerald-500/15 border-emerald-400/30 text-emerald-200",
  },
  {
    value: "archived",
    label: "Archived",
    tone: "bg-white/5 border-white/15 text-white/55",
  },
]

const FILTERS: { key: "all" | DemoRequestStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "converted", label: "Converted" },
  { key: "archived", label: "Archived" },
]

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function DemoRequestsPage() {
  const all = useDemoRequests()
  const [filter, setFilter] = useState<"all" | DemoRequestStatus>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    let list = all
    if (filter !== "all") list = list.filter((r) => r.status === filter)
    if (query.trim()) {
      const q = query.toLowerCase().trim()
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.phone.toLowerCase().includes(q),
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
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500/30 to-fuchsia-500/15 border border-violet-400/30">
            <Inbox className="w-4 h-4 text-violet-200" />
          </span>
          <h1 className="text-2xl md:text-3xl font-light tracking-tight text-white">
            Demo Requests
          </h1>
        </div>
        <p className="text-sm font-light text-white/55">
          {all.length} total · {all.filter((r) => r.status === "new").length} unread
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, phone…"
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-sm font-light text-white placeholder-white/30 focus:outline-none focus:border-violet-300/40 focus:bg-white/[0.07] transition-colors"
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
                    ? "bg-violet-500/20 border-violet-400/40 text-white"
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
              ? "No demo requests yet. They'll appear here when someone clicks 'Request Demo'."
              : "No results match your filters."}
          </p>
        </div>
      ) : (
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
          className="space-y-3"
        >
          {filtered.map((req) => (
            <DemoRow key={req.id} req={req} />
          ))}
        </motion.ul>
      )}
    </div>
  )
}

function DemoRow({ req }: { req: DemoRequest }) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5 md:p-6"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/25 to-fuchsia-500/10 border border-violet-400/25 flex items-center justify-center">
            <User className="w-4 h-4 text-violet-200" />
          </span>
          <div className="min-w-0">
            <p className="text-base font-light text-white truncate">{req.name}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[12px] font-light text-white/55 mt-0.5">
              <a
                href={`mailto:${req.email}`}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-3 h-3" />
                {req.email}
              </a>
              <a
                href={`tel:${req.phone}`}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="w-3 h-3" />
                {req.phone}
              </a>
              {req.source && (
                <span className="text-white/35">· via {req.source}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mr-1">
            {fmtDate(req.createdAt)}
          </span>

          <select
            value={req.status}
            onChange={(e) =>
              updateDemoRequest(req.id, { status: e.target.value as DemoRequestStatus })
            }
            className="bg-white/[0.04] border border-white/10 rounded-full px-3 py-1.5 text-xs font-light text-white focus:outline-none focus:border-violet-300/40 cursor-pointer"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-black">
                {opt.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => {
              if (confirm(`Delete demo request from ${req.name}?`)) {
                deleteDemoRequest(req.id)
              }
            }}
            aria-label="Delete"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 text-white/55 hover:text-rose-200 hover:border-rose-400/40 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.li>
  )
}
