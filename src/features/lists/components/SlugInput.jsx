import { useState, useEffect, useRef } from 'react'
import { checkSlugAvailable } from '../services/lists.service'
import { supabase } from '@/shared/services/supabaseClient'

function sanitizeSlug(value) {
  return value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function SlugInput({ value, onChange, excludeId }) {
  const [status, setStatus] = useState(null) // null | 'checking' | 'available' | 'taken'
  const timerRef = useRef(null)

  const handleChange = (e) => {
    const sanitized = sanitizeSlug(e.target.value)
    onChange(sanitized)
  }

  useEffect(() => {
    if (!value) { setStatus(null); return }
    setStatus('checking')
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      try {
        let available = await checkSlugAvailable(value)
        // Se for edição e o slug é do próprio item, está disponível
        if (!available && excludeId) {
          const { data } = await supabase.from('lists').select('id').eq('slug', value).single()
          if (data?.id === excludeId) available = true
        }
        setStatus(available ? 'available' : 'taken')
      } catch {
        setStatus(null)
      }
    }, 500)
    return () => clearTimeout(timerRef.current)
  }, [value, excludeId])

  const indicator = {
    checking: <span className="slug-status checking">verificando...</span>,
    available: <span className="slug-status available">✓ disponível</span>,
    taken: <span className="slug-status taken">✗ já existe</span>,
  }[status]

  return (
    <div className="slug-input-wrap">
      <input
        className="form-input"
        type="text"
        placeholder="minha-lista"
        value={value}
        onChange={handleChange}
        maxLength={50}
      />
      {indicator}
    </div>
  )
}
