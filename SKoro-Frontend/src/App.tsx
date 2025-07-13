import { lazy, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { useUserInfoStore } from './store/useUserInfoStore'
import { FinalEvaluationPage } from './pages'
import { MainRoute, ProtectedRoute, LoginGuard } from './components/router'

export const pages: Record<string, React.LazyExoticComponent<React.FC>> = {
  HomePage: lazy(() => import('./pages/HomePage')),
  LoginPage: lazy(() => import('./pages/LoginPage')),
  TeamPage: lazy(() => import('./pages/TeamPage')),
  MemberReportPage: lazy(() => import('./pages/MemberReportPage')),
  FeedbackPage: lazy(() => import('./pages/FeedbackPage')),
  FinalPage: lazy(() => import('./pages/FinalPage')),
  PeerEvaluationPage: lazy(() => import('./pages/PeerEvaluationPage')),
  MemberEvaluationPage: lazy(() => import('./pages/MemberEvaluationPage')),
  AdminPage: lazy(() => import('./pages/AdminPage')),
  KPIPage: lazy(() => import('./pages/KPIPage')),
  AdminLogicPage: lazy(() => import('./pages/AdminLogicPage')),
}

export const {
  HomePage,
  LoginPage,
  TeamPage,
  MemberReportPage,
  FeedbackPage,
  FinalPage,
  PeerEvaluationPage,
  MemberEvaluationPage,
  AdminPage,
  KPIPage,
  AdminLogicPage,
} = pages

function App() {
  const [userRole, setUserRole] = useState<string | null>(
    useUserInfoStore.getState().role || 'MEMBER'
  )
  const userInfo = sessionStorage.getItem('SKoroUserInfo')
  useEffect(() => {
    if (userInfo) {
      useUserInfoStore.getState().setUserInfo(JSON.parse(userInfo))
      setUserRole(useUserInfoStore.getState().role || 'MEMBER')
    } else {
      useUserInfoStore.getState().logout()
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginGuard />} />
        <Route path="/" element={<MainRoute />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/logic" element={<AdminLogicPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/:id" element={<MemberReportPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/final" element={<FinalPage />} />
          <Route path="/evaluation" element={<FinalEvaluationPage />} />
          <Route path="/evaluation/:id" element={<MemberEvaluationPage />} />
          <Route path="/peertalk" element={<PeerEvaluationPage />} />
          <Route path="/peertalk/:id" element={<PeerEvaluationPage />} />
          <Route path="/team-goal" element={<KPIPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
