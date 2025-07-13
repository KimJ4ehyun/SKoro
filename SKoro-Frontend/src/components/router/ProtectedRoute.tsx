import { memo } from 'react'
import { AppLayout } from '../layout'
import { Navigate } from 'react-router-dom'
import { useUserInfoStore } from '../../store/useUserInfoStore'
import { isAuthenticated } from '../../store/useAuthStore'

const ProtectedRoute = memo(() => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  const userRole = useUserInfoStore((state) => state.role || 'MEMBER')
  if (userRole === 'ADMIN' && window.location.pathname === '/admin') {
    return <Navigate to="/" replace />
  }

  return <AppLayout />
})

export default ProtectedRoute
