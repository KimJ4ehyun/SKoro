import { useEffect, useState } from 'react'
import { FilterSection, Report } from '../common'
import { useLocation } from 'react-router-dom'

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

const FeedbackContent: React.FC<{
  isNotFilter?: boolean
  selectedPeriod: Period | null
  setSelectedPeriod: (period: Period | null) => void
  viewerType?: 'manager' | ''
}> = ({ viewerType, isNotFilter, selectedPeriod, setSelectedPeriod }) => {
  const [selectedYear, setSelectedYear] = useState('2025년도')
  const [selectedRating, setSelectedRating] = useState('최종 평가')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <main className="flex-1 flex flex-col pb-5 px-10 min-h-0 min-h-[fit-content] lg:min-h-0 ">
      {isNotFilter ? null : (
        <FilterSection
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterType="feedback"
          setSelectedPeriod={setSelectedPeriod}
        />
      )}
      <Report
        viewerType={viewerType || ''}
        selectedYear={selectedYear}
        selectedRating={selectedRating}
        type="feedback"
        selectedPeriod={selectedPeriod}
      />
    </main>
  )
}

export default FeedbackContent
