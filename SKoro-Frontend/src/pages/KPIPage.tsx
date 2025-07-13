import { Header } from '../components/common'
import useDocumentTitle from '../hooks/useDocumentTitle'
import KPIDashboard from '../components/kpiPage/KPIDashboard'
import MemberKPIDashboard from '../components/kpiPage/MemberKPIDashboard'
import { useUserInfoStore } from '../store/useUserInfoStore'

const KPIPage: React.FC = () => {
  useDocumentTitle('KPI - SKoro')
  const userRole = useUserInfoStore((state) => state.role)

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <Header title="SKoro 팀 목표" />
      {userRole === 'MANAGER' ? <KPIDashboard /> : <MemberKPIDashboard />}
    </div>
  )
}

export default KPIPage
