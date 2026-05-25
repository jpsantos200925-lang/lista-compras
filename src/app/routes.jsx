import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import Home from '@/pages/Home'

export default function AppRoutes({ session }) {
  return (
    <Routes>
      <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
      <Route path="/" element={session ? <Home session={session} /> : <Navigate to="/login" />} />
    </Routes>
  )
}
