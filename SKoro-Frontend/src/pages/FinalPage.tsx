import { Header } from '../components/common'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { FinalContent } from '../components/finalPage'

const FinalPage: React.FC = () => {
  useDocumentTitle('분기별 피드백 - SKoro')

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <Header title="최종 평가 레포트" />
      <FinalContent />
    </div>
  )
}

export default FinalPage
