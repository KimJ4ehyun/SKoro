export interface NavItem {
  id: string
  icon: React.ComponentType<any>
  label: string
  path: string
}

export interface NavigationProps {
  activeItem: string
  onNavClick: (item: NavItem) => void
  onLogout: () => void
}

export type EvaluationStatusType =
  | 'NOT_STARTED'
  | 'PEER_EVALUATION'
  | 'MIDDLE_REPORT'
  | 'MANAGER_EVALUATION'
  | 'REPORT_GENERATION'
  | 'EVALUATION_FEEDBACK'
  | 'COMPLETED'
  | 'UNKNOWN'

export interface MobileHeaderProps {
  isMenuOpen: boolean
  onToggleMenu: () => void
}

export interface MobileMenuProps extends NavigationProps {
  userRole: 'manager' | 'member' | 'admin' | string
  isOpen: boolean
  onClose: () => void
  evaluationStatus: EvaluationStatusType
}

export interface DesktopSidebarProps extends NavigationProps {
  userRole: 'manager' | 'member' | 'admin' | string
  isCollapsed: boolean
  hoveredItem: string | null
  onToggleCollapse: () => void
  onHoverItem: (item: string | null) => void
  evaluationStatus: EvaluationStatusType
}
