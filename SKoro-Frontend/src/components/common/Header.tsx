import type { HeaderProps, Period } from '../../types/TeamPage.types'
import { styles, Avatar } from '.'
import { ChevronLeft } from 'lucide-react'
import { useUserInfoStore } from '../../store/useUserInfoStore'
import { useNavigate } from 'react-router-dom'

const Header: React.FC<HeaderProps> = ({
  title,
  canGoBack,
  selectedPeriod,
  backUrl = '/',
}) => {
  const currentUser = useUserInfoStore((state) => state)

  return (
    <header className={`${styles.flexBetween} py-6 px-10 pt-8`}>
      <div className="flex items-center gap-4">
        {canGoBack ? (
          selectedPeriod ? (
            <BackButton selectedPeriod={selectedPeriod} backUrl={backUrl} />
          ) : (
            <BackButton backUrl={backUrl} />
          )
        ) : null}
        <h1 className={`text-2xl ${styles.textSemibold}`}>{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Avatar size="sm" avatar="👤" className="bg-[#E3E3E3] text-white" />
        <div className="text-left">
          <div className={styles.textSemibold}>{currentUser.empName}</div>
          <div className={styles.textSmall}>
            {currentUser.teamName} {currentUser.position}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

const BackButton: React.FC<{ selectedPeriod?: Period; backUrl?: string }> = ({
  selectedPeriod,
  backUrl = '/',
}) => {
  const navigate = useNavigate()
  const handleGoBack = () => {
    if (selectedPeriod) {
      navigate(backUrl, {
        state: { selectedPeriod },
      })
    } else {
      navigate(-1)
    }
  }

  return (
    <button
      onClick={handleGoBack}
      className="
        w-10 h-10 
        bg-white 
        rounded-full 
        shadow-md 
        flex items-center justify-center
        transition-all duration-200 ease-in-out
        hover:shadow-lg hover:scale-105 hover:bg-gray-50
        active:scale-95 active:shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      "
      aria-label="이전 페이지로 이동"
    >
      <ChevronLeft
        size={24}
        className="text-gray-700 transition-colors duration-200 hover:text-gray-900"
      />
    </button>
  )
}
