import { useState } from 'react'
import {
  EvaluationName,
  EvaluationPeriod,
  EvaluationSchedule,
  EvaluationType,
} from '.'

const AdminContent: React.FC = () => {
  const [evaluationName, setEvaluationName] = useState('')
  const [startDate, setStartDate] = useState<Date>(() => new Date(2025, 5, 21))
  const [endDate, setEndDate] = useState<Date>(() => new Date(2025, 5, 29))
  const [evaluationType, setEvaluationType] = useState('comprehensive')
  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)

  return (
    <div className="flex-1 w-full px-10 flex flex-col">
      <h1 className="font-semibold mb-2">평가 시기 관리</h1>

      <div className="flex-1 mb-5 rounded-lg bg-white shadow-lg grid grid-cols-1 lg:grid-cols-2">
        {/* 평가 이름 작성 */}
        <EvaluationName
          evaluationName={evaluationName}
          setEvaluationName={setEvaluationName}
        />

        {/* 평가 시기 날짜 선택 */}
        <EvaluationPeriod
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        {/* 평가 유형 선택 */}
        <EvaluationType
          evaluationType={evaluationType}
          setEvaluationType={setEvaluationType}
        />

        {/* 평가 일정 */}
        <EvaluationSchedule startDate={startDate} endDate={endDate} />
      </div>

      {/* 클릭 영역 외부 클릭 감지 */}
      {(showStartCalendar || showEndCalendar) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowStartCalendar(false)
            setShowEndCalendar(false)
          }}
        />
      )}
    </div>
  )
}

export default AdminContent
