import { useParams } from 'react-router-dom'
import { PeerEvaluation, PeerInfo } from '.'
import { useEffect, useState } from 'react'
import PeerEvaluationService from '../../services/PeerEvaluation'

interface TeamMember {
  name: string
  company: string
  role: string
  email: string
  project: string
  projectPeriod: string
  avatar: string
}

const PeerEvaluationContent: React.FC<{
  isSubmitted: boolean
  setIsSubmitted: (isSubmitted: boolean) => void
}> = ({ isSubmitted, setIsSubmitted }) => {
  const { id } = useParams<{ id: string }>()
  const [teamMember, setTeamMember] = useState<any>({})
  useEffect(() => {
    if (id) {
      PeerEvaluationService.getPeerEvaluationDetail(Number(id))
        .then((peerEvaluationDetail) => {
          console.log('동료 평가 상세 조회 성공:', peerEvaluationDetail)
          setTeamMember(peerEvaluationDetail)
        })
        .catch((error) => {
          console.error('동료 평가 상세 조회 실패:', error)
        })
    }
  }, [id])

  return (
    <div className="flex gap-6 h-full">
      <PeerInfo teamMember={teamMember} />
      <PeerEvaluation
        peerEvaluationId={Number(id)}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
      />
    </div>
  )
}

export default PeerEvaluationContent
