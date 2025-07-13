const styles = {
  // 기본 색상 및 배경
  primaryBg: 'bg-[#3D8EFF]',
  secondaryBg: 'bg-gradient-to-b from-blue-500 to-blue-600',
  whiteBg: 'bg-white',
  grayBg: 'bg-gray-100',
  lightGrayBg: 'bg-gray-50',

  // 텍스트 색상
  primaryText: 'text-white',
  secondaryText: 'text-white/50',
  darkText: 'text-gray-900',
  mutedText: 'text-gray-500',
  lightMutedText: 'text-gray-400',

  // 호버 효과
  whiteHover: 'hover:bg-white/20',
  whiteHoverStrong: 'hover:bg-white/10',
  textHover: 'hover:text-white',
  textHoverSoft: 'hover:text-white/80',

  // 트랜지션
  transition: 'transition-all duration-300',
  transitionEase: 'transition-all duration-300 ease-in-out',
  transitionEaseOut: 'transition-all duration-300 ease-out',

  // 네비게이션 아이템 기본 스타일
  navItem:
    'w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out',
  navItemDesktop:
    'relative w-full flex items-center space-x-4 px-4 py-4 rounded-lg transition-all duration-300 ease-in-out z-10',

  // 활성/비활성 상태
  activeNavItem: 'bg-white/20 text-white border-l-4 border-white',
  inactiveNavItem: 'text-white/50 hover:text-white hover:bg-white/10',
  activeDesktopNavItem: 'text-white',
  inactiveDesktopNavItem: 'text-white/50 hover:text-white/80',

  // 버튼 스타일
  button: 'p-2 rounded-lg transition-all duration-300',
  logoutButton:
    'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300',

  // 레이아웃
  sidebar: 'shadow-xl flex-col relative',
  sidebarCollapsed: 'w-20',
  sidebarExpanded: 'w-60',

  // 보더
  borderPrimary: 'border-blue-400/30',
  borderTop: 'border-t border-blue-400/30',
  borderBottom: 'border-b border-blue-400/30',

  // 그림자
  shadow: 'shadow-sm',
  shadowLarge: 'shadow-lg',
  shadowXL: 'shadow-xl',

  // 고정 위치
  fixedTop: 'fixed top-0 left-0 right-0 z-50',
  fixedInset: 'fixed inset-0',

  // 오버레이
  overlay: 'bg-black/50',

  // 아이콘
  icon: 'transition-all duration-300 flex-shrink-0',

  // 텍스트 애니메이션 (접기/펼치기)
  textCollapsed: 'opacity-0 w-0 overflow-hidden pl-0',
  textExpanded: 'opacity-100 pl-2',
  textTransition: 'font-medium transition-all duration-300 whitespace-nowrap',

  // 브랜딩
  brandingTitle: 'text-white text-3xl font-bold font-agbalumo cursor-default',
  brandingTitleCollapsed:
    'text-white text-3xl font-bold tracking-wide transition-all duration-300 font-agbalumo cursor-default',

  // 활성 표시기
  activeIndicator:
    'absolute left-0 right-0 h-14 bg-white/20 border-l-4 border-white transition-all duration-300 ease-out',
}

// 조건부 스타일 헬퍼 함수들
const conditionalStyles = {
  navItemState: (isActive: boolean, isHovered?: boolean) => {
    if (isActive) return styles.activeNavItem
    return styles.inactiveNavItem
  },

  desktopNavItemState: (isActive: boolean, isHovered?: boolean) => {
    if (isActive || isHovered) return styles.activeDesktopNavItem
    return styles.inactiveDesktopNavItem
  },

  sidebarWidth: (isCollapsed: boolean) => {
    return isCollapsed ? styles.sidebarCollapsed : styles.sidebarExpanded
  },

  textVisibility: (isCollapsed: boolean) => {
    return isCollapsed ? styles.textCollapsed : styles.textExpanded
  },

  brandingVisibility: (isCollapsed: boolean) => {
    return `${styles.brandingTitleCollapsed} ${
      isCollapsed ? styles.textCollapsed : styles.textExpanded
    }`
  },

  logoutButtonState: (isHovered: boolean) => {
    return isHovered
      ? `${styles.logoutButton} text-white bg-white/10`
      : `${styles.logoutButton} text-white/50 hover:text-white/80 hover:bg-white/10`
  },

  activeIndicatorOpacity: (hoveredItem: string | null, activeItem: string) => {
    return hoveredItem && hoveredItem !== 'logout'
      ? 'opacity-100'
      : activeItem
      ? 'opacity-100'
      : 'opacity-0'
  },

  butterflyPosition: (isCollapsed: boolean) => {
    return `absolute transition-all duration-300 ${
      isCollapsed ? 'w-20 bottom-24 -left-2' : 'w-60 bottom-24 -left-6'
    }`
  },
}

// 클래스 결합 헬퍼 함수
const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(' ')

export { styles, conditionalStyles, cn }
