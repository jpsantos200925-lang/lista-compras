import { useEffect, useState } from 'react'
import { getSession, onAuthStateChange } from '../services/auth.service'

export function useAuth() {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  return { session, loading: session === undefined }
}
