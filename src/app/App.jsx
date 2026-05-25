import { useAuth } from '@/features/auth'
import AppRoutes from './routes'

export default function App() {
  const { session, loading } = useAuth()

  if (loading) return null

  return <AppRoutes session={session} />
}
