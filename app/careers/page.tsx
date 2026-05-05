"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import {
  ArrowRight,
  Briefcase,
  Globe2,
  HeartPulse,
  MapPin,
  Rocket,
} from "lucide-react"
import { ensureSampleJobs, useJobs } from "@/lib/admin-store"
import JobApplyModal from "@/components/job-apply-modal"

const wordVariants = {
  hidden: { y: 28, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const headingWords: { text: string; italic?: boolean }[] = [
  { text: "Build" },
  { text: "MedTech", italic: true },
  { text: "with" },
  { text: "purpose", italic: true },
]

const culturePoints = [
  {
    icon: Rocket,
    title: "Startup Velocity",
    body: "Tight feedback loops, low ceremony, high ownership. Ship something meaningful every week.",
  },
  {
    icon: HeartPulse,
    title: "Real Patient Impact",
    body: "Your work shows up in clinics, hospitals, and homes — not just dashboards.",
  },
  {
    icon: Globe2,
    title: "Global by Design",
    body: "Distributed teams across India, Canada, and partner sites. Async-first communication.",
  },
]

export default function CareersPage() {
  const [filter, setFilter] = useState<string>("All")
  const [applyState, setApplyState] = useState<{
    open: boolean
    jobId: string | null
    jobTitle: string | null
  }>({ open: false, jobId: null, jobTitle: null })

  useEffect(() => {
    ensureSampleJobs()
  }, [])

  const allJobs = useJobs()
  const activeJobs = useMemo(() => allJobs.filter((j) => j.active), [allJobs])

  const openApply = (jobId: string | null, jobTitle: string | null) =>
    setApplyState({ open: true, jobId, jobTitle })
  const closeApply = () =>
    setApplyState((s) => ({ ...s, open: false }))

  const departments = useMemo(
    () => ["All", ...Array.from(new Set(activeJobs.map((j) => j.department)))],
    [activeJobs],
  )
  const visibleJobs =
    filter === "All" ? activeJobs : activeJobs.filter((j) => j.department === filter)

  return (
    <>
      <main className="relative text-white">
        {/* Hero — full viewport with integrated header */}
        <section className="relative overflow-hidden min-h-screen flex flex-col">
          <div className="absolute -top-40 right-1/4 w-[42rem] h-[42rem] rounded-full bg-emerald-500/25 blur-[160px] pointer-events-none" />
          <div className="absolute top-1/3 -left-40 w-[36rem] h-[36rem] rounded-full bg-cyan-500/20 blur-[160px] pointer-events-none" />
          <div className="absolute -bottom-32 right-1/3 w-[32rem] h-[32rem] rounded-full bg-teal-500/15 blur-[160px] pointer-events-none" />

          <Header showLogo />

          <div className="relative flex-1 flex items-center py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 text-[10px] font-light uppercase tracking-[0.18em] mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Careers · We're hiring
            </motion.span>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] max-w-4xl mb-6"
            >
              {headingWords.map((w, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-3">
                  {w.italic ? (
                    <span className="instrument italic font-medium bg-gradient-to-r from-emerald-200 via-cyan-200 to-teal-200 bg-clip-text text-transparent">
                      {w.text}
                    </span>
                  ) : (
                    w.text
                  )}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl font-light text-white/75 leading-relaxed max-w-2xl"
            >
              We're an{" "}
              <span className="text-white">innovative MedTech startup</span> bridging clinical
              science and consumer technology. Roles across hardware, software, clinical, and
              commercial.
            </motion.p>
            </div>
          </div>
        </section>

        {/* Culture */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-14 max-w-2xl"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                Culture
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">
                What it's like{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                  working here
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {culturePoints.map((c, i) => {
                const Icon = c.icon
                return (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                    className="group relative rounded-2xl border border-emerald-400/15 bg-white/[0.04] backdrop-blur-md p-7 hover:border-emerald-300/40 hover:bg-emerald-500/[0.05] transition-colors overflow-hidden"
                  >
                    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-emerald-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/30 to-cyan-500/20 border border-emerald-400/30 mb-5">
                      <Icon className="w-5 h-5 text-emerald-100" />
                    </span>
                    <h3 className="relative text-xl font-light text-white mb-2.5">{c.title}</h3>
                    <p className="relative text-sm font-light text-white/70 leading-relaxed">
                      {c.body}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Job board */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 max-w-3xl"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                Open Roles
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">
                {activeJobs.length} open positions across{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                  every team
                </span>
              </h2>
            </motion.div>

            {/* Department filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {departments.map((d) => {
                const active = filter === d
                return (
                  <button
                    key={d}
                    onClick={() => setFilter(d)}
                    className={`px-4 py-1.5 rounded-full text-xs font-light transition-all duration-200 border ${
                      active
                        ? "bg-emerald-500/20 border-emerald-400/40 text-white"
                        : "bg-white/[0.03] border-white/10 text-white/65 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    {d}
                  </button>
                )
              })}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden divide-y divide-white/[0.06]"
            >
              {visibleJobs.length === 0 && (
                <div className="px-6 py-10 text-center">
                  <p className="text-sm font-light text-white/55">
                    No open positions in this department right now. Drop your resume below — we'll
                    keep you in mind.
                  </p>
                </div>
              )}
              {visibleJobs.map((job) => (
                <motion.div
                  key={job.id}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="group flex items-center justify-between gap-4 p-5 md:p-6 hover:bg-emerald-500/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="hidden sm:inline-flex flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/25 to-cyan-500/15 border border-emerald-400/30 items-center justify-center">
                      <Briefcase className="w-4 h-4 text-emerald-200" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-base font-light text-white truncate">{job.title}</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-white/55">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                        <span className="hidden sm:inline">·</span>
                        <span>{job.department}</span>
                        <span className="hidden sm:inline">·</span>
                        <span className="text-emerald-300/80">{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openApply(job.id, job.title)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-200 text-xs font-light hover:bg-emerald-500/25 hover:text-white transition-colors flex-shrink-0"
                  >
                    Apply
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Resume upload */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-950/40 via-black/80 to-cyan-950/40 p-10 md:p-12 relative overflow-hidden"
            >
              <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-emerald-500/30 blur-[120px] pointer-events-none" />

              <div className="relative grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                    Don't see your role?
                  </span>
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-3 leading-tight">
                    Drop your resume —{" "}
                    <span className="instrument italic font-medium bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">
                      we'll keep in touch
                    </span>
                  </h3>
                  <p className="text-sm font-light text-white/70 leading-relaxed">
                    We hire ahead of need. Talented engineers, clinicians, and operators always
                    welcome.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 flex flex-col gap-4">
                  <p className="text-sm font-light text-white/65 leading-relaxed">
                    Send us your resume and a short note. We'll get in touch when something
                    matches your background.
                  </p>
                  <button
                    type="button"
                    onClick={() => openApply(null, null)}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
                  >
                    Submit a General Application
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>

      <JobApplyModal
        open={applyState.open}
        onClose={closeApply}
        jobId={applyState.jobId}
        jobTitle={applyState.jobTitle}
      />
    </>
  )
}
