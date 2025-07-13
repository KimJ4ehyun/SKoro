import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const CalendarComponent: React.FC<{
  selectedDate: Date
  onDateSelect: (date: Date) => void
  onClose: () => void
  type: 'start' | 'end'
}> = ({ selectedDate, onDateSelect, onClose, type }) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (
      selectedDate &&
      selectedDate instanceof Date &&
      !isNaN(selectedDate.getTime())
    ) {
      return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
    }
    return new Date()
  })

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      )
      const isSelected =
        selectedDate &&
        selectedDate instanceof Date &&
        !isNaN(selectedDate.getTime()) &&
        date.toDateString() === selectedDate.toDateString()
      const isToday = date.toDateString() === new Date().toDateString()

      days.push(
        <button
          key={day}
          onClick={() => {
            onDateSelect(date)
            onClose()
          }}
          className={`h-10 w-10 rounded-lg flex items-center justify-center text-sm transition-colors ${
            isSelected
              ? 'bg-blue-500 text-white'
              : isToday
              ? 'bg-blue-100 text-blue-600'
              : 'hover:bg-gray-100'
          }`}
        >
          {day}
        </button>
      )
    }

    return days
  }

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    )
  }

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    )
  }

  return (
    <div
      className={`absolute top-full ${
        type === 'start' ? 'left-0' : 'right-0'
      } mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-80`}
    >
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="font-semibold text-gray-800">
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </h3>
        <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
    </div>
  )
}

export default CalendarComponent
