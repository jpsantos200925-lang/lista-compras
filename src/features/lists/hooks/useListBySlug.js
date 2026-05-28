import { useState, useEffect } from 'react'
import { fetchListBySlug } from '../services/lists.service'

export function useListBySlug(slug) {
  const [list, setList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setNotFound(false)
    fetchListBySlug(slug)
      .then(setList)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  return { list, loading, notFound }
}
