import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import type { EvaluationStatusType, NavItem } from '../../types/Navbar.types'
import {
  managerNavItems,
  memberNavItems,
  adminNavItems,
} from '../../constants/navigation'
import { MobileHeader, MobileMenu, DesktopSidebar } from '.'
import UserService from '../../services/UserService'
import { useUserInfoStore } from '../../store/useUserInfoStore'
import { clearAuthCache } from '../../store/useAuthStore'
import { useNavStateStore } from '../../store/useNavStateStore'
import ReportService from '../../services/ReportService'

const Navbar: React.FC = () => {
  const userRole = useUserInfoStore((state) => state.role)
  const navigate = useNavigate()
  const location = useLocation().pathname

  // 네비게이션 상태를 전역 스토어에서 가져오기
  const {
    isCollapsed,
    isMobileMenuOpen,
    toggleCollapsed,
    toggleMobileMenu,
    setMobileMenuOpen,
  } = useNavStateStore()

  const [activeItem, setActiveItem] = useState<string>('home')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // URL 변경 시 activeItem 업데이트
  useEffect(() => {
    const currentNavItem = (
      userRole === 'MANAGER'
        ? managerNavItems
        : userRole === 'MEMBER'
        ? memberNavItems
        : adminNavItems
    ).find((item) => item.path === location)
    if (currentNavItem) {
      setActiveItem(currentNavItem.id)
    } else if (location === '/') {
      setActiveItem('home')
    }
  }, [location, userRole])

  const handleNavClick = (item: NavItem) => {
    setActiveItem(item.id)
    navigate(item.path)
    setMobileMenuOpen(false)
  }

  const handleLogout = () => {
    UserService.logout()
      .then(() => {
        console.log('로그아웃 성공')
        clearAuthCache()
        navigate('/login', { replace: true })
      })
      .catch((error) => {
        console.error('로그아웃 실패:', error)

        sessionStorage.removeItem('SKoroAccessToken')
        sessionStorage.removeItem('SKoroRefreshToken')
        sessionStorage.removeItem('SKoroUserInfo')

        navigate('/login', { replace: true })
      })
  }

  const handleToggleMobileMenu = () => {
    toggleMobileMenu()
  }

  const handleToggleSidebar = () => {
    toggleCollapsed()
  }

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const [evaluationStatus, setEvaluationStatus] =
    useState<EvaluationStatusType>('UNKNOWN')
  useEffect(() => {
    // 해당 기간에 활성화된 팀 평가 완료 여부 조회 (버튼 활성화)
    ReportService.getTeamEvaluationStatus()
      .then((status) => {
        console.log('팀 평가 완료 여부:', status)
        if (userRole === 'MEMBER') {
          const peerEvaluationStatus = status.find(
            (item: any) => item.periodPhase === 'PEER_EVALUATION'
          )
          setEvaluationStatus(
            peerEvaluationStatus ? peerEvaluationStatus.periodPhase : 'UNKNOWN'
          )
        } else if (userRole === 'MANAGER') {
          const managerEvaluationStatus = status.find(
            (item: any) => item.periodPhase === 'MANAGER_EVALUATION'
          )
          setEvaluationStatus(
            managerEvaluationStatus
              ? managerEvaluationStatus.periodPhase
              : 'UNKNOWN'
          )
        } else {
          setEvaluationStatus('UNKNOWN')
        }
      })
      .catch((error) => {
        console.error('팀 평가 완료 여부 조회 실패:', error)
        setEvaluationStatus('MANAGER_EVALUATION')
      })
  }, [])

  return (
    <>
      {/* Mobile Navigation */}
      <MobileHeader
        isMenuOpen={isMobileMenuOpen}
        onToggleMenu={handleToggleMobileMenu}
      />
      <MobileMenu
        userRole={userRole}
        isOpen={isMobileMenuOpen}
        activeItem={activeItem}
        onNavClick={handleNavClick}
        onLogout={handleLogout}
        onClose={handleCloseMobileMenu}
        evaluationStatus={evaluationStatus}
      />

      {/* Desktop Navigation */}
      <DesktopSidebar
        userRole={userRole}
        isCollapsed={isCollapsed}
        activeItem={activeItem}
        hoveredItem={hoveredItem}
        onNavClick={handleNavClick}
        onLogout={handleLogout}
        onToggleCollapse={handleToggleSidebar}
        onHoverItem={setHoveredItem}
        evaluationStatus={evaluationStatus}
      />
    </>
  )
}

export default Navbar
