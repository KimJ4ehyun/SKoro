import { useMemo } from 'react'

const EvaluationSchedule: React.FC<{
  startDate: Date
  endDate: Date
}> = ({ startDate, endDate }) => {
  const formatDateKorean = (date: Date): string => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return '날짜를 선택하세요'
    }
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`
  }

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  const evaluationSchedule = useMemo(() => {
    if (
      !startDate ||
      !endDate ||
      !(startDate instanceof Date) ||
      !(endDate instanceof Date) ||
      isNaN(startDate.getTime()) ||
      isNaN(endDate.getTime())
    ) {
      return [
        {
          type: '팀원 간 평가 입정',
          period: '날짜를 선택해주세요',
        },
        {
          type: '팀장 평가 입정',
          period: '날짜를 선택해주세요',
        },
        {
          type: '팀원 이의제기 입정',
          period: '날짜를 선택해주세요',
        },
      ]
    }

    const teamEvalStart = addDays(startDate, -7)
    const teamEvalEnd = addDays(startDate, -1)
    const leaderEvalStart = startDate
    const leaderEvalEnd = endDate
    const objectionStart = addDays(endDate, 1)
    const objectionEnd = addDays(endDate, 7)

    return [
      {
        type: '팀원 간 평가 입정',
        period: `${formatDateKorean(teamEvalStart)}부터 ${formatDateKorean(
          teamEvalEnd
        )}까지`,
      },
      {
        type: '팀장 평가 입정',
        period: `${formatDateKorean(leaderEvalStart)}부터 ${formatDateKorean(
          leaderEvalEnd
        )}까지`,
      },
      {
        type: '팀원 이의제기 입정',
        period: `${formatDateKorean(objectionStart)}부터 ${formatDateKorean(
          objectionEnd
        )}까지`,
      },
    ]
  }, [startDate, endDate])

  return (
    <div className="p-6 flex flex-col">
      <h2 className="text-lg font-semibold mb-4">평가 일정</h2>

      <div className="space-y-4 bg-gray-50 rounded-xl p-4">
        {evaluationSchedule.map((schedule, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="text-gray-800 font-medium mb-1">
                {schedule.type}
              </div>
              <div className="text-sm text-gray-600">{schedule.period}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <button className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
          평가 생성하기
        </button>
      </div>
    </div>
  )
}

export default EvaluationSchedule
