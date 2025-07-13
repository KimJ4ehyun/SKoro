import { useEffect, useState } from 'react'
import { FilterSection } from '../common'
import { MemberList } from '.'
import EmployeesService from '../../services/EmployeesService'
import type { TeamMember } from '../../types/TeamPage.types'

interface Period {
  periodId: number
  year: number
  periodName: string
  unit: 'QUARTER' | string // 다른 단위가 있다면 추가
  orderInYear: number
  startDate: string
  endDate: string
  final: boolean
}

const TeamContent: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2025년도')
  const [selectedRating, setSelectedRating] = useState('최종 평가')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null)
  const [memberList, setMemberList] = useState<TeamMember[]>([])

  useEffect(() => {
    if (selectedPeriod === null) return
    console.log('선택된 평가 기간:', selectedPeriod)
    if (selectedPeriod.final) {
      // [팀장] 팀 관리 화면 - 최종 평가 카드 조회
      EmployeesService.getFinalEmployees(selectedPeriod.periodId)
        .then((finalEmployees) => {
          console.log('최종 평가 카드 조회 성공:', finalEmployees)
          setMemberList(finalEmployees)
        })
        .catch((error) => {
          console.error('최종 평가 카드 조회 실패:', error)
        })
    } else {
      // [팀장] 팀 관리 화면 - 분기 평가 카드 조회
      EmployeesService.getNonFinalEmployees(selectedPeriod.periodId)
        .then((nonFinalEmployees) => {
          console.log('분기 평가 카드 조회 성공:', nonFinalEmployees)
          setMemberList(nonFinalEmployees)
        })
        .catch((error) => {
          console.error('분기 평가 카드 조회 실패:', error)
        })
    }
  }, [selectedPeriod])

  const filteredMembers = memberList.filter(
    (member: any) =>
      member.empName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="flex-1 flex flex-col pb-5 px-10 overflow-hidden">
      <FilterSection
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterType="team"
        setSelectedPeriod={setSelectedPeriod}
      />

      <MemberList
        members={filteredMembers}
        isFinal={selectedPeriod ? selectedPeriod.final : false}
        selectedPeriod={selectedPeriod}
      />
    </main>
  )
}

export default TeamContent
