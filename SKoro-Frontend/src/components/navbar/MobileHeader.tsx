import { Menu, X } from 'lucide-react'
import type { MobileHeaderProps } from '../../types/Navbar.types'
import { styles, cn } from '../navbar'

const MobileHeader: React.FC<MobileHeaderProps> = ({
  isMenuOpen,
  onToggleMenu,
}) => {
  return (
    <header
      className={cn(
        'md:hidden',
        styles.fixedTop,
        styles.primaryBg,
        styles.shadowLarge
      )}
    >
      <div className="flex items-center justify-between p-4">
        <h1 className={cn(styles.brandingTitle, 'px-4')}>SKoro</h1>
        <button
          onClick={onToggleMenu}
          className={cn(
            styles.primaryText,
            styles.whiteHover,
            styles.button,
            styles.transition
          )}
          aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}

export default MobileHeader
