import { useState } from 'react'
import {
  Calendar,
  Evaluations,
  Performance,
  Tasks,
  TeamList,
  ContributionsChart,
} from '.'
import { useUserInfoStore } from '../../store/useUserInfoStore'

interface DashboardProps {
  employees?: any[]
}

const Dashboard: React.FC<DashboardProps> = ({ employees }) => {
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false)
  const userRole = useUserInfoStore((state) => state.role)

  const handleToggleCalendar = () => {
    setIsCalendarExpanded(!isCalendarExpanded)
  }

  return (
    <div className="flex-1 min-w-0 h-full flex flex-col">
      <TeamList employees={employees} />

      <div className="flex-1 min-h-0 flex gap-5">
        {/* 캘린더가 확대된 상태가 아닐 때만 왼쪽 컴포넌트들 표시 */}
        <div className="flex-1">
          <Tasks />
          {userRole === 'MANAGER' ? <Evaluations /> : <ContributionsChart />}
        </div>

        <div
          className={`flex flex-col ${
            isCalendarExpanded ? 'flex-1' : 'lg:w-96'
          }`}
        >
          <Calendar
            isExpanded={isCalendarExpanded}
            onToggleExpand={handleToggleCalendar}
          />
          {/* Performance 컴포넌트는 캘린더가 확대되지 않은 상태에서만 표시 */}
          {!isCalendarExpanded && <Performance />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
