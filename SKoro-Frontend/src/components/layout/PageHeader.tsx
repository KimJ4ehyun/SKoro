import {
  managerNavItems,
  memberNavItems,
  adminNavItems,
} from '../../constants/navigation'
import { useUserInfoStore } from '../../store/useUserInfoStore'
import { styles, cn } from '../navbar'

interface PageHeaderProps {
  activeItem: string
  currentPath: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ activeItem, currentPath }) => {
  const userRole = useUserInfoStore((state) => state.role) || 'MEMBER'
  const currentPage = (
    userRole === 'MANAGER'
      ? managerNavItems
      : userRole === 'MEMBER'
      ? memberNavItems
      : adminNavItems
  ).find((item) => item.id === activeItem)

  return (
    <header className={cn(styles.whiteBg, styles.shadow, 'border-b px-8 py-4')}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={cn('text-2xl font-bold', styles.darkText)}>
            {currentPage?.label || '홈'}
          </h1>
          <nav aria-label="breadcrumb">
            <p className={cn('text-sm mt-1', styles.mutedText)}>
              현재 경로: {currentPath}
            </p>
          </nav>
        </div>
        <div className={cn('text-sm', styles.lightMutedText)}>
          SKoro Dashboard
        </div>
      </div>
    </header>
  )
}

export default PageHeader
