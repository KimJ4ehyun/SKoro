import type { DesktopSidebarProps } from '../../types/Navbar.types'
import {
  managerNavItems,
  memberNavItems,
  adminNavItems,
} from '../../constants/navigation'
import { styles, conditionalStyles, cn } from '../navbar'
import { ButterflyImg } from '../../assets/common'
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react'

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  userRole,
  isCollapsed,
  activeItem,
  hoveredItem,
  onNavClick,
  onLogout,
  onToggleCollapse,
  onHoverItem,
  evaluationStatus,
}) => {
  const navItems =
    userRole === 'MANAGER'
      ? managerNavItems
      : userRole === 'MEMBER'
      ? memberNavItems
      : adminNavItems

  return (
    <aside
      className={cn(
        'hidden md:flex',
        conditionalStyles.sidebarWidth(isCollapsed),
        styles.primaryBg,
        styles.sidebar,
        styles.transitionEase
      )}
      aria-label="메인 네비게이션"
    >
      {/* Logo and Collapse Button */}
      <header
        className={cn(
          'p-6',
          styles.borderBottom,
          'flex items-center justify-between'
        )}
      >
        <h1 className={conditionalStyles.brandingVisibility(isCollapsed)}>
          SKoro
        </h1>
        <button
          onClick={onToggleCollapse}
          className={cn(
            'text-white/80',
            styles.textHover,
            styles.whiteHover,
            styles.button,
            styles.transition
          )}
          aria-label={isCollapsed ? '사이드바 확장' : '사이드바 축소'}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </header>

      {/* Navigation Items */}
      <nav className="flex-1 py-6 px-4 relative" role="navigation">
        {/* Background indicator */}
        <div
          className={cn(
            styles.activeIndicator,
            conditionalStyles.activeIndicatorOpacity(hoveredItem, activeItem)
          )}
          style={{
            transform: `translateY(${
              navItems.findIndex((item) =>
                hoveredItem && hoveredItem !== 'logout'
                  ? item.id === hoveredItem
                  : item.id === activeItem
              ) * 56
            }px)`,
          }}
          aria-hidden="true"
        />

        <ul className="space-y-0">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            const isHovered = hoveredItem === item.id

            if (
              item.id !== 'evaluation' ||
              (userRole === 'MEMBER' &&
                evaluationStatus === 'PEER_EVALUATION') ||
              (userRole === 'MANAGER' &&
                evaluationStatus === 'MANAGER_EVALUATION')
            ) {
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavClick(item)}
                    onMouseEnter={() => onHoverItem(item.id)}
                    onMouseLeave={() => onHoverItem(null)}
                    className={cn(
                      styles.navItemDesktop,
                      conditionalStyles.desktopNavItemState(isActive, isHovered)
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon
                      size={20}
                      className={styles.icon}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        styles.textTransition,
                        conditionalStyles.textVisibility(isCollapsed)
                      )}
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              )
            }
          })}
        </ul>
      </nav>

      {/* Butterfly Image */}
      <img
        src={ButterflyImg}
        alt="butterfly decoration"
        className={conditionalStyles.butterflyPosition(isCollapsed)}
      />

      {/* Bottom Section */}
      <footer className={cn('p-4', styles.borderTop)}>
        <button
          onClick={onLogout}
          className={conditionalStyles.logoutButtonState(
            hoveredItem === 'logout'
          )}
          onMouseEnter={() => onHoverItem('logout')}
          onMouseLeave={() => onHoverItem(null)}
        >
          <LogOut size={20} className={styles.icon} aria-hidden="true" />
          <span
            className={cn(
              styles.textTransition,
              conditionalStyles.textVisibility(isCollapsed)
            )}
          >
            로그아웃
          </span>
        </button>
      </footer>
    </aside>
  )
}

export default DesktopSidebar
