import { useEffect, useState } from 'react'
import { Edit2, X } from 'lucide-react'
import EvaluationService from '../../services/EvaluationService'
import { useLocation, useNavigate } from 'react-router-dom'

const ScoreEvaluation: React.FC<{
  memberEmpNo?: string
  tempEvaluations: any[]
  setIsSubmitted: (isSubmitted: boolean) => void
  isValidFinalSubmit?: boolean
}> = ({ memberEmpNo, tempEvaluations, setIsSubmitted, isValidFinalSubmit }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const member = location.state?.member

  const teamEvaluationId = location.state?.teamEvaluationId || null
  const periodId = location.state?.periodId || 0

  const [recommendEvaluation, setRecommendEvaluation] = useState<any>(null)
  const getEvaluationReasons = location.state.getEvaluationReasons || {}

  useEffect(() => {
    setRecommendEvaluation(
      getEvaluationReasons?.find(
        (reason: any) => reason.empNo === member.empNo
      ) || {
        empNo: member.empNo,
        score: 0,
        comment: '',
        reason: '',
      }
    )
  }, [member, getEvaluationReasons])

  useEffect(() => {
    setFinalComment(recommendEvaluation?.comment || '')
    setEditReason('')
    setFinalScore(recommendEvaluation?.score || 0)
    setEditScore(recommendEvaluation?.score || 0)
    setOriginalEvaluation({
      score: recommendEvaluation?.score || 0,
      comment: recommendEvaluation?.comment || '',
      reason: recommendEvaluation?.reason || '',
    })
  }, [recommendEvaluation])

  const [isEditing, setIsEditing] = useState(false)
  const [finalScore, setFinalScore] = useState(recommendEvaluation?.score || 0)
  const [editScore, setEditScore] = useState<number | null>(
    recommendEvaluation?.score || 0
  )
  const [editReason, setEditReason] = useState('')
  const [finalComment, setFinalComment] = useState(
    recommendEvaluation?.comment || ''
  )

  const [originalEvaluation, setOriginalEvaluation] = useState<{
    score: number
    comment: string
    reason: string
  } | null>(null)

  useEffect(() => {
    if (member) {
      const tempEvaluation = tempEvaluations.find(
        (evaluation) => evaluation.empNo === member.empNo
      )
      if (tempEvaluation) {
        setFinalScore(tempEvaluation.score)
        setEditScore(tempEvaluation.score)
        setFinalComment(tempEvaluation.comment || '')
        setEditReason(tempEvaluation.reason || '')
        setOriginalEvaluation({
          score: tempEvaluation.score,
          comment: tempEvaluation.comment || '',
          reason: tempEvaluation.reason || '',
        })
      }
    }
  }, [member, tempEvaluations])

  useEffect(() => {
    console.log('Selected member:', member)
    if (member) {
      const tempEvaluation = tempEvaluations.find(
        (evaluation) => evaluation.empNo === member.empNo
      )
      if (tempEvaluation) {
        setFinalScore(tempEvaluation.score)
        setEditScore(tempEvaluation.score)
        setFinalComment(tempEvaluation.comment || '')
        setEditReason(tempEvaluation.reason || '')
        setOriginalEvaluation({
          score: tempEvaluation?.score || 0,
          comment: tempEvaluation?.comment || '',
          reason: tempEvaluation?.reason || '',
        })
      }
    }
  }, [member, tempEvaluations])

  const handleScoreChange = (value: string) => {
    if (value === '') {
      setEditScore(null)
      return
    }

    const numValue = parseFloat(value)

    const isInRange = numValue >= 1.0 && numValue <= 5.0
    const isStepValid = Number.isInteger(numValue * 10) // 0.1 단위 체크

    if (!isNaN(numValue) && isInRange && isStepValid) {
      setEditScore(numValue)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditScore(finalScore)
    setEditReason('')
  }

  const isScoreChanged = editScore !== originalEvaluation?.score
  const isReasonValid = editReason.trim().length > 0
  const isCommentChanged =
    finalComment.trim() !== originalEvaluation?.comment.trim()

  const isValidScoreBlock = !isScoreChanged || (isScoreChanged && isReasonValid)

  const isFormValid = isValidScoreBlock && isCommentChanged

  const handleSaveEvaluation = () => {
    if (isFormValid) {
      EvaluationService.updateTempEvaluation(
        teamEvaluationId,
        member.empNo,
        editScore || 0,
        finalComment,
        editReason,
        periodId
      )
        .then(() => {
          console.log('평가가 성공적으로 저장되었습니다.')
          setIsEditing(false)
          setIsSubmitted(true)
          setOriginalEvaluation({
            score: editScore || 0,
            comment: finalComment,
            reason: editReason,
          })
        })
        .catch((error) => {
          console.error('평가 저장 중 오류 발생:', error)
        })
    } else {
      console.error('유효하지 않은 폼 데이터입니다.')
    }
  }

  // 최종 제출 버튼 클릭 시
  const handleFinalSubmit = () => {
    if (isValidFinalSubmit) {
      EvaluationService.submitTeamEvaluation(teamEvaluationId)
        .then(() => {
          console.log('최종 제출이 성공적으로 완료되었습니다.')
          setIsSubmitted(true)
          navigate('/evaluation', {
            state: { periodId, teamEvaluationId, memberEmpNo },
          }) // 평가 완료 페이지로 이동
        })
        .catch((error: any) => {
          console.error('최종 제출 중 오류 발생:', error)
        })
    } else {
      console.error('최종 제출이 유효하지 않습니다.')
    }
  }

  return (
    <div className="lg:pl-4 w-fill lg:w-96 flex flex-col min-h-0">
      <div className="mb-4 mt-4 lg:mt-0">
        <h2 className="font-semibold">점수 책정</h2>
      </div>

      {/* 최종 점수 및 편집 버튼 */}
      <div className="bg-white rounded-xl px-5 py-4 mb-4 shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            최종 점수
          </h3>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <span className="font-medium">{finalScore} 점</span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Edit2 size={16} className="text-gray-500" />
                </button>
              </>
            ) : (
              <button
                onClick={handleCancel}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={16} className="text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* 점수 수정 시 입력란 */}
        {isEditing && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 mt-2">
                수정 점수
              </label>
              <input
                type="number"
                min="1.0"
                max="5.0"
                step="0.1"
                value={editScore !== null ? editScore : ''}
                onChange={(e) => handleScoreChange(e.target.value)}
                className="w-full px-3 py-2 border-none rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm bg-[#F8F8F8]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                수정 이유
              </label>
              <textarea
                value={editReason}
                onChange={(e) => setEditReason(e.target.value)}
                placeholder="최종 점수 수정 이유를 작성해주세요"
                rows={1}
                className="w-full px-3 py-2 border-none rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none text-sm bg-[#F8F8F8]"
              />
            </div>
          </div>
        )}
      </div>

      {/* 최종평가 코멘트 */}
      <div className="bg-white rounded-xl px-5 py-4 mb-6 shadow-md flex-1 flex flex-col min-h-64 lg:min-h-0">
        <h3 className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          최종평가 코멘트
        </h3>
        <textarea
          value={finalComment}
          onChange={(e) => setFinalComment(e.target.value)}
          className="w-full px-3 py-2 border-none rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none text-gray-700 flex-1 text-sm bg-[#F8F8F8]"
        />
      </div>

      {/* 버튼 */}
      <div className="flex gap-3 mt-auto">
        <button
          onClick={handleSaveEvaluation}
          disabled={!isFormValid}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all h-12 mt-auto ${
            isFormValid
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          평가 저장하기
        </button>
        <button
          onClick={handleFinalSubmit}
          disabled={!isValidFinalSubmit}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all h-12 mt-auto ${
            isValidFinalSubmit
              ? 'bg-green-500 hover:bg-green-600 text-white shadow-sm'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          최종 제출
        </button>
      </div>
    </div>
  )
}

export default ScoreEvaluation
