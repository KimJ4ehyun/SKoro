import { styles, cn } from '../navbar'
import { Home } from 'lucide-react'
import {
  managerNavItems,
  memberNavItems,
  adminNavItems,
} from '../../constants/navigation'
import { useUserInfoStore } from '../../store/useUserInfoStore'

interface MainContentProps {
  activeItem: string
  currentPath: string
}

const MainContent: React.FC<MainContentProps> = ({
  activeItem,
  currentPath,
}) => {
  const userRole = useUserInfoStore((state) => state.role) || 'MEMBER'
  const currentPage = (
    userRole === 'MANAGER'
      ? managerNavItems
      : userRole === 'MEMBER'
      ? memberNavItems
      : adminNavItems
  ).find((item) => item.id === activeItem)
  const Icon = currentPage?.icon || Home

  return (
    <main className={cn('flex-1 p-8', styles.lightGrayBg)}>
      <section
        className={cn(
          styles.whiteBg,
          'rounded-xl',
          styles.shadow,
          'p-8 h-full'
        )}
        role="main"
        aria-labelledby="page-title"
      >
        <div className="text-center py-20">
          <div
            className={cn(
              'mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4'
            )}
            aria-hidden="true"
          >
            <Icon size={32} className="text-blue-600" />
          </div>

          <h2
            id="page-title"
            className={cn('text-xl font-semibold mb-2', styles.darkText)}
          >
            {currentPage?.label}
          </h2>

          <p className="text-gray-600">선택된 페이지: {currentPath}</p>

          <aside
            className={cn(
              'mt-8 p-4 rounded-lg max-w-md mx-auto',
              styles.lightGrayBg
            )}
            role="complementary"
            aria-labelledby="status-title"
          >
            <h3 id="status-title" className="sr-only">
              시스템 상태
            </h3>
            <p className="text-sm text-gray-700">
              네비게이션이 정상적으로 작동하고 있습니다. <br />
              각 메뉴를 클릭하면 실제 URL이 변경되고 선택 상태가 반영됩니다.
              <br />
              브라우저의 뒤로가기/앞으로가기 버튼도 정상 작동합니다.
            </p>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default MainContent
