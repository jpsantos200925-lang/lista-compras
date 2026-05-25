import { supabase } from '@/shared/services/supabaseClient'

export async function signIn(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
}

export function signOut() {
  return supabase.auth.signOut()
}

export function getSession() {
  return supabase.auth.getSession()
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback)
}
