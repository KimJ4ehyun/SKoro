import { useNavigate } from 'react-router-dom'
import { FolderOpen } from 'lucide-react'
import type { TeamMember, MemberCardProps } from '../../types/TeamPage.types'
import { styles } from '.'
import { Avatar, Button } from '../common'

const MemberCard: React.FC<MemberCardProps> = ({
  member,
  isFinal,
  selectedPeriod,
}) => {
  const navigate = useNavigate()

  const handleViewReport = () => {
    navigate(`/team/${member.empNo}`, {
      state: { member, selectedPeriod },
    })
  }
  console.log('member', member)

  return (
    <article
      className={`${styles.card} p-6 shadow-md relative w-full min-w-0 whitespace-nowrap`}
    >
      <Badge rank={member.ranking} className="absolute top-4 right-4" />

      <div className="flex items-end gap-4 mb-4">
        <Avatar size="md" avatar="👤" />
        <div>
          <h3 className={`text-xl ${styles.textSemibold}`}>{member.empName}</h3>
          <p className={`${styles.textSmall} mt-1`}>{member.position}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className={`${styles.flexBetween} mb-2`}>
          <span className={`${styles.textSmall} font-semibold`}>
            {isFinal ? '최종' : '누적'} 달성률
          </span>
          <span className={`${styles.textSmall} font-bold`}>
            {member.aiAnnualAchievementRate || member.aiAchievementRate}%
          </span>
        </div>
        <ProgressBar
          percentage={
            member.aiAnnualAchievementRate || member.aiAchievementRate || 100
          }
        />
      </div>

      <div className="flex items-stretch justify-between">
        <StatusInfo member={member} isFinal={isFinal} />
        <Button
          variant="primary"
          className="flex flex-col items-center gap-1 justify-center px-4 py-2"
          onClick={handleViewReport}
        >
          <FolderOpen className="w-5 h-5" />
          <span className={`${styles.textSmall} mt-0.5`}>레포트 보기</span>
        </Button>
      </div>
    </article>
  )
}

export default MemberCard

const Badge: React.FC<{ rank: number; className?: string }> = ({
  rank,
  className = '',
}) => (
  <div
    className={`px-3 h-7 rounded-full bg-[#FFF6DD] ${styles.flexCenter} ${styles.textSmall} ${styles.textSemibold} text-[#F0B100] ${className}`}
  >
    {rank}등
  </div>
)

const ProgressBar: React.FC<{ percentage: number; className?: string }> = ({
  percentage,
  className = '',
}) => (
  <div className={`w-full bg-gray-200 rounded-full h-3 ${className}`}>
    <div
      className="bg-blue-500 h-3 rounded-full transition-all duration-300"
      style={{ width: `${percentage > 100 ? 100 : percentage}%` }}
    />
  </div>
)

const StatusInfo: React.FC<{ member: TeamMember; isFinal: boolean }> = ({
  member,
  isFinal,
}) => {
  const getStatusColor = (status: number) => {
    if (status >= 67) return 'text-blue-600'
    if (status >= 34) return 'text-green-600'
    if (status >= 0) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="bg-gray-100 rounded-lg py-3 px-4 flex-1 mr-3 flex items-center">
      <div className="space-y-2 w-full">
        <div className={styles.flexBetween}>
          <span className={`${styles.textSmall} mr-2`}>기여도</span>
          <span
            className={`${styles.textSemibold} ${
              styles.textSmall
            } ${getStatusColor(member.contributionRate)}`}
          >
            {member.contributionRate}
          </span>
        </div>
        <div className={styles.flexBetween}>
          <span className={`${styles.textSmall} mr-2`}>
            {isFinal ? '최종 점수' : '태도'}
          </span>
          <span className={`${styles.textSmall} ${styles.textSemibold}`}>
            {isFinal ? member.score : member.attitude}
            {isFinal ? '점' : ''}
          </span>
        </div>
      </div>
    </div>
  )
}
