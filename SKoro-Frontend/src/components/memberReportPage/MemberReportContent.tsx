import { FeedbackContent } from '../feedbackPage'
import MemberInfo from './MemberInfo'

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

const MemberReportContent: React.FC<{
  selectedPeriod: Period
  setSelectedPeriod: (period: Period | null) => void
}> = ({ selectedPeriod, setSelectedPeriod }) => {
  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full min-h-0">
      <FeedbackContent
        viewerType="manager"
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
      <MemberInfo />
    </div>
  )
}

export default MemberReportContent
