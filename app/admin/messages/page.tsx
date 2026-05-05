"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Mail, MessageSquare, Phone, Search, Trash2, User } from "lucide-react"
import {
  type ContactMessage,
  type MessageStatus,
  deleteContactMessage,
  updateContactMessage,
  useContactMessages,
} from "@/lib/admin-store"

const STATUS_OPTIONS: { value: MessageStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "archived", label: "Archived" },
]

const FILTERS: { key: "all" | MessageStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "archived", label: "Archived" },
]

const INQUIRY_FILTERS = ["All", "Service", "Clinical", "Partnership"] as const
type InquiryFilter = (typeof INQUIRY_FILTERS)[number]

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function MessagesPage() {
  const all = useContactMessages()
  const [filter, setFilter] = useState<"all" | MessageStatus>("all")
  const [inquiry, setInquiry] = useState<InquiryFilter>("All")
  const [query, setQuery] = useState("")
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let list = all
    if (filter !== "all") list = list.filter((m) => m.status === filter)
    if (inquiry !== "All") list = list.filter((m) => m.inquiryType === inquiry)
    if (query.trim()) {
      const q = query.toLowerCase().trim()
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.message.toLowerCase().includes(q),
      )
    }
    return list
  }, [all, filter, inquiry, query])

  return (
    <div className="space-y-7">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/30 to-emerald-500/15 border border-cyan-400/30">
            <Mail className="w-4 h-4 text-cyan-200" />
          </span>
          <h1 className="text-2xl md:text-3xl font-light tracking-tight text-white">Messages</h1>
        </div>
        <p className="text-sm font-light text-white/55">
          {all.length} total · {all.filter((m) => m.status === "new").length} unread
        </p>
      </motion.div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 max-w-sm relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, message…"
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-sm font-light text-white placeholder-white/30 focus:outline-none focus:border-cyan-300/40 focus:bg-white/[0.07] transition-colors"
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
                      ? "bg-cyan-500/20 border-cyan-400/40 text-white"
                      : "bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {f.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40 mr-1">
            Inquiry type:
          </span>
          {INQUIRY_FILTERS.map((t) => {
            const active = inquiry === t
            return (
              <button
                key={t}
                type="button"
                onClick={() => setInquiry(t)}
                className={`px-3 py-1 rounded-full text-[11px] font-light border transition-all duration-200 ${
                  active
                    ? "bg-emerald-500/15 border-emerald-400/35 text-white"
                    : "bg-white/[0.02] border-white/10 text-white/55 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {t}
              </button>
            )
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md px-6 py-16 text-center">
          <p className="text-sm font-light text-white/55">
            {all.length === 0
              ? "No messages yet. Submissions from /contact will appear here."
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
          {filtered.map((m) => (
            <MessageRow
              key={m.id}
              msg={m}
              isExpanded={expanded === m.id}
              onToggle={() => setExpanded((prev) => (prev === m.id ? null : m.id))}
            />
          ))}
        </motion.ul>
      )}
    </div>
  )
}

function MessageRow({
  msg,
  isExpanded,
  onToggle,
}: {
  msg: ContactMessage
  isExpanded: boolean
  onToggle: () => void
}) {
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
            <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/25 to-emerald-500/10 border border-cyan-400/25 flex items-center justify-center">
              <User className="w-4 h-4 text-cyan-200" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-base font-light text-white truncate">{msg.name}</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 text-[9px] font-mono tracking-widest uppercase">
                  {msg.inquiryType}
                </span>
                {msg.status === "new" && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-200 text-[9px] font-mono tracking-widest uppercase">
                    New
                  </span>
                )}
              </div>
              <p className="text-[12px] font-light text-white/55 truncate mt-0.5">{msg.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
              {fmtDate(msg.createdAt)}
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
              if (confirm(`Delete message from ${msg.name}?`)) {
                deleteContactMessage(msg.id)
              }
            }}
            aria-label="Delete message"
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
              <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-200/70 mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-3 h-3" />
                  Message
                </p>
                <p className="text-sm font-light text-white/85 leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-light text-white/80 select-text">
                  <Mail className="w-4 h-4 text-cyan-200 flex-shrink-0" />
                  <span className="truncate">{msg.email}</span>
                </div>
                {msg.phone && (
                  <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-light text-white/80 select-text">
                    <Phone className="w-4 h-4 text-cyan-200 flex-shrink-0" />
                    <span className="truncate">{msg.phone}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/40 mr-1">
                  Status:
                </span>
                {STATUS_OPTIONS.map((opt) => {
                  const active = msg.status === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => updateContactMessage(msg.id, { status: opt.value })}
                      className={`px-3 py-1 rounded-full text-[11px] font-light border transition-all ${
                        active
                          ? "bg-cyan-500/20 border-cyan-400/40 text-white"
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
