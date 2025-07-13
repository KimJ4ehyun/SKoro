import { Suspense, memo } from 'react'
import { Navigate } from 'react-router-dom'
import { Navbar } from '../navbar'
import { LoadingSpinner } from '../common'
import { AdminPage, HomePage } from '../../App'
import { isAuthenticated } from '../../store/useAuthStore'

const MainRoute = memo(() => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  const userRole = sessionStorage.getItem('SKoroUserInfo')
    ? JSON.parse(sessionStorage.getItem('SKoroUserInfo') || '{}').role ||
      'MEMBER'
    : 'MEMBER'

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col md:ml-0 mt-16 md:mt-0 min-w-0 overflow-auto">
        <Suspense fallback={<LoadingSpinner />}>
          {userRole === 'ADMIN' ? <AdminPage /> : <HomePage />}
        </Suspense>
      </div>
    </div>
  )
})

export default MainRoute
