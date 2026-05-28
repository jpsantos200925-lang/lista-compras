import { useState, useEffect, useCallback } from 'react'
import { fetchLists, createList, updateList, deleteList, uploadListLogo } from '../services/lists.service'

export function useLists() {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setLists(await fetchLists())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const addList = useCallback(async (payload, logoFile) => {
    let logo_url = null
    if (logoFile) {
      try {
        logo_url = await uploadListLogo(logoFile)
      } catch (err) {
        console.warn('[useLists] Logo upload falhou, criando lista sem logo:', err.message)
      }
    }
    const list = await createList({ ...payload, logo_url })
    setLists(prev => [...prev, list])
    return list
  }, [])

  const editList = useCallback(async (id, payload, logoFile) => {
    let updates = { ...payload }
    if (logoFile) {
      try {
        updates.logo_url = await uploadListLogo(logoFile)
      } catch (err) {
        console.warn('[useLists] Logo upload falhou, salvando lista sem atualizar logo:', err.message)
      }
    }
    const list = await updateList(id, updates)
    setLists(prev => prev.map(l => l.id === id ? list : l))
    return list
  }, [])

  const removeList = useCallback(async (id) => {
    await deleteList(id)
    setLists(prev => prev.filter(l => l.id !== id))
  }, [])

  return { lists, loading, addList, editList, removeList, reload: load }
}
