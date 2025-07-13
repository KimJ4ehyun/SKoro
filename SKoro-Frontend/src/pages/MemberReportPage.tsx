import { useLocation } from 'react-router-dom'
import { Header } from '../components/common'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { MemberReportContent } from '../components/memberReportPage'
import { useEffect, useState } from 'react'

const MemberReportPage: React.FC = () => {
  useDocumentTitle('팀원 분기별 피드백 - SKoro')

  const location = useLocation()
  const member = location.state?.member || memberDummy
  const [selectedPeriod, setSelectedPeriod] = useState(
    location.state?.selectedPeriod || null
  )

  return (
    <div className="flex flex-1 flex-col min-h-0 ">
      <Header
        title={`${member.empName} 님 분기별 레포트`}
        canGoBack={true}
        selectedPeriod={selectedPeriod}
        backUrl="/team"
      />
      <MemberReportContent
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
    </div>
  )
}

export default MemberReportPage

// api 연동 시, 멤버 데이터가 없을 경우에 url의 사번을 통해 정보 가져오도록 수정
const memberDummy = {
  id: 'member1',
  name: '홍길동',
  email: '',
}
