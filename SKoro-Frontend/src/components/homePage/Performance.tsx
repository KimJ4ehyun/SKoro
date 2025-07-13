import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
} from 'recharts'
import type { TooltipProps } from 'recharts'
import { useEffect, useState } from 'react'
import TeamService from '../../services/TeamService'
import { useUserInfoStore } from '../../store/useUserInfoStore'

type ManagerData = {
  year: number
  teamAverageAchievementRate: number
  allTeamAverageAchievementRate: number
}

type MemberData = {
  year: number
  score: number
}

type AchievementData = ManagerData | MemberData

const Performance = () => {
  const [achievementRate, setAchievementRate] = useState<AchievementData[]>([])
  const userRole = useUserInfoStore((state) => state.role)

  useEffect(() => {
    if (userRole === 'MANAGER') {
      TeamService.getAverageAchievementRate()
        .then(setAchievementRate)
        .catch((error) => console.error('달성률 조회 실패:', error))
    } else {
      TeamService.getFinalScores()
        .then(setAchievementRate)
        .catch((error) => console.error('점수 조회 실패:', error))
    }
  }, [])

  return (
    <div className="h-1/2 flex flex-col pt-2">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold">최종 평가</h2>

        {/* 범례 */}
        <div className="flex items-center justify-center gap-6">
          {userRole === 'MANAGER' ? (
            <>
              <Legend color="bg-blue-500" label="우리 팀 달성률" />
              <Legend color="bg-green-500" label="전체 팀 평균 달성률" />
            </>
          ) : (
            <Legend color="bg-blue-500" label="최종 점수" />
          )}
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 max-h-96 overflow-y-auto p-4">
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="ml-[-1rem] mt-[0.5rem]"
        >
          {userRole === 'MANAGER' ? (
            <LineChart data={achievementRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="year"
                tickFormatter={(value) => `${value}년`}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip userRole={userRole} />} />
              <Line
                type="linear"
                dataKey="teamAverageAchievementRate"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="우리 팀"
              />
              <Line
                type="linear"
                dataKey="allTeamAverageAchievementRate"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="전체 팀 평균"
              />
            </LineChart>
          ) : (
            <LineChart data={achievementRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="year"
                tickFormatter={(value) => `${value}년`}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 5]}
                tickFormatter={(value) => `${value}점`}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip userRole={userRole} />} />
              <Line
                type="linear"
                dataKey="score"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="최종 점수"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Performance

// CustomTooltip 컴포넌트
const CustomTooltip = ({
  active,
  payload,
  label,
  userRole,
}: TooltipProps<any, any> & { userRole: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm shadow-lg">
        <p className="font-medium mb-1">{`${label}년`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}:{' '}
            {userRole === 'MEMBER' ? `${entry.value}점` : `${entry.value}%`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// 범례 컴포넌트
const Legend = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <div className={`w-3 h-3 rounded-full ${color}`} />
    <span className="text-xs text-gray-600">{label}</span>
  </div>
)
