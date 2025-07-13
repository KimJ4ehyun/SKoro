import { useState } from 'react'
import { FilterSection, Report } from '../common'
import { QnAChat } from '../qnaChat'
import { useUserInfoStore } from '../../store/useUserInfoStore'

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

const FinalContent: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2025년도')
  const [selectedRating, setSelectedRating] = useState('최종 평가')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null)
  const member = useUserInfoStore((state) => state.role)

  return (
    <main className="flex-1 flex flex-col pb-5 px-10 overflow-hidden">
      <FilterSection
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterType="final"
        setSelectedPeriod={setSelectedPeriod}
      />
      <Report
        selectedYear={selectedYear}
        selectedRating={selectedRating}
        type="final"
        selectedPeriod={selectedPeriod}
      />

      {member === 'MEMBER' && <QnAChat />}
    </main>
  )
}

export default FinalContent
