import { Suspense, memo } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../navbar'
import { LoadingSpinner } from '../common'

const AppLayout = memo(() => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col md:ml-0 mt-16 md:mt-0 min-w-0 overflow-auto">
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
})

export default AppLayout
