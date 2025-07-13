import React, { useEffect, useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Menu,
  List,
  BarChart3,
  Info,
  UsersRound,
  Calendar,
  Target,
  TrendingUp,
} from 'lucide-react'
import { Button } from '../common'
import type { DropdownProps } from '../../types/TeamPage.types'
import TeamService from '../../services/TeamService'

interface Grade {
  gradeRule: string
  gradeS: string
  gradeA: string
  gradeB: string
  gradeC: string
  gradeD: string
}

interface Employee {
  empNo: string
  empName: string
  profileImage: string
}

interface Task {
  taskId: number
  taskName: string
  taskDetail: string
  goal: string
  weight: number
  startDate: string
  endDate: string
  employee: Employee
  grade: Grade
  achievementRate: number
  contributionScore: number
}

interface TeamKPI {
  teamKpiId: number
  kpiName: string
  goal: string
  achievementRate: number
  weight: number
  grade: Grade
  tasks: Task[]
}

const KPIDashboard: React.FC = () => {
  const [expandedTasks, setExpandedTasks] = useState<Set<number>>(new Set())
  const [expandedDetails, setExpandedDetails] = useState<Set<string>>(new Set())

  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear() + '년도'
  )
  const [kpiData, setKpiData] = useState<any[]>([])

  const [yearOptions, setYearOptions] = useState<any[]>([])
  useEffect(() => {
    // 팀의 평가 기간 목록 조회 (연도, 분기 선택할 때 사용)
    TeamService.getPeriods()
      .then((data) => {
        console.log('팀 평가 기간 목록 조회 성공:', data)
        const years = Array.from(
          new Set(data.map((period: any) => period.year))
        ).sort((a: any, b: any) => b - a)
        const currentYear = new Date().getFullYear()
        if (!years.includes(currentYear)) {
          years.unshift(currentYear)
        }
        const options = years.map((year) => `${year}년도`)
        setYearOptions(options)
      })
      .catch((error) => {
        console.error('팀 평가 기간 목록 조회 실패:', error)
      })
  }, [])

  useEffect(() => {
    // [팀장] 팀 목표 리스트 상세 조회
    TeamService.getTeamKpiDetail(
      selectedYear
        ? parseInt(selectedYear.replace('년도', ''))
        : new Date().getFullYear()
    )
      .then((data) => {
        console.log('팀 목표 리스트 상세 조회 성공:', data)
        setKpiData(data)
      })
      .catch((error) => {
        console.error('팀 목표 리스트 상세 조회 실패:', error)
      })
  }, [selectedYear])

  const handleChangeYear = (year: string) => {
    setSelectedYear(year)
  }

  const toggleTasks = (teamKpiId: number) => {
    const newExpanded = new Set(expandedTasks)
    if (newExpanded.has(teamKpiId)) {
      newExpanded.delete(teamKpiId)
    } else {
      newExpanded.add(teamKpiId)
    }
    setExpandedTasks(newExpanded)
  }

  const toggleDetails = (id: string) => {
    const newExpanded = new Set(expandedDetails)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedDetails(newExpanded)
  }

  const expandAllTasks = () => {
    const allIds = kpiData.map((item) => item.teamKpiId)
    setExpandedTasks(new Set(allIds))
  }

  const collapseAllTasks = () => {
    setExpandedTasks(new Set())
  }

  const getAchievementColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600 bg-green-100'
    if (rate >= 70) return 'text-blue-600 bg-blue-100'
    if (rate >= 50) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getProgressBarColor = (rate: number) => {
    if (rate >= 90) return 'bg-green-500'
    if (rate >= 70) return 'bg-blue-500'
    if (rate >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getGradeByRate = (rate: number, grade: Grade) => {
    if (rate >= 95) return 'S'
    if (rate >= 85) return 'A'
    if (rate >= 75) return 'B'
    if (rate >= 65) return 'C'
    return 'D'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  const renderGradeScale = (grade: Grade) => (
    <div className="p-3 sm:p-4 bg-gray-50 rounded-lg space-y-4 text-sm">
      <div>
        <div className="font-semibold text-gray-700 mb-1">평가 기준</div>
        <div className="text-gray-600 whitespace-pre-line text-xs sm:text-sm">
          {grade.gradeRule}
        </div>
      </div>
      <div>
        <div className="font-semibold text-gray-700 mb-2">평가 등급</div>
        <div className="overflow-x-auto">
          <div className="min-w-full overflow-hidden rounded-md border border-gray-200">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-2 sm:px-3 py-2 text-center font-medium text-blue-900 border-r border-gray-200 w-1/5">
                    S
                  </th>
                  <th className="px-2 sm:px-3 py-2 text-center font-medium text-blue-900 border-r border-gray-200 w-1/5">
                    A
                  </th>
                  <th className="px-2 sm:px-3 py-2 text-center font-medium text-blue-900 border-r border-gray-200 w-1/5">
                    B
                  </th>
                  <th className="px-2 sm:px-3 py-2 text-center font-medium text-blue-900 border-r border-gray-200 w-1/5">
                    C
                  </th>
                  <th className="px-2 sm:px-3 py-2 text-center font-medium text-blue-900 w-1/5">
                    D
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="px-2 sm:px-3 py-2 text-center text-gray-700 border-r border-gray-200">
                    {grade.gradeS}
                  </td>
                  <td className="px-2 sm:px-3 py-2 text-center text-gray-700 border-r border-gray-200">
                    {grade.gradeA}
                  </td>
                  <td className="px-2 sm:px-3 py-2 text-center text-gray-700 border-r border-gray-200">
                    {grade.gradeB}
                  </td>
                  <td className="px-2 sm:px-3 py-2 text-center text-gray-700 border-r border-gray-200">
                    {grade.gradeC}
                  </td>
                  <td className="px-2 sm:px-3 py-2 text-center text-gray-700">
                    {grade.gradeD}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTask = (task: Task) => {
    const isDetailsExpanded = expandedDetails.has(`task-${task.taskId}`)
    const currentGrade = getGradeByRate(task.achievementRate, task.grade)

    return (
      <div
        key={task.taskId}
        className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 mb-3 hover:shadow-md shadow-sm transition-shadow duration-200"
      >
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start space-x-3 flex-1">
              <button
                onClick={() => toggleDetails(`task-${task.taskId}`)}
                className="p-1 hover:bg-gray-100 rounded mt-1"
                title="상세 정보 보기"
              >
                {isDetailsExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0">
                {task.employee.empName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="font-medium text-gray-900 text-sm">
                    {task.employee.empName}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({task.employee.empNo})
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2 break-words">
                  {task.taskName}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">
                      {formatDate(task.startDate)} ~ {formatDate(task.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Target className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span>가중치 {task.weight}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full ${getProgressBarColor(
                    task.achievementRate
                  )}`}
                  style={{
                    width: `${
                      task.achievementRate > 100 ? 100 : task.achievementRate
                    }%`,
                  }}
                ></div>
              </div>
              <div className="text-sm font-medium text-gray-700">
                {task.achievementRate}%
              </div>
              <div className="text-xs text-gray-500">달성률</div>
            </div>
            <div>
              <div
                className={`inline-block px-2 py-1 rounded text-xs font-bold mb-1 ${getAchievementColor(
                  task.achievementRate
                )}`}
              >
                {currentGrade}
              </div>
              <div className="text-xs text-gray-500">등급</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                {task.contributionScore}
              </div>
              <div className="text-xs text-gray-500">기여점수</div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:items-center lg:justify-between">
          <div
            className="flex items-center flex-[9] cursor-pointer"
            onClick={() => toggleDetails(`task-${task.taskId}`)}
          >
            <button
              onClick={() => toggleDetails(`task-${task.taskId}`)}
              className="p-1 hover:bg-gray-100 rounded"
              title="상세 정보 보기"
            >
              {isDetailsExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </button>

            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-xs font-medium text-white ml-1 mr-3">
              {task.employee.empName.charAt(0)}
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <div className="font-medium text-gray-900 text-sm">
                  {task.employee.empName}
                </div>
                <span className="text-xs text-gray-500">
                  ({task.employee.empNo})
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(task.startDate)} ~ {formatDate(task.endDate)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-[16.5] text-sm text-gray-600 break-words">
            {task.taskName}
          </div>

          <div className="flex items-center space-x-2 flex-[7]">
            <div className="text-right">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-[#3D8EFF]`}
                  style={{
                    width: `${
                      task.achievementRate > 100 ? 100 : task.achievementRate
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-900">
                {task.achievementRate}%
              </div>
            </div>
          </div>

          <div className="flex-[2]">
            <div
              className={`text-sm font-medium rounded-md py-[0.1rem] px-[0.5rem] w-[fit-content]
              ${
                task.weight >= 30
                  ? 'bg-[#FFCFD0] text-[#E74E50]'
                  : task.weight >= 20
                  ? 'bg-[#E4EFFF] text-[#5F87C2]'
                  : task.weight >= 10
                  ? 'bg-[#FFF2CB] text-[#D9A91A]'
                  : 'bg-[#ECECEC] text-[#898989]'
              }`}
            >
              {task.weight}%
            </div>
          </div>
        </div>

        {isDetailsExpanded && (
          <div className="mt-4 bg-gray-50 rounded-lg text-sm">
            <div className="p-3 sm:p-4 sm:pb-0 pb-0">
              <div className="font-semibold text-gray-700 mb-1">업무 상세</div>
              <div className="text-gray-600 whitespace-pre-line text-xs sm:text-sm">
                {task.taskDetail}
              </div>
            </div>
            <div className="p-3 sm:p-4 sm:pb-0 pb-0">
              <div className="font-semibold text-gray-700 mb-1">목표</div>
              <div className="text-gray-600 text-xs sm:text-sm">
                {task.goal}
              </div>
            </div>
            {renderGradeScale(task.grade)}
          </div>
        )}
      </div>
    )
  }

  const renderKPIItem = (item: TeamKPI) => {
    const isTasksExpanded = expandedTasks.has(item.teamKpiId)
    const isDetailsExpanded = expandedDetails.has(`kpi-${item.teamKpiId}`)
    const currentGrade = getGradeByRate(item.achievementRate, item.grade)

    return (
      <div
        key={item.teamKpiId}
        className="bg-white rounded-lg border border-gray-200 mb-3 shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        {/* Mobile Layout */}
        <div className="block lg:hidden p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start space-x-3 flex-1">
              <div className="flex flex-col space-y-1">
                {item.tasks.length > 0 && (
                  <button
                    onClick={() => toggleTasks(item.teamKpiId)}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="팀원 업무 목록 보기"
                  >
                    <UsersRound
                      className={`w-4 h-4 ${
                        isTasksExpanded ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    />
                  </button>
                )}
                <button
                  onClick={() => toggleDetails(`kpi-${item.teamKpiId}`)}
                  className="p-1 hover:bg-gray-100 rounded"
                  title="세부사항 보기"
                >
                  {isDetailsExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                {item.tasks.length === 0 && (
                  <Menu className="w-4 h-4 text-gray-400 p-1" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 mb-1 break-words">
                  {item.kpiName}
                </div>
                <div className="text-sm text-gray-600 break-words">
                  {item.goal}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full ${getProgressBarColor(
                    item.achievementRate
                  )}`}
                  style={{
                    width: `${
                      item.achievementRate > 100 ? 100 : item.achievementRate
                    }%`,
                  }}
                ></div>
              </div>
              <div className="text-sm font-medium text-gray-700">
                {item.achievementRate}%
              </div>
              <div className="text-xs text-gray-500">달성률</div>
            </div>
            <div>
              <div
                className={`inline-block px-2 py-1 rounded text-xs font-bold mb-1 ${getAchievementColor(
                  item.achievementRate
                )}`}
              >
                {currentGrade}
              </div>
              <div className="text-xs text-gray-500">등급</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                {item.weight}%
              </div>
              <div className="text-xs text-gray-500">비중</div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:p-4 flex w-full">
          <div className="flex items-center space-x-1 flex-[4]">
            <div className="flex space-x-1">
              {item.tasks.length > 0 && (
                <button
                  onClick={() => toggleTasks(item.teamKpiId)}
                  className="p-1 hover:bg-gray-100 rounded"
                  title="팀원 업무 목록 보기"
                >
                  <UsersRound
                    className={`w-4 h-4 ${
                      isTasksExpanded ? 'text-blue-600' : 'text-gray-400'
                    }`}
                  />
                </button>
              )}

              <div className="mx-7 w-[1px] bg-gray-300" />

              <button
                onClick={() => toggleDetails(`kpi-${item.teamKpiId}`)}
                className="p-1 hover:bg-gray-100 rounded"
                title="세부사항 보기"
              >
                {isDetailsExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>
              {item.tasks.length === 0 && (
                <Menu className="w-4 h-4 text-gray-400 p-1" />
              )}
            </div>
            <div className="flex-1">
              <div
                className="font-medium text-gray-900 text-sm cursor-pointer"
                onClick={() => toggleDetails(`kpi-${item.teamKpiId}`)}
              >
                {item.kpiName}
              </div>
            </div>
          </div>

          <div className="flex-[7]">
            <div className="text-sm text-gray-600">{item.goal}</div>
          </div>

          <div className="flex items-center space-x-2 flex-[3]">
            <div className="text-center">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-[#3D8EFF]`}
                  style={{
                    width: `${
                      item.achievementRate > 100 ? 100 : item.achievementRate
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-700 w-8 text-right">
              {item.achievementRate}%
            </div>
          </div>

          <div className="flex-[1]">
            <div
              className={`text-sm font-medium rounded-md py-[0.1rem] px-[0.5rem] w-[fit-content]
              ${
                item.weight >= 30
                  ? 'bg-[#FFCFD0] text-[#E74E50]'
                  : item.weight >= 20
                  ? 'bg-[#E4EFFF] text-[#5F87C2]'
                  : item.weight >= 10
                  ? 'bg-[#FFF2CB] text-[#D9A91A]'
                  : 'bg-[#ECECEC] text-[#898989]'
              }`}
            >
              {item.weight}%
            </div>
          </div>
        </div>

        {/* KPI 세부사항 */}
        {isDetailsExpanded && (
          <div className="px-4 pb-4">{renderGradeScale(item.grade)}</div>
        )}

        {/* 팀원 업무 목록 */}
        {isTasksExpanded && item.tasks.length > 0 && (
          <div className="px-4 pb-4 bg-gray-50 rounded-b-lg">
            <div className="mb-3 pt-3">
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <TrendingUp className="w-4 h-4" />
                <span>개별 업무 현황 ({item.tasks.length}건)</span>
              </div>
            </div>
            <div className="space-y-2">{item.tasks.map(renderTask)}</div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-full px-10 flex-1 min-h-0 flex flex-col mb-4">
      {/* Header */}
      <div className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Dropdown
              label=""
              value={selectedYear}
              options={yearOptions}
              onChange={handleChangeYear}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={collapseAllTasks}
              className="flex items-center justify-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-2xl transition-colors bg-white shadow-md hover:shadow-md active:shadow-sm"
            >
              <List className="w-4 h-4" />
              <span className="text-sm font-medium">팀 KPI 보기</span>
            </button>
            <button
              onClick={expandAllTasks}
              className="flex items-center justify-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-2xl transition-colors bg-white shadow-md hover:shadow-md active:shadow-sm"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm font-medium">개별 업무 펼쳐보기</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Header - Desktop Only */}
      <div className="hidden lg:flex lg:p-4 bg-[#E3E3E3] text-sm font-semibold text-gray-700 rounded-lg">
        <div className="flex-[4]">KPI 성과 지표명</div>
        <div className="flex-[7]">목표</div>
        <div className="flex-[3] flex items-center space-x-1">
          <span>달성률</span>
          <Info className="w-3 h-3 text-gray-400" />
        </div>
        <div className="flex-[1]">비중</div>
      </div>

      {/* KPI Items */}
      <div className="mt-3 flex-1 min-h-0 overflow-auto mx-[-0.2rem] px-[0.2rem]">
        {kpiData.map(renderKPIItem)}
      </div>
    </div>
  )
}

export default KPIDashboard

const Dropdown: React.FC<DropdownProps & { disabled?: boolean }> = ({
  value,
  options,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative min-w-[200px]">
      <div className="relative">
        <Button
          variant="secondary"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full text-left ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={disabled}
        >
          <span
            className={`block truncate pr-8 ${disabled ? 'text-gray-400' : ''}`}
          >
            {value || '선택해주세요'}
          </span>
          <ChevronDown
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-transform ${
              isOpen ? 'rotate-180' : ''
            } ${disabled ? 'text-gray-400' : ''}`}
          />
        </Button>

        {isOpen && !disabled && (
          <>
            <nav className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-[200px] overflow-y-auto">
              {options.map((option, index) => (
                <button
                  key={`${option}-${index}`}
                  onClick={() => {
                    onChange(option)
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                    option === '평가 기간이 없습니다'
                      ? 'text-gray-400 cursor-not-allowed'
                      : ''
                  } ${
                    option === value
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : ''
                  }`}
                  disabled={option === '평가 기간이 없습니다'}
                >
                  {option}
                </button>
              ))}
            </nav>
            <div
              className="fixed inset-0 z-0"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </div>
    </div>
  )
}
