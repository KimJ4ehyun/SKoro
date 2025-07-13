import { useEffect, useState } from 'react'
import TeamService from '../../services/TeamService'
import { useUserInfoStore } from '../../store/useUserInfoStore'

const Evaluations = () => {
  const [teamEvaluations, setTeamEvaluations] = useState([])
  const userRole = useUserInfoStore((state) => state.role)

  useEffect(() => {
    if (userRole === 'MANAGER') {
      // [팀장] 홈 화면 - 팀 분기 평가 상세 조회
      TeamService.getTeamEvaluation()
        .then((teamEvaluation) => {
          console.log('팀 분기 평가 상세 조회 성공:', teamEvaluation)
          setTeamEvaluations(teamEvaluation)
        })
        .catch((error) => {
          console.error('팀 분기 평가 상세 조회 실패:', error)
        })
    } else {
      // [팀원] 홈 화면 - 분기별 달성률 조회
      TeamService.getMemberContributions()
        .then((memberContributions) => {
          console.log('분기별 달성률 조회 성공:', memberContributions)
          setTeamEvaluations(memberContributions)
        })
        .catch((error) => {
          console.error('분기별 달성률 조회 실패:', error)
        })
    }
  }, [])

  return (
    <div className="h-1/2 flex flex-col pt-2">
      <h2 className="font-semibold mb-2">팀 분기 평가</h2>

      <div className="flex-1 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 max-h-96 overflow-y-auto p-2">
        {teamEvaluations.map((evaluation: any, index) => (
          <div
            key={index}
            className="border-b border-gray-200 last:border-b-0 hover:shadow-md transition-shadow duration-200 cursor-pointer p-4 py-3 rounded-sm"
          >
            <div className="flex justify-between items-start mb-2 items-center">
              <div>
                <span className="text-xs text-blue-600 font-semibold">
                  {evaluation.startDate} ~ {evaluation.endDate}
                </span>
                <h3 className="font-semibold text-gray-800">
                  {evaluation.periodName}
                </h3>
              </div>

              <div className="text-right font-semibold bg-gray-50 rounded-md p-3 py-2 w-[fit-content]">
                <div className="flex space-x-4 text-xs text-gray-600">
                  <span>전년 유사팀 대비 성과</span>
                  <span
                    className={
                      evaluation.relativePerformance > 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {evaluation.relativePerformance > 0 ? '+' : ''}
                    {evaluation.relativePerformance}
                  </span>
                </div>

                <div className="flex space-x-4 text-xs text-gray-600 mt-1">
                  <span>전년도 대비 성과 추이</span>
                  <span
                    className={
                      evaluation.yearOverYearGrowth > 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {evaluation.yearOverYearGrowth > 0 ? '+' : ''}
                    {evaluation.yearOverYearGrowth}%
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-1">
              {evaluation.teamPerformanceSummary}
            </p>

            <div className="flex justify-between items-center">
              <div className="w-3/4 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${
                      evaluation.averageAchievementRate > 100
                        ? 100
                        : evaluation.averageAchievementRate
                    }%`,
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                {evaluation.averageAchievementRate}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Evaluations
