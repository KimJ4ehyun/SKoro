import { useEffect, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  List,
  Minimize2,
  X,
  CalendarFold,
  ListCheck,
} from 'lucide-react'
import EvaluationService from '../../services/EvaluationService'

interface Period {
  periodId: number
  year: number
  periodName: string
  unit: string
  orderInYear: number
  startDate: string
  endDate: string
  final: boolean
}

interface ExtendedPeriod extends Period {
  isExtended?: boolean
  originalPeriodId?: number
  extendedType?: 'peer-evaluation' | 'objection'
}

interface CalendarProps {
  isExpanded?: boolean
  onToggleExpand?: () => void
}

const Calendar: React.FC<CalendarProps> = ({
  isExpanded = false,
  onToggleExpand,
}) => {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  })
  const [periods, setPeriods] = useState<ExtendedPeriod[]>([])
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')

  const colors: { [key: string]: string } = {
    '1': '#3B82F6',
    '2': '#EF4444',
    '3': '#10B981',
    '4': '#F59E0B',
  }

  const extendedColors: { [key: string]: string } = {
    'peer-evaluation': '#8B5CF6',
    objection: '#F97316',
  }

  const getQuarterColor = (orderInYear: string) => {
    return colors[orderInYear] || '#6B7280'
  }

  const getExtendedColor = (type: string) => {
    return extendedColors[type] || '#6B7280'
  }

  // 날짜 계산 유틸리티 함수
  const addDays = (dateString: string, days: number): string => {
    const date = new Date(dateString)
    date.setDate(date.getDate() + days)
    return date.toISOString().split('T')[0]
  }

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  // 확장된 기간 생성 함수
  const generateExtendedPeriods = (
    originalPeriods: Period[]
  ): ExtendedPeriod[] => {
    const extendedPeriods: ExtendedPeriod[] = [...originalPeriods]

    originalPeriods.forEach((period) => {
      const startDate = new Date(period.startDate)
      const endDate = new Date(period.endDate)
      const isSameDate = startDate.getTime() === endDate.getTime()

      // 동료 평가 기간 추가
      const peerEvaluationStart = addDays(period.startDate, -7)
      const peerEvaluationEnd = addDays(period.startDate, -1)

      extendedPeriods.push({
        ...period,
        periodId: period.periodId * 1000 + 1,
        periodName: period.periodName + ' 동료 평가',
        startDate: peerEvaluationStart,
        endDate: peerEvaluationEnd,
        isExtended: true,
        originalPeriodId: period.periodId,
        extendedType: 'peer-evaluation',
      })

      // 이의제기 기간 추가 (startDate와 endDate가 다른 경우에만)
      if (!isSameDate) {
        const objectionStart = addDays(period.endDate, 1)
        const objectionEnd = addDays(period.endDate, 7)

        extendedPeriods.push({
          ...period,
          periodId: period.periodId * 1000 + 2,
          periodName: period.periodName + ' 이의제기',
          startDate: objectionStart,
          endDate: objectionEnd,
          isExtended: true,
          originalPeriodId: period.periodId,
          extendedType: 'objection',
        })
      }
    })

    return extendedPeriods
  }

  useEffect(() => {
    EvaluationService.getPeriods()
      .then((data: Period[]) => {
        const extendedPeriods = generateExtendedPeriods(data)
        setPeriods(extendedPeriods)
      })
      .catch((error) => {
        console.error('평가 기간 조회 실패:', error)
        // 에러 발생 시 샘플 데이터 사용
        const extendedPeriods = generateExtendedPeriods([])
        setPeriods(extendedPeriods)
      })
  }, [])

  const changeMonth = (direction: number) => {
    setCurrentMonth((prev) => {
      let newMonth = prev.month + direction
      let newYear = prev.year

      if (newMonth > 12) {
        newMonth = 1
        newYear += 1
      } else if (newMonth < 1) {
        newMonth = 12
        newYear -= 1
      }

      return { year: newYear, month: newMonth }
    })
  }

  // 현재 월의 일정 가져오기
  const getCurrentMonthEvents = () => {
    return periods
      .filter((period) => {
        const eventStart = new Date(period.startDate)
        const eventEnd = new Date(period.endDate)
        const monthStart = new Date(
          currentMonth.year,
          currentMonth.month - 1,
          1
        )
        const monthEnd = new Date(currentMonth.year, currentMonth.month, 0)

        return (
          (eventStart >= monthStart && eventStart <= monthEnd) ||
          (eventEnd >= monthStart && eventEnd <= monthEnd) ||
          (eventStart <= monthStart && eventEnd >= monthEnd)
        )
      })
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      )
  }

  const generateCalendar = () => {
    const daysInMonth = new Date(
      currentMonth.year,
      currentMonth.month,
      0
    ).getDate()
    const firstDay = new Date(
      currentMonth.year,
      currentMonth.month - 1,
      1
    ).getDay()
    const prevMonthDays = new Date(
      currentMonth.year,
      currentMonth.month - 1,
      0
    ).getDate()
    const days = []

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isPrevMonth: true,
        date: new Date(
          currentMonth.year,
          currentMonth.month - 2,
          prevMonthDays - i
        ),
      })
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(currentMonth.year, currentMonth.month - 1, day),
      })
    }

    const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7
    const remainingCells = totalCells - (daysInMonth + firstDay)
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        day,
        isNextMonth: true,
        date: new Date(currentMonth.year, currentMonth.month, day),
      })
    }

    return days
  }

  const getEventsForDate = (date: Date) => {
    return periods.filter((period: ExtendedPeriod) => {
      const eventStart = new Date(period.startDate)
      const eventEnd = new Date(period.endDate)
      const checkDate = new Date(date)

      eventStart.setHours(0, 0, 0, 0)
      eventEnd.setHours(23, 59, 59, 999)
      checkDate.setHours(12, 0, 0, 0)

      return checkDate >= eventStart && checkDate <= eventEnd
    })
  }

  const getEventPosition = (period: ExtendedPeriod, date: Date) => {
    const eventStart = new Date(period.startDate)
    const eventEnd = new Date(period.endDate)
    const checkDate = new Date(date)

    eventStart.setHours(0, 0, 0, 0)
    eventEnd.setHours(0, 0, 0, 0)
    checkDate.setHours(0, 0, 0, 0)

    const isStart = eventStart.getTime() === checkDate.getTime()
    const isEnd = eventEnd.getTime() === checkDate.getTime()
    const isMiddle = checkDate > eventStart && checkDate < eventEnd

    return { isStart, isEnd, isMiddle }
  }

  const getEventColor = (period: ExtendedPeriod) => {
    if (period.isExtended && period.extendedType) {
      return getExtendedColor(period.extendedType)
    }
    return getQuarterColor('1')
  }

  const handleToggleView = () => {
    if (isExpanded) {
      setViewMode(viewMode === 'list' ? 'calendar' : 'list')
    } else {
      setViewMode('calendar') // 확대 시 바로 달력 모드로 설정
      onToggleExpand?.()
    }
  }

  const handleClose = () => {
    setViewMode('list')
    onToggleExpand?.()
  }

  // 축소된 뷰 (일정 텍스트 목록)
  const CompactView = () => {
    const currentEvents = getCurrentMonthEvents()

    return (
      <div className="h-1/2 pb-2 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">성과평가 일정</h2>
          <div className="flex items-center space-x-2">
            <button onClick={() => changeMonth(-1)}>
              <ChevronLeft className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
            </button>
            <span className="font-medium text-gray-700 text-sm min-w-[80px] text-center">
              {currentMonth.year}.{String(currentMonth.month).padStart(2, '0')}
            </span>
            <button onClick={() => changeMonth(1)}>
              <ChevronRight className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
            </button>
            <button
              onClick={handleToggleView}
              className="ml-2 p-1 hover:bg-gray-100 rounded"
              title="캘린더 확대 보기"
            >
              <CalendarFold className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 p-3 overflow-y-auto">
          {currentEvents.length === 0 ? (
            <div className="text-gray-500 text-sm text-center py-4">
              이번 달 일정이 없습니다.
            </div>
          ) : (
            <div className="space-y-2">
              {currentEvents.map((event) => (
                <div
                  key={event.periodId}
                  className="flex items-center space-x-3 py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: getEventColor(event) }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {event.periodName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {event.startDate === event.endDate
                        ? formatDate(event.startDate)
                        : `${formatDate(event.startDate)} - ${formatDate(
                            event.endDate
                          )}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // 확대된 뷰 (캘린더)
  const ExpandedView = () => (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">성과평가 일정</h2>
        <div className="flex items-center space-x-2">
          <button onClick={() => changeMonth(-1)}>
            <ChevronLeft className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
          </button>
          <span className="font-medium text-gray-700 text-sm min-w-[80px] text-center">
            {currentMonth.year}.{String(currentMonth.month).padStart(2, '0')}
          </span>
          <button onClick={() => changeMonth(1)}>
            <ChevronRight className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
          </button>
          <button
            onClick={handleClose}
            className="ml-2 p-1 hover:bg-gray-100 rounded"
            title="캘린더 축소 보기"
          >
            <List className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* 범례 */}
      <div className="mb-4 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>평가 기간</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-purple-500 rounded"></div>
          <span>동료 평가</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span>이의제기</span>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 p-4 pt-2 flex flex-col h-full min-h-[18rem]">
        <div className="grid grid-cols-7 gap-1 mb-2 flex-shrink-0">
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-600 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 flex-1 auto-rows-fr">
          {generateCalendar().map((dayObj, index) => {
            const events = getEventsForDate(dayObj.date)
            const isToday =
              dayObj.isCurrentMonth &&
              dayObj.day === new Date().getDate() &&
              currentMonth.month === new Date().getMonth() + 1 &&
              currentMonth.year === new Date().getFullYear()

            return (
              <div
                key={index}
                className="relative flex flex-col justify-start items-center p-1 border border-gray-100 min-h-0"
              >
                <div
                  className={`text-sm font-medium mb-1 flex-shrink-0 ${
                    dayObj.isCurrentMonth
                      ? isToday
                        ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center'
                        : 'text-gray-900'
                      : 'text-gray-300'
                  }`}
                >
                  {dayObj.day}
                </div>

                <div className="w-full space-y-0.5 flex-1 flex flex-col justify-start overflow-hidden">
                  {events.slice(0, 3).map((period: ExtendedPeriod) => {
                    const position = getEventPosition(period, dayObj.date)
                    const color = getEventColor(period)

                    return (
                      <div
                        key={period.periodId}
                        className="relative flex-shrink-0"
                      >
                        <div
                          className={`h-1 ${
                            position.isStart && position.isEnd
                              ? 'rounded-full'
                              : position.isStart
                              ? 'rounded-l-full'
                              : position.isEnd
                              ? 'rounded-r-full'
                              : ''
                          }`}
                          style={{ backgroundColor: color }}
                        />
                        {position.isStart && (
                          <div
                            className="absolute top-0 left-0 text-xs font-medium text-white px-1 whitespace-nowrap overflow-hidden z-10"
                            style={{
                              backgroundColor: color,
                              borderRadius: '0.25rem',
                              fontSize: '0.5rem',
                              lineHeight: '0.75rem',
                              maxWidth: '80px',
                            }}
                            title={period.periodName}
                          >
                            {period.periodName}
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {events.length > 3 && (
                    <div className="text-xs text-gray-500 flex-shrink-0">
                      +{events.length - 3}개
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  // 확대된 상태에서는 전체 높이를 차지하는 뷰를 반환
  if (isExpanded) {
    return viewMode === 'list' ? <CompactView /> : <ExpandedView />
  }

  // 기본 상태에서는 축소된 뷰를 반환
  return <CompactView />
}

export default Calendar
