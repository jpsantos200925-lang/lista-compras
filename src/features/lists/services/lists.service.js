import { supabase } from '@/shared/services/supabaseClient'

export async function fetchLists() {
  const { data, error } = await supabase
    .from('lists')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

export async function fetchListBySlug(slug) {
  const { data, error } = await supabase
    .from('lists')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data
}

export async function checkSlugAvailable(slug) {
  const { data, error } = await supabase
    .from('lists')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()
  if (error) throw error
  return data === null
}

export async function createList(payload) {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('lists')
    .insert({ ...payload, user_id: user.id })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateList(id, payload) {
  const { data, error } = await supabase
    .from('lists')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteList(id) {
  const { error } = await supabase.from('lists').delete().eq('id', id)
  if (error) throw error
}

export function uploadListLogo(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = (e) => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        const MAX = 256
        const scale = Math.min(MAX / img.width, MAX / img.height, 1)
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/webp', 0.85))
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}
