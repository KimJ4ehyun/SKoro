import { Avatar } from '../common'
import { feedbackTeamMembers } from '../../dummy/teamMembers'
import { useEffect, useRef } from 'react'
import { useState } from 'react'

interface TeamMemberWithEvaluation {
  id: number
  empName: string
  avatar: string
  isEvaluated: boolean // 평가 완료 여부
}

const TeamList: React.FC<{
  employees?: any[]
}> = ({ employees }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const SCROLL_POSITION_KEY = 'teamlist-scroll-position'

  const [enhancedTeamMembers, setEnhancedTeamMembers] = useState<
    TeamMemberWithEvaluation[]
  >(() => {
    return (employees || feedbackTeamMembers).map((member, index) => ({
      ...member,
      isEvaluated: index % 3 === 0, // 3명 중 1명씩 평가 완료로 임시 설정
    }))
  })

  useEffect(() => {
    if (employees) {
      setEnhancedTeamMembers(
        employees.map((member, index) => ({
          ...member,
          isEvaluated: index % 3 === 0, // 3명 중 1명씩 평가 완료로 임시 설정
        }))
      )
    }
  }, [employees])

  // 컴포넌트 마운트 시 저장된 스크롤 위치 복원
  useEffect(() => {
    const savedPosition = sessionStorage.getItem(SCROLL_POSITION_KEY)
    if (savedPosition && scrollContainerRef.current) {
      // 약간의 지연을 두어 DOM이 완전히 렌더링된 후 스크롤 위치 설정
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = parseInt(savedPosition, 10)
        }
      }, 0)
    }
  }, [])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // 스크롤 위치 저장
    sessionStorage.setItem(
      SCROLL_POSITION_KEY,
      e.currentTarget.scrollLeft.toString()
    )
  }

  return (
    <section className="mb-5">
      <h2 className="font-semibold mb-2">SKoro 팀 팀원</h2>
      <section className="relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200">
        {/* 팀원 리스트 */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto px-5 py-4 space-x-7 scrollbar-hide"
        >
          {enhancedTeamMembers.map((member) => {
            return (
              <button
                onClick={() => console.log(member.id)}
                key={member.id}
                className={`flex flex-col items-center min-w-16 max-w-16 truncate transition-opacity duration-200`}
              >
                <span className="text-2xl relative">
                  <Avatar avatar={member.avatar || '👤'} size="md" />
                </span>
                <span className="mt-2 text-xs font-semibold">
                  {member.empName}
                </span>
              </button>
            )
          })}
        </div>
      </section>
    </section>
  )
}

export default TeamList
