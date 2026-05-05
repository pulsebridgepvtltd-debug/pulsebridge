"use client"

import { ChevronDown, Search } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

interface Country {
  code: string // ISO-2
  dial: string // "+91"
  name: string
  flag: string
}

// Curated list — most common origins for healthcare / clinical-trial leads.
// Sorted alphabetically by name; India + US float to the top via DEFAULT_DIAL.
export const COUNTRIES: Country[] = [
  { code: "AU", dial: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "AT", dial: "+43", name: "Austria", flag: "🇦🇹" },
  { code: "BE", dial: "+32", name: "Belgium", flag: "🇧🇪" },
  { code: "BR", dial: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "CA", dial: "+1", name: "Canada", flag: "🇨🇦" },
  { code: "CN", dial: "+86", name: "China", flag: "🇨🇳" },
  { code: "DK", dial: "+45", name: "Denmark", flag: "🇩🇰" },
  { code: "EG", dial: "+20", name: "Egypt", flag: "🇪🇬" },
  { code: "FR", dial: "+33", name: "France", flag: "🇫🇷" },
  { code: "DE", dial: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "IN", dial: "+91", name: "India", flag: "🇮🇳" },
  { code: "ID", dial: "+62", name: "Indonesia", flag: "🇮🇩" },
  { code: "IE", dial: "+353", name: "Ireland", flag: "🇮🇪" },
  { code: "IL", dial: "+972", name: "Israel", flag: "🇮🇱" },
  { code: "IT", dial: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "JP", dial: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "KE", dial: "+254", name: "Kenya", flag: "🇰🇪" },
  { code: "MY", dial: "+60", name: "Malaysia", flag: "🇲🇾" },
  { code: "MX", dial: "+52", name: "Mexico", flag: "🇲🇽" },
  { code: "NL", dial: "+31", name: "Netherlands", flag: "🇳🇱" },
  { code: "NZ", dial: "+64", name: "New Zealand", flag: "🇳🇿" },
  { code: "NG", dial: "+234", name: "Nigeria", flag: "🇳🇬" },
  { code: "NO", dial: "+47", name: "Norway", flag: "🇳🇴" },
  { code: "PK", dial: "+92", name: "Pakistan", flag: "🇵🇰" },
  { code: "PH", dial: "+63", name: "Philippines", flag: "🇵🇭" },
  { code: "PL", dial: "+48", name: "Poland", flag: "🇵🇱" },
  { code: "PT", dial: "+351", name: "Portugal", flag: "🇵🇹" },
  { code: "QA", dial: "+974", name: "Qatar", flag: "🇶🇦" },
  { code: "SA", dial: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "SG", dial: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "ZA", dial: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "KR", dial: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "ES", dial: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "LK", dial: "+94", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "SE", dial: "+46", name: "Sweden", flag: "🇸🇪" },
  { code: "CH", dial: "+41", name: "Switzerland", flag: "🇨🇭" },
  { code: "TW", dial: "+886", name: "Taiwan", flag: "🇹🇼" },
  { code: "TH", dial: "+66", name: "Thailand", flag: "🇹🇭" },
  { code: "TR", dial: "+90", name: "Turkey", flag: "🇹🇷" },
  { code: "AE", dial: "+971", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "GB", dial: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "US", dial: "+1", name: "United States", flag: "🇺🇸" },
  { code: "VN", dial: "+84", name: "Vietnam", flag: "🇻🇳" },
]

const DEFAULT_DIAL = "+91"

// Longest dial codes first so "+971" matches before "+9".
const DIAL_LOOKUP = [...COUNTRIES].sort((a, b) => b.dial.length - a.dial.length)

function findCountry(dial: string): Country {
  // For dials shared by multiple countries (e.g. +1 → US/CA), prefer US.
  if (dial === "+1") return COUNTRIES.find((c) => c.code === "US")!
  return COUNTRIES.find((c) => c.dial === dial) ?? COUNTRIES.find((c) => c.dial === DEFAULT_DIAL)!
}

function parseValue(value: string): { dial: string; num: string } {
  const trimmed = (value ?? "").trim()
  if (!trimmed) return { dial: DEFAULT_DIAL, num: "" }
  for (const c of DIAL_LOOKUP) {
    if (trimmed.startsWith(c.dial)) {
      return { dial: c.dial, num: trimmed.slice(c.dial.length).replace(/^\s+/, "") }
    }
  }
  return { dial: DEFAULT_DIAL, num: trimmed }
}

interface PhoneInputProps {
  value: string
  onChange: (next: string) => void
  required?: boolean
  placeholder?: string
  /** Tailwind ring/border color when focused — default uses violet. */
  tone?: "violet" | "emerald" | "cyan"
  className?: string
}

const TONE_FOCUS: Record<NonNullable<PhoneInputProps["tone"]>, string> = {
  violet: "focus-within:border-violet-300/50 focus-within:bg-white/[0.07]",
  emerald: "focus-within:border-emerald-300/50 focus-within:bg-white/[0.07]",
  cyan: "focus-within:border-cyan-300/50 focus-within:bg-white/[0.07]",
}

export default function PhoneInput({
  value,
  onChange,
  required,
  placeholder = "9876543210",
  tone = "violet",
  className = "",
}: PhoneInputProps) {
  const { dial, num } = useMemo(() => parseValue(value), [value])
  const selected = useMemo(() => findCountry(dial), [dial])

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const wrapperRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDoc)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  // Focus search when opened
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50)
    else setQuery("")
  }, [open])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COUNTRIES
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q) ||
        c.code.toLowerCase() === q,
    )
  }, [query])

  const handleSelect = (next: Country) => {
    setOpen(false)
    onChange(num ? `${next.dial} ${num}` : `${next.dial} `)
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip everything except digits and a few common separators
    const cleaned = e.target.value.replace(/[^\d\s-]/g, "")
    if (!cleaned) {
      onChange("")
    } else {
      onChange(`${dial} ${cleaned}`)
    }
  }

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div
        className={`flex items-stretch rounded-xl border border-white/10 bg-white/[0.04] transition-colors ${TONE_FOCUS[tone]}`}
      >
        {/* Country selector */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex items-center gap-1.5 pl-3 pr-2 py-3 border-r border-white/10 text-sm font-light text-white/85 hover:text-white transition-colors"
        >
          <span className="text-base leading-none" aria-hidden>
            {selected.flag}
          </span>
          <span className="font-mono text-xs text-white/75">{selected.dial}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-white/45 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Number */}
        <input
          required={required}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={num}
          onChange={handleNumberChange}
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent border-0 outline-none px-3 py-3 text-sm font-light text-white placeholder-white/30"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 left-0 right-0 sm:right-auto sm:w-72 mt-2 rounded-xl border border-white/15 bg-black/95 backdrop-blur-xl shadow-[0_18px_40px_rgba(0,0,0,0.55)] overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/10">
            <Search className="w-3.5 h-3.5 text-white/45 flex-shrink-0" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code…"
              className="flex-1 bg-transparent border-0 outline-none text-xs font-light text-white placeholder-white/30"
            />
          </div>
          <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-3 text-xs font-light text-white/45 text-center">
                No matches
              </li>
            ) : (
              filtered.map((c) => {
                const active = c.dial === selected.dial && c.code === selected.code
                return (
                  <li key={c.code} role="option" aria-selected={active}>
                    <button
                      type="button"
                      onClick={() => handleSelect(c)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                        active
                          ? "bg-violet-500/15 text-white"
                          : "text-white/80 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      <span className="text-base leading-none flex-shrink-0" aria-hidden>
                        {c.flag}
                      </span>
                      <span className="text-xs font-light flex-1 truncate">{c.name}</span>
                      <span className="font-mono text-[11px] text-white/55 flex-shrink-0">
                        {c.dial}
                      </span>
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
