import { Header } from '../components/common'
import useDocumentTitle from '../hooks/useDocumentTitle'
import PeerEvaluationContent from '../components/peerEvaluation/PeerEvaluationContent'
import { TeamList } from '../components/evaluationPage'
import { useEffect, useState } from 'react'
import EvaluationService from '../services/EvaluationService'
import { CheckCircle } from 'lucide-react'

const PeerEvaluationPage: React.FC = () => {
  useDocumentTitle('동료 평가 시스템 - SKoro')

  const [periodId, setPeriodId] = useState<number>(0)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)

  useEffect(() => {
    // 해당 기간에 활성화된 팀 평가 완료 여부 조회 (버튼 활성화)
    EvaluationService.getTeamEvaluationStatus()
      .then((status) => {
        console.log('최종 평가 완료 여부 조회 성공:', status)
        const peerEvaluationStatus = status.find(
          (item: any) =>
            item.status === 'IN_PROGRESS' &&
            item.periodPhase === 'PEER_EVALUATION'
        )
        if (peerEvaluationStatus) {
          console.log('동료 평가 상태:', peerEvaluationStatus)
          setPeriodId(peerEvaluationStatus.periodId)
        } else {
          console.warn('동료 평가가 활성화된 기간이 없습니다.')
        }
      })
      .catch((error) => {
        console.error('최종 평가 완료 여부 조회 실패:', error)
      })
  }, [])

  useEffect(() => {
    if (periodId) {
      EvaluationService.isPeerEvaluationCompleted(periodId)
        .then((status) => {
          console.log('동료 평가 완료 상태 조회 성공:', status)
          setIsCompleted(status)
        })
        .catch((error) => {
          console.error('동료 평가 완료 상태 조회 실패:', error)
        })
    }
  }, [periodId])

  return (
    <>
      {isCompleted ? (
        <PeerEvaluationComplete />
      ) : (
        <div className="flex flex-1 flex-col min-h-0">
          <Header title="동료 평가 시스템" />
          <FinalEvaluationContent periodId={periodId} />
        </div>
      )}
    </>
  )
}

export default PeerEvaluationPage

const FinalEvaluationContent: React.FC<{ periodId: number }> = ({
  periodId,
}) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <TeamList
        periodId={periodId}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
      />

      <main className="flex-1 flex flex-col pb-5 px-10 min-h-0 min-h-[fit-content] lg:min-h-[auto]">
        <PeerEvaluationContent
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
        />
      </main>
    </div>
  )
}

const PeerEvaluationComplete: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4"
      style={{ backgroundColor: '#E8F2FF' }}
    >
      <div className="max-w-lg mx-auto text-center">
        {/* 완료 아이콘 */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* 완료 메시지 */}
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 px-16 shadow-lg border border-white/20">
          <h1 className="text-2xl font-semibold mb-4">
            동료 평가가 완료되었습니다
          </h1>

          <p className="text-sm leading-relaxed">
            모든 팀원의 평가가 성공적으로 완료되었습니다.
            <br />
            소중한 시간을 내어 평가에 참여해 주셔서 감사합니다.
          </p>
        </div>

        {/* 안내 메시지 */}
        <div className="mt-6 text-xs text-gray-500">
          <p>
            평가 결과는 추후에 이메일로 안내드릴 예정입니다.
            <br />
            추가적인 문의사항이 있으시면 언제든지 연락해 주세요.
          </p>
        </div>
      </div>
    </div>
  )
}
