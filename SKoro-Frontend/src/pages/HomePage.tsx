import { useEffect } from 'react'
import { Header } from '../components/common'
import { Dashboard } from '../components/homePage'
import { MemberInfo } from '../components/memberReportPage'
import useDocumentTitle from '../hooks/useDocumentTitle'
import EmployeesService from '../services/EmployeesService'
import { useState } from 'react'

const HomePage: React.FC = () => {
  const [employees, setEmployees] = useState([])
  useDocumentTitle('홈 화면 - SKoro')

  useEffect(() => {
    // 팀원 리스트 조회 (이름, 사진)
    EmployeesService.getEmployees()
      .then((employees) => {
        console.log('팀원 리스트 조회 성공:', employees)
        setEmployees(employees)
      })
      .catch((error) => {
        console.error('팀원 리스트 조회 실패:', error)
      })
  }, [])

  return (
    <div className="flex flex-1 flex-col min-h-0 min-w-0">
      <Header title="홈 화면" />
      <div className="lg:flex-row flex-col flex-1 flex pb-5 px-10 lg:pr-0 min-h-0 mt-[-1rem] gap-5">
        <Dashboard employees={employees} />
        <MemberInfo pageType="home" />
      </div>
    </div>
  )
}

export default HomePage
