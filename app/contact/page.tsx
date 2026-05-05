"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { useState } from "react"
import { addContactMessage } from "@/lib/admin-store"
import PhoneInput from "@/components/phone-input"
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react"

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
  { text: "Let's" },
  { text: "talk", italic: true },
]

const offices = [
  {
    region: "India",
    city: "Hyderabad",
    address: "Unit No. 203, 2nd floor, SBR CV Towers, Sector-I, HUDA Techno Enclave, Madhapur, Hyderabad – 500081.",
    flag: "IN",
    accent: "from-amber-500/30 to-rose-500/20",
    border: "border-amber-400/30",
    iconColor: "text-amber-200",
    coords: { x: "70%", y: "52%" },
  },
  {
    region: "Canada",
    city: "Toronto",
    address: "92 Bartley Drive, North York, Ontario, Canada, M4A 0A9.",
    flag: "CA",
    accent: "from-rose-500/30 to-violet-500/20",
    border: "border-rose-400/30",
    iconColor: "text-rose-200",
    coords: { x: "26%", y: "32%" },
  },
]

const inquiryTypes = ["Service", "Clinical", "Partnership"] as const
type InquiryType = (typeof inquiryTypes)[number]

const WHATSAPP_NUMBER = "+919999999999"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [inquiry, setInquiry] = useState<InquiryType>("Service")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addContactMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      inquiryType: inquiry,
      message: message.trim(),
    })
    setSubmitted(true)
  }

  return (
    <>
      <main className="relative text-white">
        {/* Hero — full viewport with integrated header */}
        <section className="relative overflow-hidden min-h-screen flex flex-col">
          <div className="absolute -top-40 right-1/4 w-[42rem] h-[42rem] rounded-full bg-violet-500/25 blur-[160px] pointer-events-none" />
          <div className="absolute top-1/3 -left-40 w-[36rem] h-[36rem] rounded-full bg-fuchsia-500/20 blur-[160px] pointer-events-none" />
          <div className="absolute -bottom-32 right-1/3 w-[32rem] h-[32rem] rounded-full bg-cyan-500/15 blur-[160px] pointer-events-none" />

          <Header showLogo />

          <div className="relative flex-1 flex items-center py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-200 text-[10px] font-light uppercase tracking-[0.18em] mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Contact PulseBridge
            </motion.span>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] max-w-3xl mb-6"
            >
              {headingWords.map((w, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block mr-3">
                  {w.italic ? (
                    <span className="instrument italic font-medium bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200 bg-clip-text text-transparent">
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
              Whether you're a clinician, a partner, or a patient — we'll route your message to the
              right team. Most replies within{" "}
              <span className="text-white">24 hours</span>.
            </motion.p>
            </div>
          </div>
        </section>

        {/* Form + WhatsApp */}
        <section className="relative overflow-hidden py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="md:col-span-2 relative rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950/30 via-black/80 to-fuchsia-950/20 p-7 md:p-9 overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-violet-500/25 blur-[100px] pointer-events-none" />

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="relative space-y-5">
                    <div>
                      <h2 className="text-2xl font-light text-white mb-1">Send a message</h2>
                      <p className="text-sm font-light text-white/55">
                        We'll respond from the right specialist.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Name">
                        <input
                          required
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jane Doe"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm font-light text-white placeholder-white/30 focus:outline-none focus:border-violet-400/50 focus:bg-white/[0.05] transition-colors"
                        />
                      </Field>
                      <Field label="Email">
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jane@hospital.org"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm font-light text-white placeholder-white/30 focus:outline-none focus:border-violet-400/50 focus:bg-white/[0.05] transition-colors"
                        />
                      </Field>
                    </div>

                    <Field label="Phone">
                      <PhoneInput value={phone} onChange={setPhone} tone="violet" />
                    </Field>

                    <div>
                      <p className="text-[10px] font-light uppercase tracking-[0.18em] text-violet-200/80 mb-2.5">
                        Inquiry Type
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {inquiryTypes.map((t) => {
                          const active = inquiry === t
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setInquiry(t)}
                              className={`px-4 py-2 rounded-full text-xs font-light border transition-all duration-200 ${
                                active
                                  ? "bg-violet-500/20 border-violet-400/40 text-white"
                                  : "bg-white/[0.03] border-white/10 text-white/65 hover:text-white hover:bg-white/[0.06]"
                              }`}
                            >
                              {t}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <Field label="Message">
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your context — clinical setting, patient volume, what you're trying to solve."
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm font-light text-white placeholder-white/30 focus:outline-none focus:border-violet-400/50 focus:bg-white/[0.05] transition-colors resize-none"
                      />
                    </Field>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
                    >
                      Send Message
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 mb-5"
                    >
                      <CheckCircle2 className="w-8 h-8 text-emerald-300" />
                    </motion.div>
                    <h3 className="text-2xl font-light text-white mb-2">Message received</h3>
                    <p className="text-sm font-light text-white/70 max-w-sm mx-auto">
                      Thanks for reaching out. The right team will follow up within 24 hours.
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Direct contact */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-950/40 via-emerald-900/15 to-black p-6 hover:border-emerald-300/50 hover:bg-emerald-500/[0.06] transition-colors relative overflow-hidden"
                >
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-emerald-500/30 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <span className="relative inline-flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 mb-4">
                    <MessageCircle className="w-5 h-5 text-emerald-200" />
                  </span>
                  <p className="relative text-[10px] uppercase tracking-[0.18em] text-emerald-300/80 mb-1.5">
                    Instant
                  </p>
                  <h4 className="relative text-lg font-light text-white mb-1.5">WhatsApp Us</h4>
                  <p className="relative text-xs font-light text-white/65 mb-3">
                    For immediate clinical or partnership inquiries.
                  </p>
                  <span className="relative inline-flex items-center gap-1.5 text-sm text-emerald-200 group-hover:text-white transition-colors">
                    Open chat
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>

                <a
                  href="mailto:info@pulsebridgehealthcare.com"
                  className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-violet-300/40 hover:bg-violet-500/[0.04] transition-colors"
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-violet-500/15 border border-violet-400/30 mb-4">
                    <Mail className="w-5 h-5 text-violet-200" />
                  </span>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-violet-300/80 mb-1.5">
                    Email
                  </p>
                  <p className="text-sm font-light text-white break-all">
                    info@pulsebridgehealthcare.com
                  </p>
                </a>

                <a
                  href="tel:+914023420049"
                  className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-cyan-300/40 hover:bg-cyan-500/[0.04] transition-colors"
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-400/30 mb-4">
                    <Phone className="w-5 h-5 text-cyan-200" />
                  </span>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-300/80 mb-1.5">
                    Phone
                  </p>
                  <p className="text-sm font-light text-white">+91-40 23420049</p>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map / global presence */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-12 max-w-2xl mx-auto"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-200 text-[10px] font-light uppercase tracking-[0.18em] mb-5">
                <Building2 className="w-3 h-3 mr-1.5" />
                Global Presence
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">
                Operating across{" "}
                <span className="instrument italic font-medium bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  Canada & India
                </span>
              </h2>
            </motion.div>

            {/* Stylized world map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950/20 via-black/80 to-cyan-950/20 backdrop-blur-md overflow-hidden p-6 md:p-10"
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.18] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1.5px 1.5px, rgba(196,181,253,0.5) 1px, transparent 0)",
                  backgroundSize: "20px 20px",
                  maskImage:
                    "radial-gradient(ellipse at center, black 35%, transparent 80%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse at center, black 35%, transparent 80%)",
                }}
              />

              <div className="relative aspect-[16/8] w-full">
                {offices.map((o, i) => (
                  <motion.div
                    key={o.region}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: 0.3 + i * 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ left: o.coords.x, top: o.coords.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                  >
                    {/* Pulse rings */}
                    {[1, 2].map((ring) => (
                      <motion.span
                        key={ring}
                        animate={{ scale: [1, 3.5], opacity: [0.5, 0] }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          delay: ring * 0.6,
                          ease: "easeOut",
                        }}
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-br ${o.accent} border ${o.border}`}
                      />
                    ))}
                    <span
                      className={`relative block w-3 h-3 rounded-full bg-gradient-to-br ${o.accent} border ${o.border} shadow-[0_0_18px_rgba(167,139,250,0.6)]`}
                    />
                    <div
                      className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border ${o.border} bg-black/70 backdrop-blur-md px-3 py-1.5 text-[10px] font-mono ${o.iconColor} tracking-widest`}
                    >
                      {o.flag} · {o.city.toUpperCase()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Office cards */}
            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              {offices.map((o, i) => (
                <motion.div
                  key={o.region}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className={`rounded-2xl border ${o.border} bg-white/[0.03] backdrop-blur-md p-6`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${o.accent} border ${o.border}`}
                    >
                      <MapPin className={`w-4 h-4 ${o.iconColor}`} />
                    </span>
                    <div>
                      <p className="text-[10px] font-mono tracking-[0.18em] text-white/55">
                        {o.region.toUpperCase()}
                      </p>
                      <p className="text-base font-light text-white">{o.city}</p>
                    </div>
                  </div>
                  <p className="text-sm font-light text-white/70 leading-relaxed">{o.address}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] font-light uppercase tracking-[0.18em] text-violet-200/80 mb-2 block">
        {label}
      </span>
      {children}
    </label>
  )
}
