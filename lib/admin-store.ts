"use client"

import { useEffect, useState } from "react"
import { supabase } from "./supabase"

// ─── Types ────────────────────────────────────────────────────────────────

export type DemoRequestStatus = "new" | "contacted" | "converted" | "archived"
export type MessageStatus = "new" | "archived"
export type InquiryType = "Service" | "Clinical" | "Partnership"
export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship"
export type SalaryCurrency = "USD" | "INR"
export type ApplicationStatus =
  | "new"
  | "reviewed"
  | "shortlisted"
  | "rejected"
  | "archived"

export interface DemoRequest {
  id: string
  name: string
  email: string
  phone: string
  source?: string
  createdAt: string
  status: DemoRequestStatus
  notes?: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  inquiryType: InquiryType
  message: string
  createdAt: string
  status: MessageStatus
  notes?: string
}

export interface JobPosition {
  id: string
  title: string
  department: string
  location: string
  type: JobType
  description: string
  requirements: string[]
  responsibilities: string[]
  salaryRange?: string
  salaryCurrency: SalaryCurrency
  applyEmail?: string
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface JobApplication {
  id: string
  jobId: string | null
  jobTitle: string | null
  name: string
  email: string
  phone: string | null
  resumePath: string
  coverNote: string | null
  status: ApplicationStatus
  createdAt: string
}

// ─── DB row → camelCase converters ────────────────────────────────────────

function rowToDemoRequest(row: any): DemoRequest {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    source: row.source ?? undefined,
    createdAt: row.created_at,
    status: row.status,
    notes: row.notes ?? undefined,
  }
}

function rowToContactMessage(row: any): ContactMessage {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone ?? undefined,
    inquiryType: row.inquiry_type,
    message: row.message,
    createdAt: row.created_at,
    status: row.status,
    notes: row.notes ?? undefined,
  }
}

function rowToJob(row: any): JobPosition {
  return {
    id: row.id,
    title: row.title,
    department: row.department,
    location: row.location,
    type: row.type,
    description: row.description,
    requirements: row.requirements ?? [],
    responsibilities: row.responsibilities ?? [],
    salaryRange: row.salary_range ?? undefined,
    salaryCurrency: row.salary_currency ?? "USD",
    applyEmail: row.apply_email ?? undefined,
    active: row.active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

// ─── Generic realtime list hook ───────────────────────────────────────────

function useRealtimeList<T>(
  table: string,
  rowMap: (row: any) => T,
  orderBy: string = "created_at",
): T[] {
  const [items, setItems] = useState<T[]>([])

  useEffect(() => {
    let cancelled = false

    const fetchAll = async () => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order(orderBy, { ascending: false })
      if (cancelled) return
      if (!error && data) {
        setItems(data.map(rowMap))
      }
    }

    fetchAll()

    const channel = supabase
      .channel(`rt:${table}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        () => {
          fetchAll()
        },
      )
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [table, orderBy])

  return items
}

// ─── Demo Requests ────────────────────────────────────────────────────────

export function useDemoRequests() {
  return useRealtimeList<DemoRequest>("demo_requests", rowToDemoRequest)
}

export async function addDemoRequest(input: {
  name: string
  email: string
  phone: string
  source?: string
}): Promise<boolean> {
  // No `.select()` after insert — anon users can INSERT but not SELECT
  // (admin-only policy), so reading the row back would fail RLS.
  const { error } = await supabase.from("demo_requests").insert({
    name: input.name,
    email: input.email,
    phone: input.phone,
    source: input.source ?? null,
  })
  if (error) {
    // eslint-disable-next-line no-console
    console.error("addDemoRequest", error)
    return false
  }
  return true
}

export async function updateDemoRequest(id: string, updates: Partial<DemoRequest>) {
  const payload: Record<string, unknown> = {}
  if (updates.status !== undefined) payload.status = updates.status
  if (updates.notes !== undefined) payload.notes = updates.notes
  if (updates.name !== undefined) payload.name = updates.name
  if (updates.email !== undefined) payload.email = updates.email
  if (updates.phone !== undefined) payload.phone = updates.phone
  if (updates.source !== undefined) payload.source = updates.source

  const { error } = await supabase.from("demo_requests").update(payload).eq("id", id)
  if (error) console.error("updateDemoRequest", error)
}

export async function deleteDemoRequest(id: string) {
  const { error } = await supabase.from("demo_requests").delete().eq("id", id)
  if (error) console.error("deleteDemoRequest", error)
}

// ─── Contact Messages ─────────────────────────────────────────────────────

export function useContactMessages() {
  return useRealtimeList<ContactMessage>("contact_messages", rowToContactMessage)
}

export async function addContactMessage(input: {
  name: string
  email: string
  phone?: string
  inquiryType: InquiryType
  message: string
}): Promise<boolean> {
  const { error } = await supabase.from("contact_messages").insert({
    name: input.name,
    email: input.email,
    phone: input.phone ?? null,
    inquiry_type: input.inquiryType,
    message: input.message,
  })
  if (error) {
    console.error("addContactMessage", error)
    return false
  }
  return true
}

export async function updateContactMessage(id: string, updates: Partial<ContactMessage>) {
  const payload: Record<string, unknown> = {}
  if (updates.status !== undefined) payload.status = updates.status
  if (updates.notes !== undefined) payload.notes = updates.notes

  const { error } = await supabase.from("contact_messages").update(payload).eq("id", id)
  if (error) console.error("updateContactMessage", error)
}

export async function deleteContactMessage(id: string) {
  const { error } = await supabase.from("contact_messages").delete().eq("id", id)
  if (error) console.error("deleteContactMessage", error)
}

// ─── Jobs ─────────────────────────────────────────────────────────────────

export function useJobs() {
  return useRealtimeList<JobPosition>("jobs", rowToJob, "updated_at")
}

// No-op: kept for API compatibility — sample data now lives in the Supabase
// migration script, not in client storage.
export function ensureSampleJobs() {}

export async function addJob(
  input: Omit<JobPosition, "id" | "createdAt" | "updatedAt">,
): Promise<JobPosition | null> {
  const { data, error } = await supabase
    .from("jobs")
    .insert({
      title: input.title,
      department: input.department,
      location: input.location,
      type: input.type,
      description: input.description,
      requirements: input.requirements,
      responsibilities: input.responsibilities,
      salary_range: input.salaryRange ?? null,
      salary_currency: input.salaryCurrency,
      apply_email: input.applyEmail ?? null,
      active: input.active,
    })
    .select()
    .single()
  if (error) {
    console.error("addJob", error)
    return null
  }
  return data ? rowToJob(data) : null
}

export async function updateJob(
  id: string,
  updates: Partial<Omit<JobPosition, "id" | "createdAt">>,
) {
  const payload: Record<string, unknown> = {}
  if (updates.title !== undefined) payload.title = updates.title
  if (updates.department !== undefined) payload.department = updates.department
  if (updates.location !== undefined) payload.location = updates.location
  if (updates.type !== undefined) payload.type = updates.type
  if (updates.description !== undefined) payload.description = updates.description
  if (updates.requirements !== undefined) payload.requirements = updates.requirements
  if (updates.responsibilities !== undefined) payload.responsibilities = updates.responsibilities
  if (updates.salaryRange !== undefined) payload.salary_range = updates.salaryRange ?? null
  if (updates.salaryCurrency !== undefined) payload.salary_currency = updates.salaryCurrency
  if (updates.applyEmail !== undefined) payload.apply_email = updates.applyEmail ?? null
  if (updates.active !== undefined) payload.active = updates.active

  const { error } = await supabase.from("jobs").update(payload).eq("id", id)
  if (error) console.error("updateJob", error)
}

export async function deleteJob(id: string) {
  const { error } = await supabase.from("jobs").delete().eq("id", id)
  if (error) console.error("deleteJob", error)
}

// ─── Admin auth helper ────────────────────────────────────────────────────

/**
 * Returns the current admin profile (or null). Used by `/admin/layout.tsx`
 * to gate the dashboard.
 */
export async function getAdminSession(): Promise<{
  email: string
  isAdmin: boolean
} | null> {
  const { data: session } = await supabase.auth.getSession()
  const user = session.session?.user
  if (!user) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("role,email")
    .eq("id", user.id)
    .maybeSingle()

  if (!profile) return { email: user.email ?? "", isAdmin: false }
  return { email: profile.email, isAdmin: profile.role === "admin" }
}

export async function adminSignIn(
  email: string,
  password: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error || !data.user) {
    return { ok: false, error: "Wrong details" }
  }
  // Verify role
  const { data: profile, error: pErr } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle()
  if (pErr || !profile || profile.role !== "admin") {
    await supabase.auth.signOut()
    return { ok: false, error: "Wrong details" }
  }
  return { ok: true }
}

export async function adminSignOut() {
  await supabase.auth.signOut()
}

// ─── Applications + Resume Storage ────────────────────────────────────────

const RESUMES_BUCKET = "resumes"

function rowToApplication(row: any): JobApplication {
  return {
    id: row.id,
    jobId: row.job_id ?? null,
    jobTitle: row.jobs?.title ?? null,
    name: row.name,
    email: row.email,
    phone: row.phone ?? null,
    resumePath: row.resume_path,
    coverNote: row.cover_note ?? null,
    status: row.status,
    createdAt: row.created_at,
  }
}

export function useApplications() {
  const [items, setItems] = useState<JobApplication[]>([])

  useEffect(() => {
    let cancelled = false

    const fetchAll = async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*, jobs(title)")
        .order("created_at", { ascending: false })
      if (cancelled) return
      if (!error && data) {
        setItems(data.map(rowToApplication))
      }
    }

    fetchAll()

    const channel = supabase
      .channel("rt:applications")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "applications" },
        () => {
          fetchAll()
        },
      )
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [])

  return items
}

/**
 * Upload a resume file to the private `resumes` bucket.
 * Returns the storage path (used in the application record) or null on failure.
 */
export async function uploadResume(file: File): Promise<string | null> {
  // Sanitize filename — only allow safe chars; prefix with a unique id
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
  const path = `${id}-${safeName}`

  const { error } = await supabase.storage.from(RESUMES_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  })
  if (error) {
    console.error("uploadResume", error)
    return null
  }
  return path
}

/**
 * Generate a short-lived (5 min) signed URL so an admin can view/download a resume.
 */
export async function getResumeSignedUrl(path: string): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from(RESUMES_BUCKET)
    .createSignedUrl(path, 60 * 5)
  if (error) {
    console.error("getResumeSignedUrl", error)
    return null
  }
  return data?.signedUrl ?? null
}

export async function addApplication(input: {
  jobId: string | null
  name: string
  email: string
  phone?: string
  resumePath: string
  coverNote?: string
}): Promise<boolean> {
  const { error } = await supabase.from("applications").insert({
    job_id: input.jobId,
    name: input.name,
    email: input.email,
    phone: input.phone ?? null,
    resume_path: input.resumePath,
    cover_note: input.coverNote ?? null,
  })
  if (error) {
    console.error("addApplication", error)
    return false
  }
  return true
}

export async function updateApplication(
  id: string,
  updates: Partial<JobApplication>,
) {
  const payload: Record<string, unknown> = {}
  if (updates.status !== undefined) payload.status = updates.status
  if (updates.coverNote !== undefined) payload.cover_note = updates.coverNote ?? null

  const { error } = await supabase.from("applications").update(payload).eq("id", id)
  if (error) console.error("updateApplication", error)
}

/**
 * Deletes the application record AND wipes the resume file from storage.
 */
export async function deleteApplication(id: string, resumePath: string) {
  // Wipe file first — if this fails we still try to remove the record.
  const { error: storageErr } = await supabase.storage
    .from(RESUMES_BUCKET)
    .remove([resumePath])
  if (storageErr) {
    console.error("deleteApplication (storage)", storageErr)
  }

  const { error } = await supabase.from("applications").delete().eq("id", id)
  if (error) console.error("deleteApplication (row)", error)
}
