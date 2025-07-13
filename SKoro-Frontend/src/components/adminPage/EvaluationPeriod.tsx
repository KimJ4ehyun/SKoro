import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { CalendarComponent } from '.'

const EvaluationPeriod: React.FC<{
  startDate: Date
  setStartDate: (date: Date) => void
  endDate: Date
  setEndDate: (date: Date) => void
}> = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)

  const toggleStart = () => {
    setShowStartCalendar((prev) => !prev)
    setShowEndCalendar(false)
  }

  const toggleEnd = () => {
    setShowEndCalendar((prev) => !prev)
    setShowStartCalendar(false)
  }

  return (
    <div className="p-6 pb-3">
      <h2 className="text-lg font-semibold mb-4">평가 시기 날짜 선택</h2>
      <div className="flex items-center space-x-4">
        <DateSelector
          type="start"
          selectedDate={startDate}
          showCalendar={showStartCalendar}
          onToggle={toggleStart}
          onDateSelect={setStartDate}
          onClose={() => setShowStartCalendar(false)}
          label="시작 날짜"
        />
        <span className="text-gray-500 font-medium">TO</span>
        <DateSelector
          type="end"
          selectedDate={endDate}
          showCalendar={showEndCalendar}
          onToggle={toggleEnd}
          onDateSelect={setEndDate}
          onClose={() => setShowEndCalendar(false)}
          label="종료 날짜"
        />
      </div>
    </div>
  )
}

export default EvaluationPeriod

const formatDate = (date: Date): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return '날짜를 선택하세요'
  }
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}.${String(date.getDate()).padStart(2, '0')}`
}

const DateSelector: React.FC<{
  label: string
  selectedDate: Date
  showCalendar: boolean
  onToggle: () => void
  onDateSelect: (date: Date) => void
  onClose: () => void
  type: 'start' | 'end'
}> = ({
  selectedDate,
  showCalendar,
  onToggle,
  onDateSelect,
  onClose,
  type,
}) => (
  <div className="flex-1 relative">
    <div
      onClick={onToggle}
      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-center cursor-pointer flex items-center justify-center space-x-2 hover:bg-gray-50"
    >
      <Calendar className="w-4 h-4 text-gray-500" />
      <span>{formatDate(selectedDate)}</span>
    </div>
    {showCalendar && (
      <CalendarComponent
        type={type}
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
        onClose={onClose}
      />
    )}
  </div>
)
