import { Suspense, memo } from 'react'
import { Navigate } from 'react-router-dom'
import { LoadingSpinner } from '../common'
import { LoginPage } from '../../App'
import { isAuthenticated } from '../../store/useAuthStore'

const LoginGuard = memo(() => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />
  }
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginPage />
    </Suspense>
  )
})

export default LoginGuard
