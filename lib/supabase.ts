"use client"

import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Placeholders only used at build time when env vars are missing (e.g. on a
// fresh Vercel deploy before secrets are set). Runtime calls with these will
// fail gracefully — the build won't.
const PLACEHOLDER_URL = "https://placeholder.supabase.co"
const PLACEHOLDER_KEY = "placeholder-key"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    "[supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY missing — set them in your environment (Vercel project settings → Environment Variables, or local .env file).",
  )
}

let _client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!_client) {
    _client = createClient(url || PLACEHOLDER_URL, anonKey || PLACEHOLDER_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    })
  }
  return _client
}

// Lazy proxy — only instantiates the real client on first property access,
// so prerender (which never accesses these properties) doesn't crash on
// missing env vars. At runtime in the browser, the env values are present.
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const client = getSupabase()
    const value = Reflect.get(client as object, prop, receiver)
    return typeof value === "function" ? value.bind(client) : value
  },
})
