"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  Clock,
  DollarSign,
  Edit3,
  MapPin,
  Pause,
  Play,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react"
import {
  type JobPosition,
  type JobType,
  type SalaryCurrency,
  addJob,
  deleteJob,
  ensureSampleJobs,
  updateJob,
  useJobs,
} from "@/lib/admin-store"

const JOB_TYPES: JobType[] = ["Full-time", "Part-time", "Contract", "Internship"]

const TYPE_TONE: Record<JobType, string> = {
  "Full-time": "bg-emerald-500/15 border-emerald-400/30 text-emerald-200",
  "Part-time": "bg-cyan-500/15 border-cyan-400/30 text-cyan-200",
  Contract: "bg-amber-500/15 border-amber-400/30 text-amber-200",
  Internship: "bg-violet-500/15 border-violet-400/30 text-violet-200",
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const blankForm: Omit<JobPosition, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  department: "",
  location: "",
  type: "Full-time",
  description: "",
  requirements: [],
  responsibilities: [],
  salaryRange: "",
  salaryCurrency: "USD",
  applyEmail: "",
  active: true,
}

const CURRENCY_LABEL: Record<SalaryCurrency, string> = {
  USD: "$ USD",
  INR: "₹ INR",
}

const CURRENCY_SYMBOL: Record<SalaryCurrency, string> = {
  USD: "$",
  INR: "₹",
}

function formatSalary(job: JobPosition): string | null {
  if (!job.salaryRange) return null
  const symbol = CURRENCY_SYMBOL[job.salaryCurrency] ?? "$"
  const cleaned = job.salaryRange.replace(/^[$₹]\s*/, "").trim()
  return `${symbol}${cleaned}`
}

export default function JobsAdminPage() {
  const all = useJobs()
  const [query, setQuery] = useState("")
  const [filterDept, setFilterDept] = useState<string>("All")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    ensureSampleJobs()
  }, [])

  const departments = useMemo(
    () => ["All", ...Array.from(new Set(all.map((j) => j.department).filter(Boolean)))],
    [all],
  )

  const filtered = useMemo(() => {
    let list = [...all].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    if (filterDept !== "All") list = list.filter((j) => j.department === filterDept)
    if (query.trim()) {
      const q = query.toLowerCase().trim()
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.department.toLowerCase().includes(q),
      )
    }
    return list
  }, [all, query, filterDept])

  const editingJob = editingId ? all.find((j) => j.id === editingId) ?? null : null

  return (
    <div className="space-y-7">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/30 to-teal-500/15 border border-emerald-400/30">
              <Briefcase className="w-4 h-4 text-emerald-200" />
            </span>
            <h1 className="text-2xl md:text-3xl font-light tracking-tight text-white">Jobs</h1>
          </div>
          <p className="text-sm font-light text-white/55">
            {all.length} total · {all.filter((j) => j.active).length} active
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingId(null)
            setDrawerOpen(true)
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          New Position
        </button>
      </motion.div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, location, department…"
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-sm font-light text-white placeholder-white/30 focus:outline-none focus:border-emerald-300/40 focus:bg-white/[0.07] transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {departments.map((d) => {
            const active = filterDept === d
            return (
              <button
                key={d}
                type="button"
                onClick={() => setFilterDept(d)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-light border transition-all duration-200 ${
                  active
                    ? "bg-emerald-500/20 border-emerald-400/40 text-white"
                    : "bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {d}
              </button>
            )
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md px-6 py-16 text-center">
          <p className="text-sm font-light text-white/55 mb-4">
            {all.length === 0
              ? "No jobs posted yet."
              : "No jobs match your filters."}
          </p>
          {all.length === 0 && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null)
                setDrawerOpen(true)
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create your first position
            </button>
          )}
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
          className="grid gap-3"
        >
          {filtered.map((job) => (
            <JobRow
              key={job.id}
              job={job}
              onEdit={() => {
                setEditingId(job.id)
                setDrawerOpen(true)
              }}
            />
          ))}
        </motion.div>
      )}

      <JobDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false)
          setEditingId(null)
        }}
        job={editingJob}
      />
    </div>
  )
}

function JobRow({ job, onEdit }: { job: JobPosition; onEdit: () => void }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5 md:p-6 group"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/25 to-teal-500/10 border border-emerald-400/25 flex items-center justify-center">
          <Briefcase className="w-4 h-4 text-emerald-200" />
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <p className="text-base font-light text-white">{job.title}</p>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[9px] font-mono tracking-widest uppercase ${TYPE_TONE[job.type]}`}
            >
              {job.type}
            </span>
            {!job.active && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/15 text-white/55 text-[9px] font-mono tracking-widest uppercase">
                Paused
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-light text-white/55 mb-2">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              {job.location}
            </span>
            <span className="text-white/30">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="w-3 h-3" />
              {job.department}
            </span>
            {job.salaryRange && (
              <>
                <span className="text-white/30">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <DollarSign className="w-3 h-3" />
                  {formatSalary(job)}
                </span>
              </>
            )}
            <span className="text-white/30">·</span>
            <span className="inline-flex items-center gap-1.5 text-white/40">
              <Clock className="w-3 h-3" />
              Updated {fmtDate(job.updatedAt)}
            </span>
          </div>
          <p className="text-sm font-light text-white/65 leading-relaxed line-clamp-2">
            {job.description}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap md:flex-col md:items-end">
          <button
            type="button"
            onClick={() => updateJob(job.id, { active: !job.active })}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-light border transition-colors ${
              job.active
                ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-200 hover:bg-emerald-500/15"
                : "bg-white/[0.04] border-white/15 text-white/55 hover:text-white hover:bg-white/[0.08]"
            }`}
          >
            {job.active ? (
              <>
                <Play className="w-3 h-3" />
                Active
              </>
            ) : (
              <>
                <Pause className="w-3 h-3" />
                Paused
              </>
            )}
          </button>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onEdit}
              aria-label="Edit"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm(`Delete "${job.title}"? This cannot be undone.`)) {
                  deleteJob(job.id)
                }
              }}
              aria-label="Delete"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 text-white/55 hover:text-rose-200 hover:border-rose-400/40 hover:bg-rose-500/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function JobDrawer({
  open,
  onClose,
  job,
}: {
  open: boolean
  onClose: () => void
  job: JobPosition | null
}) {
  const [form, setForm] = useState(blankForm)
  const [reqInput, setReqInput] = useState("")
  const [respInput, setRespInput] = useState("")

  useEffect(() => {
    if (open && job) {
      const { id, createdAt, updatedAt, ...rest } = job
      setForm(rest)
    } else if (open && !job) {
      setForm(blankForm)
    }
    setReqInput("")
    setRespInput("")
  }, [open, job])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (saving) return
    const cleaned = {
      ...form,
      title: form.title.trim(),
      department: form.department.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
      salaryRange: form.salaryRange?.trim() || undefined,
      applyEmail: form.applyEmail?.trim() || undefined,
      requirements: form.requirements.filter((r) => r.trim()),
      responsibilities: form.responsibilities.filter((r) => r.trim()),
    }

    setSaving(true)
    if (job) {
      await updateJob(job.id, cleaned)
    } else {
      await addJob(cleaned)
    }
    setSaving(false)
    onClose()
  }

  const addRequirement = () => {
    const v = reqInput.trim()
    if (!v) return
    setForm((f) => ({ ...f, requirements: [...f.requirements, v] }))
    setReqInput("")
  }

  const addResponsibility = () => {
    const v = respInput.trim()
    if (!v) return
    setForm((f) => ({ ...f, responsibilities: [...f.responsibilities, v] }))
    setRespInput("")
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
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[61] w-full max-w-2xl bg-black/95 border-l border-white/10 backdrop-blur-xl flex flex-col"
          >
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-white/10">
              <div>
                <p className="text-[10px] font-mono tracking-[0.22em] text-emerald-300/80 uppercase mb-0.5">
                  {job ? "Edit Position" : "New Position"}
                </p>
                <h2 className="text-xl font-light text-white">
                  {job ? job.title : "Create a job posting"}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5"
            >
              <FormField label="Title" required>
                <input
                  required
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Senior Embedded Firmware Engineer"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm font-light text-white placeholder-white/30 focus:outline-none focus:border-emerald-300/40 focus:bg-white/[0.07] transition-colors"
                />
              </FormField>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Department" required>
                  <input
                    required
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    placeholder="Engineering"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm font-light text-white placeholder-white/30 focus:outline-none focus:border-emerald-300/40 focus:bg-white/[0.07] transition-colors"
                  />
                </FormField>
                <FormField label="Location" required>
                  <input
                    required
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Hyderabad, IN"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm font-light text-white placeholder-white/30 focus:outline-none focus:border-emerald-300/40 focus:bg-white/[0.07] transition-colors"
                  />
                </FormField>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Employment type" required>
                  <div className="relative">
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value as JobType })}
                      className="w-full appearance-none bg-white/[0.04] border border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm font-light text-white focus:outline-none focus:border-emerald-300/40 cursor-pointer"
                    >
                      {JOB_TYPES.map((t) => (
                        <option key={t} value={t} className="bg-black">
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  </div>
                </FormField>
                <FormField label="Salary range (optional)">
                  <div className="flex items-stretch gap-2">
                    <div className="flex rounded-xl bg-white/[0.04] border border-white/10 p-1">
                      {(["USD", "INR"] as SalaryCurrency[]).map((c) => {
                        const active = form.salaryCurrency === c
                        return (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setForm({ ...form, salaryCurrency: c })}
                            className={`px-3 rounded-lg text-xs font-light transition-colors ${
                              active
                                ? "bg-emerald-500/20 border border-emerald-400/40 text-white"
                                : "text-white/55 hover:text-white border border-transparent"
                            }`}
                          >
                            {CURRENCY_LABEL[c]}
                          </button>
                        )
                      })}
                    </div>
                    <input
                      type="text"
                      value={form.salaryRange ?? ""}
                      onChange={(e) => setForm({ ...form, salaryRange: e.target.value })}
                      placeholder={form.salaryCurrency === "INR" ? "28L–42L" : "140k–185k"}
                      className="flex-1 min-w-0 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm font-light text-white placeholder-white/30 focus:outline-none focus:border-emerald-300/40 focus:bg-white/[0.07] transition-colors"
                    />
                  </div>
                </FormField>
              </div>

              <FormField label="Apply email (optional)">
                <input
                  type="email"
                  value={form.applyEmail ?? ""}
                  onChange={(e) => setForm({ ...form, applyEmail: e.target.value })}
                  placeholder="careers@pulsebridgehealthcare.com"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm font-light text-white placeholder-white/30 focus:outline-none focus:border-emerald-300/40 focus:bg-white/[0.07] transition-colors"
                />
              </FormField>

              <FormField label="Description" required>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Two or three sentences about the role…"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm font-light text-white placeholder-white/30 focus:outline-none focus:border-emerald-300/40 focus:bg-white/[0.07] transition-colors resize-none"
                />
              </FormField>

              <ListInputField
                label="Requirements"
                placeholder="e.g. 5+ years embedded C/C++"
                items={form.requirements}
                inputValue={reqInput}
                onInputChange={setReqInput}
                onAdd={addRequirement}
                onRemove={(i) =>
                  setForm({
                    ...form,
                    requirements: form.requirements.filter((_, idx) => idx !== i),
                  })
                }
              />

              <ListInputField
                label="Responsibilities"
                placeholder="e.g. Lead frontend architecture for the dashboard"
                items={form.responsibilities}
                inputValue={respInput}
                onInputChange={setRespInput}
                onAdd={addResponsibility}
                onRemove={(i) =>
                  setForm({
                    ...form,
                    responsibilities: form.responsibilities.filter((_, idx) => idx !== i),
                  })
                }
              />

              <FormField label="Status">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, active: !form.active })}
                  className={`w-full inline-flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-light transition-colors ${
                    form.active
                      ? "bg-emerald-500/10 border-emerald-400/30 text-white"
                      : "bg-white/[0.04] border-white/10 text-white/65 hover:bg-white/[0.07]"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {form.active ? (
                      <Play className="w-3.5 h-3.5 text-emerald-300" />
                    ) : (
                      <Pause className="w-3.5 h-3.5 text-white/55" />
                    )}
                    {form.active ? "Active — visible on Careers page" : "Paused — hidden from public"}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-white/40">
                    {form.active ? "TAP TO PAUSE" : "TAP TO ACTIVATE"}
                  </span>
                </button>
              </FormField>
            </form>

            <div className="flex items-center justify-end gap-3 p-5 md:p-6 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-white/75 text-sm font-light hover:bg-white/[0.08] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-black/40 border-t-black animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                {job ? "Save changes" : "Create position"}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function FormField({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-light uppercase tracking-[0.18em] text-emerald-200/80 mb-2 block">
        {label}
        {required && <span className="text-rose-300 ml-1">*</span>}
      </span>
      {children}
    </label>
  )
}

function ListInputField({
  label,
  placeholder,
  items,
  inputValue,
  onInputChange,
  onAdd,
  onRemove,
}: {
  label: string
  placeholder: string
  items: string[]
  inputValue: string
  onInputChange: (v: string) => void
  onAdd: () => void
  onRemove: (i: number) => void
}) {
  return (
    <div>
      <span className="text-[10px] font-light uppercase tracking-[0.18em] text-emerald-200/80 mb-2 block">
        {label}
      </span>
      <div className="flex items-center gap-2 mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              onAdd()
            }
          }}
          placeholder={placeholder}
          className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm font-light text-white placeholder-white/30 focus:outline-none focus:border-emerald-300/40 focus:bg-white/[0.07] transition-colors"
        />
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-white/85 hover:text-white hover:bg-white/10 transition-colors"
          aria-label={`Add ${label.toLowerCase()}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {items.length > 0 && (
        <ul className="space-y-1.5">
          {items.map((it, i) => (
            <li
              key={i}
              className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.02] border border-white/[0.07] px-3.5 py-2"
            >
              <span className="text-sm font-light text-white/85 flex-1 min-w-0">
                <span className="inline-block w-1 h-1 rounded-full bg-emerald-400 mr-2 align-middle" />
                {it}
              </span>
              <button
                type="button"
                onClick={() => onRemove(i)}
                aria-label="Remove"
                className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full text-white/45 hover:text-rose-200 hover:bg-rose-500/10 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
