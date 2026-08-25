import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/authContext.js'

export function RequireAdmin({ children }) {
  const { isAuthenticated, role } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (role !== 'ADMIN') {
    return <Navigate to="/" replace />
  }

  return children
}
