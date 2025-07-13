import { LogOut } from 'lucide-react'
import type { MobileMenuProps } from '../../types/Navbar.types'
import {
  managerNavItems,
  memberNavItems,
  adminNavItems,
} from '../../constants/navigation'
import { styles, conditionalStyles, cn } from '../navbar'

const MobileMenu: React.FC<MobileMenuProps> = ({
  userRole,
  isOpen,
  activeItem,
  onNavClick,
  onLogout,
  onClose,
  evaluationStatus,
}) => {
  if (!isOpen) return null

  return (
    <div
      className={cn('md:hidden', styles.fixedInset, 'z-40', styles.overlay)}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="모바일 메뉴"
    >
      <div
        className={cn(
          'absolute top-16 left-0 right-0',
          styles.secondaryBg,
          styles.shadowXL
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="py-4 pt-6 px-4 space-y-2" role="navigation">
          <ul className="space-y-2">
            {(userRole === 'MANAGER'
              ? managerNavItems
              : userRole === 'MEMBER'
              ? memberNavItems
              : adminNavItems
            ).map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.id

              if (
                item.id !== 'evaluation' ||
                (userRole === 'MEMBER' &&
                  evaluationStatus === 'PEER_EVALUATION') ||
                (userRole === 'MANAGER' &&
                  evaluationStatus === 'MANAGER_EVALUATION')
              )
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onNavClick(item)}
                      className={cn(
                        styles.navItem,
                        conditionalStyles.navItemState(isActive)
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon size={20} aria-hidden="true" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                )
            })}
          </ul>

          <div className={cn(styles.borderTop, 'mt-4 pt-4')}>
            <button
              onClick={onLogout}
              className={cn(styles.navItem, styles.inactiveNavItem)}
            >
              <LogOut size={20} aria-hidden="true" />
              <span className="font-medium">로그아웃</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default MobileMenu
