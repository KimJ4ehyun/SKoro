import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from 'recharts'
import type { TooltipProps } from 'recharts'
import { useEffect, useState } from 'react'
import TeamService from '../../services/TeamService'

interface ContributionData {
  year: number
  quarter: number
  avgContributionRate: number
}

const ContributionsChart = () => {
  const [contributions, setContributions] = useState<ContributionData[]>([])

  useEffect(() => {
    // [팀원] 홈 화면 - 분기별 달성률 조회
    TeamService.getMemberContributions()
      .then((data) => {
        console.log('분기별 달성률 조회 성공:', data)
        setContributions(data)
      })
      .catch((error) => {
        console.error('분기별 달성률 조회 실패:', error)
      })
  }, [])

  // 데이터를 차트에 적합한 형태로 변환
  const chartData = contributions.map((item) => ({
    ...item,
    label: `${item.year}년 ${item.quarter}분기`,
    quarterKey: `${item.year}-Q${item.quarter}`,
  }))

  return (
    <div className="h-1/2 flex flex-col pt-2">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold">분기별 달성률</h2>

        {/* 범례 */}
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-red-400"></div>
            <span className="text-xs text-gray-600">평균 달성률</span>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 max-h-96 overflow-y-auto p-4">
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="ml-[-1rem] mt-[0.5rem]"
        >
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            style={{ backgroundColor: 'white' }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="quarterKey"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickFormatter={(value) => {
                const [year, quarter] = value.split('-')
                return `${year.slice(2)}년 ${quarter}`
              }}
            />
            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="avgContributionRate"
              fill="#F87171"
              radius={[4, 4, 0, 0]}
              name="평균 기여율"
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ContributionsChart

const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm shadow-lg">
        <p className="font-medium mb-1">{`${data.year}년 ${data.quarter}분기`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}%`}
          </p>
        ))}
      </div>
    )
  }
  return null
}
