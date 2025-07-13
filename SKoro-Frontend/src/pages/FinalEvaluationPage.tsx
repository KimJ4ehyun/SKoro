import { Header } from '../components/common'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { FinalEvaluationContent } from '../components/evaluationPage'
import { useEffect, useState } from 'react'
import EvaluationService from '../services/EvaluationService'
import ReportService from '../services/ReportService'
import { useUserInfoStore } from '../store/useUserInfoStore'

const FinalEvaluationPage: React.FC = () => {
  useDocumentTitle('최종 평가 시스템 - SKoro')

  const [periodId, setPeriodId] = useState<number>(0)
  const [teamEvaluationId, setTeamEvaluationId] = useState<number>(0)
  const userRole = useUserInfoStore((state) => state.role)
  const [evaluationReasons, setEvaluationReasons] = useState<any[]>([])
  const [finalEvaluationStatus, setFinalEvaluationStatus] = useState<any>(null)

  useEffect(() => {
    // 해당 기간에 활성화된 팀 평가 완료 여부 조회 (버튼 활성화)
    EvaluationService.getTeamEvaluationStatus()
      .then((status) => {
        console.log('최종 평가 완료 여부 조회 성공??:', status)
        const finalEvaluationStatus = status.find(
          (item: any) => item.periodPhase == 'MANAGER_EVALUATION'
        )
        console.log('최종 평가 상태:', finalEvaluationStatus)
        if (finalEvaluationStatus) {
          console.log('최종 평가 상태:', finalEvaluationStatus)
          setPeriodId(finalEvaluationStatus.periodId)
          setTeamEvaluationId(finalEvaluationStatus.teamEvaluationId)
        } else {
          console.warn('최종 평가가 활성화된 기간이 없습니다.')
          setPeriodId(0)
        }
      })
      .catch((error) => {
        console.error('최종 평가 완료 여부 조회 실패:', error)
      })
  }, [])

  useEffect(() => {
    if (finalEvaluationStatus) {
      console.log('최종 평가 상태:', finalEvaluationStatus)
      setPeriodId(finalEvaluationStatus.periodId)
      setTeamEvaluationId(finalEvaluationStatus.teamEvaluationId)
    } else {
      console.warn('최종 평가가 활성화된 기간이 없습니다.')
      setPeriodId(0)
    }
  }, [finalEvaluationStatus])

  useEffect(() => {
    if (periodId > 0 && userRole === 'MANAGER') {
      // [팀장] 해당 기간의 팀 평가 레포트 조회
      ReportService.getTeamEvaluationReport(periodId)
        .then((report) => {
          console.log('최종 평가 레포트 조회 성공:', report)
        })
        .catch((error) => {
          console.error('최종 평가 레포트 조회 실패:', error)
        })
    }
  }, [periodId])

  useEffect(() => {
    if (teamEvaluationId > 0 && userRole === 'MANAGER') {
      // [팀장] 최종 평가 사유 조회
      EvaluationService.getTempEvaluation(teamEvaluationId)
        .then((reasons) => {
          console.log('최종 평가 사유 조회 성공:', reasons)
          setEvaluationReasons(reasons)
        })
        .catch((error) => {
          console.error('최종 평가 사유 조회 실패:', error)
        })
    }
  }, [teamEvaluationId])

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <Header title="최종 평가 시스템" />
      <FinalEvaluationContent
        teamEvaluationId={teamEvaluationId}
        periodId={periodId}
        evaluationReasons={evaluationReasons}
      />
    </div>
  )
}

export default FinalEvaluationPage
