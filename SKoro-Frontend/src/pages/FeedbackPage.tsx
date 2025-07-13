import { Header } from '../components/common'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { FeedbackContent } from '../components/feedbackPage'
import { useState } from 'react'
import type { Period } from '../types/TeamPage.types'

const FeedbackPage: React.FC = () => {
  useDocumentTitle('분기별 피드백 - SKoro')
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null)

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <Header title="분기별 피드백 레포트" />
      <FeedbackContent
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
    </div>
  )
}

export default FeedbackPage
