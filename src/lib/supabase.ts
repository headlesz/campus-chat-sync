import { createClient } from '@supabase/supabase-js'

// Temporary fallback for development - you MUST replace these with real values
const SUPABASE_URL = 'https://uytzimpbktkjecnbvush.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5dHppbXBia3RramVjbmJ2dXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0Mzg1MjQsImV4cCI6MjA3NzAxNDUyNH0.68Yr4AtX1VsHep-GXW57qd6KYGuD8mYbqr9rKJsoxMU'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Validate .edu email
export const isEduEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/i
  return emailRegex.test(email)
}

// Auth helper functions
export const signInWithOTP = async (email: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  return { data, error }
}

export const signUpWithOTP = async (email: string, userData?: { name?: string; age?: number }) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${window.location.origin}/auth/callback`,
      data: userData,
    },
  })
  return { data, error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}