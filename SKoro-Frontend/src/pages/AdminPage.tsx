import React, { useState, useMemo, useEffect } from 'react'
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Users,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  RefreshCw,
} from 'lucide-react'
import { Header } from '../components/common'
import AdminService from '../services/AdminService'
import useDocumentTitle from '../hooks/useDocumentTitle'

interface EvaluationPeriod {
  periodId: number
  periodName: string
  isFinal: boolean
  startDate: string
  endDate: string
  periodPhase:
    | 'NOT_STARTED'
    | 'PEER_EVALUATION'
    | 'MIDDLE_REPORT'
    | 'MANAGER_EVALUATION'
    | 'REPORT_GENERATION'
    | 'EVALUATION_FEEDBACK'
    | 'COMPLETED'
  currentStep: number
  totalSteps: number
}

interface ReportModule {
  id: number
  name: string
  status: 'pending' | 'processing' | 'completed'
}

const AdminPage: React.FC = () => {
  useDocumentTitle('관리자 홈 - SKoro')

  const [startDate, setStartDate] = useState<Date>(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)
  })
  const [endDate, setEndDate] = useState<Date>(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14)
  })
  const [evaluationType, setEvaluationType] = useState('quarterly')
  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)
  const [evaluationPeriods, setEvaluationPeriods] = useState<
    EvaluationPeriod[]
  >([])
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [reportModules, setReportModules] = useState<ReportModule[]>([])
  const [isGeneratingKPI, setIsGeneratingKPI] = useState(false)
  const [kpiGeneratedYear, setKpiGeneratedYear] = useState<number | null>(null)
  const [currentProcessingPeriod, setCurrentProcessingPeriod] = useState<
    number | null
  >(null)

  const currentYear = new Date().getFullYear()
  const [isKpiGenerated, setIsKpiGenerated] = useState<boolean>(
    kpiGeneratedYear === currentYear
  )
  const [isNotCompleted, setIsNotCompleted] = useState<number[]>([])
  const [logic, setLogic] = useState<string>(
    '1. Passive\n- 팀원 간 평가 기간이 시작되면, 팀원들은 서로의 업무 성과를 평가합니다.\n2. Active\n- 팀장 평가 기간이 시작되면, 팀장은 팀원들의 업무 성과를 종합적으로 평가합니다.\n3. Passive\n- 팀원 이의제기 기간이 시작되면, 팀원들은 자신의 평가에 대해 이의제기를 할 수 있습니다.\n4. Active\n- 최종 레포트 생성 및 피드백을 통해 평가 결과가 확정됩니다.'
  )

  // 레포트 모듈 초기화
  const initializeReportModules = (isFinal: boolean): ReportModule[] => {
    const baseModules = [
      { id: 1, name: '기본정보 처리 모듈', status: 'pending' as const },
      { id: 2, name: '목표달성도 분석 모듈', status: 'pending' as const },
      { id: 3, name: '협업 분석 모듈', status: 'pending' as const },
      { id: 4, name: 'Peer Talk 분석 모듈', status: 'pending' as const },
      { id: 6, name: '4P BARS 평가 모듈', status: 'pending' as const },
    ]

    if (isFinal) {
      return [
        ...baseModules,
        {
          id: 7,
          name: '종합평가 점수 산정 + 팀 내 CL별 정규화 모듈',
          status: 'pending' as const,
        },
        {
          id: 8,
          name: '팀 성과 비교 모듈 (클러스터링 기반)',
          status: 'pending' as const,
        },
        {
          id: 9,
          name: '부문 단위 CL별 정규화 모듈',
          status: 'pending' as const,
        },
        { id: 10, name: '순위/비교 분석 모듈', status: 'pending' as const },
        { id: 11, name: '리스크 분석 모듈', status: 'pending' as const },
        { id: 12, name: '성장 제안 모듈', status: 'pending' as const },
        { id: 13, name: 'Comment 생성 모듈', status: 'pending' as const },
      ]
    }

    return [
      ...baseModules,
      { id: 10, name: '순위/비교 분석 모듈', status: 'pending' as const },
      { id: 11, name: '리스크 분석 모듈', status: 'pending' as const },
      { id: 12, name: '성장 제안 모듈', status: 'pending' as const },
      { id: 13, name: 'Comment 생성 모듈', status: 'pending' as const },
    ]
  }

  // 레포트 생성 프로세스
  const generateReport = async (isFinal: boolean, periodId: number) => {
    setIsGeneratingReport(true)
    setCurrentProcessingPeriod(periodId)
    const modules = initializeReportModules(isFinal)
    setReportModules(modules)

    for (let i = 0; i < modules.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 80))
      setReportModules((prev) =>
        prev.map((module) =>
          module.id === modules[i].id
            ? { ...module, status: 'processing' }
            : module
        )
      )

      await new Promise((resolve) => setTimeout(resolve, 120))
      setReportModules((prev) =>
        prev.map((module) =>
          module.id === modules[i].id
            ? { ...module, status: 'completed' }
            : module
        )
      )
    }

    setIsGeneratingReport(false)
    setCurrentProcessingPeriod(null)

    setEvaluationPeriods((prev) =>
      prev.map((period) => {
        if (period.periodId === periodId && !period.isFinal) {
          return {
            ...period,
            periodPhase: isFinal ? 'EVALUATION_FEEDBACK' : 'COMPLETED',
            currentStep: isFinal ? 5 : 2,
          }
        }
        return period
      })
    )
  }

  // 개인 KPI 생성
  const generatePersonalKPI = async () => {
    setIsGeneratingKPI(true)

    // Generate All Teams Kpis
    AdminService.generateAllTeamsKpis()
      .then(() => {
        setKpiGeneratedYear(currentYear)
        setIsGeneratingKPI(false)
        setIsKpiGenerated(true)
        //alert('팀 KPI가 성공적으로 생성되었습니다!')
      })
      .catch((error) => {
        console.error('팀 KPI 생성 실패:', error)
        setIsGeneratingKPI(false)
        alert('팀 KPI 생성에 실패했습니다. 다시 시도해주세요.')
      })
  }
  // 평가 생성
  const handleCreateEvaluation = () => {
    //
    AdminService.createPeriod({
      unit: 'QUARTER',
      isFinal: evaluationType === 'comprehensive',
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    })
      .then(() => {
        console.log('평가 기간이 성공적으로 생성되었습니다.')
      })
      .catch((error) => {
        console.error('평가 기간 생성 실패:', error)
        alert('평가 기간 생성에 실패했습니다. 다시 시도해주세요.')
        return
      })

    const newEvaluation: EvaluationPeriod = {
      periodId: Date.now(),
      periodName: `${currentYear}년 ${
        evaluationType === 'comprehensive' ? '최종' : '분기'
      } 평가`,
      isFinal: evaluationType === 'comprehensive',
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      periodPhase: 'NOT_STARTED',
      currentStep: 0,
      totalSteps: evaluationType === 'comprehensive' ? 5 : 2,
    }

    setEvaluationPeriods((prev) => [...prev, newEvaluation])
    //alert('평가가 성공적으로 생성되었습니다!')
  }

  // 다음 평가 단계로 전환
  const handleNextPhase = (periodId: number, action: string) => {
    // [관리자] 다음 평가 단계로 전환
    AdminService.nextPhase(periodId)
      .then(() => {
        console.log(`평가 단계가 성공적으로 ${action}로 전환되었습니다.`)
        setEvaluationPeriods((prev) =>
          prev.map((period) => {
            if (period.periodId !== periodId) return period
            switch (action) {
              case 'NOT_STARTED':
                console.log('평가 시작:', periodId)
                return {
                  ...period,
                  periodPhase: 'PEER_EVALUATION',
                  currentStep: 1,
                }
              case 'PEER_EVALUATION':
                generateReport(false, periodId)
                return {
                  ...period,
                  periodPhase: period.isFinal
                    ? 'MIDDLE_REPORT'
                    : 'REPORT_GENERATION',
                  currentStep: period.isFinal ? 2 : 1,
                }
              case 'MIDDLE_REPORT':
                return {
                  ...period,
                  periodPhase: 'MANAGER_EVALUATION',
                  currentStep: 3,
                }
              case 'MANAGER_EVALUATION':
                generateReport(true, periodId)
                return {
                  ...period,
                  periodPhase: 'REPORT_GENERATION',
                  currentStep: 4,
                }
              case 'REPORT_GENERATION':
                return {
                  ...period,
                  periodPhase: 'EVALUATION_FEEDBACK',
                  currentStep: 5,
                }
              case 'EVALUATION_FEEDBACK':
                return { ...period, periodPhase: 'COMPLETED', currentStep: 6 }
              default:
                return period
            }
          })
        )
      })
      .catch((error) => {
        console.error('평가 단계 전환 실패:', error)
        alert('평가 단계 전환에 실패했습니다. 다시 시도해주세요.')
        return
      })
  }

  // 평가 프로세스 진행
  const handleProcessStep = (
    periodId: number,
    action: string,
    isFinal: boolean
  ) => {
    if (action === 'NOT_STARTED') {
      AdminService.notifyPeerEvaluation(periodId)
        .then(() => {
          console.log('동료 평가 알림이 성공적으로 전송되었습니다.')
          setEvaluationPeriods((prev) =>
            prev.map((period) => {
              if (period.periodId !== periodId) return period
              return {
                ...period,
                periodPhase: 'PEER_EVALUATION',
                currentStep: 1,
              }
            })
          )
        })
        .catch((error) => {
          console.error('동료 평가 알림 전송 실패:', error)
          alert('동료 평가 알림 전송에 실패했습니다. 다시 시도해주세요.')
          return
        })
    } else if (isFinal && action === 'PEER_EVALUATION') {
      // 중간 평가 시작
      AdminService.startMidEvaluation(periodId, [])
        .then(() => {
          console.log('중간 평가가 성공적으로 시작되었습니다.')
          handleNextPhase(periodId, 'PEER_EVALUATION')
        })
        .catch((error) => {
          console.error('중간 평가 시작 실패:', error)
          alert('중간 평가 시작에 실패했습니다. 다시 시도해주세요.')
          return
        })
    } else if (!isFinal && action === 'PEER_EVALUATION') {
      // 해당 periodId가 진행 중임을 설정
      setCurrentProcessingPeriod(periodId)
      setIsGeneratingReport(true)

      // 분기 평가 시작
      AdminService.startQuarterlyEvaluation(periodId, [])
        .then(() => {
          console.log('분기 평가가 성공적으로 시작되었습니다.')
          handleNextPhase(periodId, 'PEER_EVALUATION')
          setIsGeneratingReport(false)
          setCurrentProcessingPeriod(null)
        })
        .catch((error) => {
          console.error('분기 평가 시작 실패:', error)
          alert('분기 평가 시작에 실패했습니다. 다시 시도해주세요.')
          setIsGeneratingReport(false)
          setCurrentProcessingPeriod(null)
          return
        })
    } else if (action === 'MANAGER_EVALUATION') {
      AdminService.startFinalEvaluation(periodId, [])
        .then(() => {
          console.log('최종 평가가 성공적으로 시작되었습니다.')
          handleNextPhase(periodId, 'MANAGER_EVALUATION')
        })
        .catch((error) => {
          console.error('최종 평가 시작 실패:', error)
          alert('최종 평가 시작에 실패했습니다. 다시 시도해주세요.')
          return
        })
    } else if (action === 'EVALUATION_FEEDBACK') {
      AdminService.summarizeFeedback()
        .then(() => {
          console.log('피드백 요약이 성공적으로 완료되었습니다.')
          handleNextPhase(periodId, 'EVALUATION_FEEDBACK')
        })
        .catch((error) => {
          console.error('피드백 요약 실패:', error)
          alert('피드백 요약에 실패했습니다. 다시 시도해주세요.')
          return
        })
    } else {
      handleNextPhase(periodId, action)
    }
  }

  // 프로세스 버튼 렌더링
  const renderProcessButtons = (period: EvaluationPeriod) => {
    const buttons = []
    const isCurrentlyProcessing =
      currentProcessingPeriod === period.periodId && isGeneratingReport

    const isPeerEvaluationNotCompleted = isNotCompleted.includes(
      period.periodId
    )

    if (period.isFinal) {
      // 최종 평가 프로세스
      if (period.currentStep === 0) {
        buttons.push(
          <button
            key="NOT_STARTED"
            onClick={() =>
              handleProcessStep(period.periodId, 'NOT_STARTED', true)
            }
            className="px-4 py-2 text-white rounded-lg font-medium bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-colors"
          >
            동료 평가 시작
          </button>
        )
      } else if (period.currentStep === 1) {
        buttons.push(
          <button
            key="PEER_EVALUATION"
            onClick={() =>
              handleProcessStep(period.periodId, 'PEER_EVALUATION', true)
            }
            disabled={isCurrentlyProcessing || isPeerEvaluationNotCompleted}
            className={`px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 text-sm font-medium transition-colors active:bg-orange-700
              ${
                isPeerEvaluationNotCompleted
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }
              `}
          >
            {isCurrentlyProcessing ? '생성 중...' : '중간 평가 레포트 생성'}
          </button>
        )
      } else if (period.currentStep === 2) {
        buttons.push(
          <button
            key="MIDDLE_REPORT"
            onClick={() =>
              handleProcessStep(period.periodId, 'MIDDLE_REPORT', true)
            }
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium transition-colors active:bg-green-700"
          >
            팀장 평가 시작
          </button>
        )
      } else if (period.currentStep === 3) {
        buttons.push(
          <button
            key="MANAGER_EVALUATION"
            onClick={() =>
              handleProcessStep(period.periodId, 'MANAGER_EVALUATION', true)
            }
            disabled={isCurrentlyProcessing || isPeerEvaluationNotCompleted}
            className={`px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-400 text-sm font-medium transition-colors active:bg-purple-700 ${
              isPeerEvaluationNotCompleted
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            {isCurrentlyProcessing ? '생성 중...' : '연말 레포트 생성'}
          </button>
        )
      } else if (period.currentStep === 4) {
        buttons.push(
          <button
            key="REPORT_GENERATION"
            onClick={() =>
              handleProcessStep(period.periodId, 'REPORT_GENERATION', true)
            }
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium transition-colors active:bg-red-700"
          >
            팀원 이의제기 시작
          </button>
        )
      } else if (
        period.currentStep === 5 &&
        period.periodPhase === 'EVALUATION_FEEDBACK'
      ) {
        buttons.push(
          <button
            key="EVALUATION_FEEDBACK"
            onClick={() =>
              handleProcessStep(period.periodId, 'EVALUATION_FEEDBACK', true)
            }
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm font-medium transition-colors active:bg-gray-700"
          >
            팀원 이의제기 종료
          </button>
        )
      }
    } else {
      // 분기 평가 프로세스
      if (period.currentStep === 0) {
        buttons.push(
          <button
            key="NOT_STARTED"
            onClick={() =>
              handleProcessStep(period.periodId, 'NOT_STARTED', false)
            }
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium transition-colors active:bg-blue-700"
            disabled={isCurrentlyProcessing}
          >
            동료 평가 시작
          </button>
        )
      } else if (period.currentStep === 1) {
        buttons.push(
          <button
            key="PEER_EVALUATION"
            onClick={() =>
              handleProcessStep(period.periodId, 'PEER_EVALUATION', false)
            }
            disabled={isCurrentlyProcessing || isPeerEvaluationNotCompleted}
            className={`px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 text-sm font-medium transition-colors active:bg-orange-700
              ${
                isPeerEvaluationNotCompleted
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }
              `}
          >
            {isCurrentlyProcessing ? '생성 중...' : '분기 레포트 생성'}
          </button>
        )
      }
    }

    return buttons
  }

  // 상태 표시 색상
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-600'
      case 'peer-evaluation':
        return 'bg-blue-100 text-blue-600'
      case 'leader-evaluation':
        return 'bg-green-100 text-green-600'
      case 'objection':
        return 'bg-red-100 text-red-600'
      case 'completed':
        return 'bg-purple-100 text-purple-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'NOT_STARTED':
        return '대기중'
      case 'PEER_EVALUATION':
        return '동료평가 진행'
      case 'MIDDLE_REPORT':
        return '중간 레포트 생성'
      case 'MANAGER_EVALUATION':
        return '팀장평가 진행'
      case 'REPORT_GENERATION':
        return '리포트 생성'
      case 'EVALUATION_FEEDBACK':
        return '이의제기 진행'
      case 'COMPLETED':
        return '완료'
      default:
        return '알 수 없음'
    }
  }

  const formatDate = (date: Date): string => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return '날짜를 선택하세요'
    }
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(date.getDate()).padStart(2, '0')}`
  }

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
        { type: '팀원 간 평가 기간', period: '날짜를 선택해주세요' },
        { type: '팀장 평가 기간', period: '날짜를 선택해주세요' },
        { type: '팀원 이의제기 기간', period: '날짜를 선택해주세요' },
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
        type: '팀원 간 평가 기간',
        period: `${formatDateKorean(teamEvalStart)}부터 ${formatDateKorean(
          teamEvalEnd
        )}까지`,
      },
      {
        type: '팀장 평가 기간',
        period: `${formatDateKorean(leaderEvalStart)}부터 ${formatDateKorean(
          leaderEvalEnd
        )}까지`,
      },
      {
        type: '팀원 이의제기 기간',
        period: `${formatDateKorean(objectionStart)}부터 ${formatDateKorean(
          objectionEnd
        )}까지`,
      },
    ]
  }, [startDate, endDate])

  // 달력 컴포넌트
  const CalendarComponent: React.FC<{
    selectedDate: Date
    onDateSelect: (date: Date) => void
    onClose: () => void
    type: 'start' | 'end'
  }> = ({ selectedDate, onDateSelect, onClose, type }) => {
    const [currentMonth, setCurrentMonth] = useState(() => {
      if (
        selectedDate &&
        selectedDate instanceof Date &&
        !isNaN(selectedDate.getTime())
      ) {
        return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      }
      return new Date()
    })

    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    const renderCalendar = () => {
      const daysInMonth = getDaysInMonth(currentMonth)
      const firstDay = getFirstDayOfMonth(currentMonth)
      const days = []

      // 빈 칸 추가
      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-10"></div>)
      }

      // 날짜 추가
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          day
        )
        const isSelected =
          selectedDate &&
          selectedDate instanceof Date &&
          !isNaN(selectedDate.getTime()) &&
          date.toDateString() === selectedDate.toDateString()
        const isToday = date.toDateString() === new Date().toDateString()

        days.push(
          <button
            key={day}
            onClick={() => {
              onDateSelect(date)
              onClose()
            }}
            className={`h-10 w-10 rounded-lg flex items-center justify-center text-sm transition-colors ${
              isSelected
                ? 'bg-blue-500 text-white'
                : isToday
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100'
            }`}
          >
            {day}
          </button>
        )
      }

      return days
    }

    const prevMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
      )
    }

    const nextMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
      )
    }

    return (
      <div
        className={`absolute top-full ${
          type === 'start'
            ? 'right-[-1rem] top-[-22rem]'
            : 'right-[-1rem] top-[-22rem]'
        } mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-80`}
      >
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="font-semibold text-gray-800">
            {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
          </h3>
          <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <div
              key={day}
              className="h-8 flex items-center justify-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
      </div>
    )
  }

  const fetchAvailablePeriods = async () => {
    try {
      const periods = await AdminService.getAvailablePeriod()
      if (periods && periods.length > 0) {
        const formattedPeriods: EvaluationPeriod[] = periods.map(
          (period: any) => ({
            periodId: period.periodId,
            periodName: period.periodName,
            isFinal: period.isFinal,
            startDate: period.startDate,
            endDate: period.endDate,
            periodPhase: period.periodPhase,
            currentStep: period.isFinal
              ? period.periodPhase === 'NOT_STARTED'
                ? 0
                : period.periodPhase === 'PEER_EVALUATION'
                ? 1
                : period.periodPhase === 'MIDDLE_REPORT'
                ? 2
                : period.periodPhase === 'MANAGER_EVALUATION'
                ? 3
                : period.periodPhase === 'REPORT_GENERATION'
                ? 4
                : period.periodPhase === 'EVALUATION_FEEDBACK'
                ? 5
                : period.periodPhase === 'COMPLETED'
                ? 6
                : 0
              : period.periodPhase === 'NOT_STARTED'
              ? 0
              : period.periodPhase === 'PEER_EVALUATION'
              ? 1
              : 2,
            totalSteps: period.isFinal ? 6 : 2,
          })
        )
        setEvaluationPeriods(formattedPeriods)
      } else {
        console.log('현재 진행 중인 평가 기간이 없습니다.')
      }
    } catch (error) {
      console.error('평가 기간 조회 실패:', error)
    }
  }

  const fetchIsPeerEvaluationCompleted = async (
    periodId: number
  ): Promise<boolean> => {
    try {
      const isCompleted = await AdminService.isPeerEvaluationCompleted(periodId)
      return isCompleted
    } catch (error) {
      console.error('동료 평가 완료 여부 조회 실패:', error)
      return false
    }
  }
  const fetchIsTeamEvaluationSubmitted = async (
    periodId: number
  ): Promise<boolean> => {
    try {
      const isSubmitted = await AdminService.isTeamEvaluationSubmitted(periodId)
      return isSubmitted
    } catch (error) {
      console.error('팀원 평가 제출 여부 조회 실패:', error)
      return false
    }
  }

  useEffect(() => {
    // periodPhase가 PEER_EVALUATION인 경우 해당 기간의 동료 평가가 완료됐는지 확인
    const checkPeerEvaluationCompletion = async () => {
      const notCompleted: number[] = []
      for (const period of evaluationPeriods) {
        if (period.periodPhase === 'PEER_EVALUATION') {
          const isCompleted = await fetchIsPeerEvaluationCompleted(
            period.periodId
          )
          if (!isCompleted) {
            notCompleted.push(period.periodId)
          }
        } else if (period.periodPhase === 'MANAGER_EVALUATION') {
          const isSubmitted = await fetchIsTeamEvaluationSubmitted(
            period.periodId
          )
          if (!isSubmitted) {
            notCompleted.push(period.periodId)
          }
        }
      }
      setIsNotCompleted(notCompleted)
    }
    checkPeerEvaluationCompletion()
  }, [evaluationPeriods])

  useEffect(() => {
    setEvaluationPeriods([])
    // [관리자] 올해 개인 TASK 생성 여부 확인
    AdminService.isTaskGenerated()
      .then((isGenerated) => {
        if (isGenerated) {
          setKpiGeneratedYear(currentYear)
          setIsKpiGenerated(true)
        }
      })
      .catch((error) => {
        console.error('KPI 생성 여부 확인 실패:', error)
      })

    fetchAvailablePeriods()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Header title="관리자 페이지" />

      <div className="flex-1 flex  min-h-0">
        <div className="flex lg:flex-row flex-col px-10 pb-5 flex-1 min-h-0">
          <div className="lg:flex-[3] mb-4 lg:mb-4 lg:mr-4 flex flex-col h-full min-h-[fit-content] lg:min-h-0">
            {/* 1. 개인 KPI 관리 카드 */}
            <div className="">
              {/* <h2 className="font-semibold mb-2">
                {currentYear}년도 개인 KPI 관리
              </h2> */}

              <div className="flex items-center justify-between mb-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 p-4">
                <div className="flex items-center space-x-3">
                  {isKpiGenerated ? (
                    <>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-md font-semibold text-green-700">
                          Task 생성 완료
                        </h3>
                        <p className="text-sm text-green-600">
                          {currentYear}년도 개인 Task가 설정되었습니다
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-md font-semibold text-amber-700">
                          Task 생성 필요
                        </h3>
                        <p className="text-sm text-amber-600">
                          {currentYear}년도 개인 Task를 생성해주세요
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={generatePersonalKPI}
                  disabled={isKpiGenerated || isGeneratingKPI}
                  className={`px-5 py-4 rounded-xl font-semibold transition-all duration-300 transform ${
                    isKpiGenerated
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : isGeneratingKPI
                      ? 'text-white cursor-not-allowed scale-95 bg-blue-300'
                      : 'text-white shadow-lg hover:shadow-xl bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
                  }`}
                >
                  {isGeneratingKPI ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>생성 중...</span>
                    </div>
                  ) : isKpiGenerated ? (
                    `${currentYear}년도 Task 생성 완료`
                  ) : (
                    `${currentYear}년도 개인 Task 생성`
                  )}
                </button>
              </div>
            </div>

            {/* 2. 평가 시기 관리 카드 */}
            <div className="flex-1 flex flex-col">
              <h2 className="font-semibold mb-2">평가 시기 관리</h2>

              <div className="flex-1 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                  {/* 왼쪽: 평가 설정 */}
                  <div className="space-y-6 flex flex-col h-full">
                    {/* 날짜 선택 */}
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 shadow-md flex-[2]">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        평가 기간 설정
                      </h3>

                      <div className="">
                        <div className="flex mb-4 items-center relative">
                          <label className="block text-sm font-semibold text-gray-700 w-16">
                            시작일
                          </label>
                          <button
                            onClick={() => {
                              setShowStartCalendar(!showStartCalendar)
                              setShowEndCalendar(false)
                            }}
                            className="w-full p-4 bg-white border border-gray-300 rounded-lg text-left hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-gray-900 font-medium text-sm">
                                {formatDate(startDate)}
                              </span>
                              <Calendar className="w-5 h-5 text-gray-400" />
                            </div>
                          </button>
                          {showStartCalendar && (
                            <CalendarComponent
                              selectedDate={startDate}
                              onDateSelect={setStartDate}
                              onClose={() => setShowStartCalendar(false)}
                              type="start"
                            />
                          )}
                        </div>

                        <div className="flex items-center relative">
                          <label className="block text-sm font-semibold text-gray-700 w-16">
                            종료일
                          </label>
                          <button
                            onClick={() => {
                              setShowEndCalendar(!showEndCalendar)
                              setShowStartCalendar(false)
                            }}
                            className="w-full p-4 bg-white border border-gray-300 rounded-lg text-left hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-gray-900 font-medium text-sm">
                                {formatDate(endDate)}
                              </span>
                              <Calendar className="w-5 h-5 text-gray-400" />
                            </div>
                          </button>
                          {showEndCalendar && (
                            <CalendarComponent
                              selectedDate={endDate}
                              onDateSelect={setEndDate}
                              onClose={() => setShowEndCalendar(false)}
                              type="end"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 유형 선택 */}
                    <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl p-4 shadow-md flex-[3]">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <BarChart3 className="w-4 h-4 text-purple-600" />
                        </div>
                        평가 유형 선택
                      </h3>

                      <div className="space-y-4">
                        <label className="flex items-center p-4 bg-white rounded-lg border-2 border-gray-200 cursor-pointer hover:border-purple-300 transition-colors">
                          <input
                            type="radio"
                            name="evaluationType"
                            value="quarterly"
                            checked={evaluationType === 'quarterly'}
                            onChange={(e) => setEvaluationType(e.target.value)}
                            className="sr-only"
                          />
                          <div
                            className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                              evaluationType === 'quarterly'
                                ? 'border-purple-500 bg-purple-500'
                                : 'border-gray-300'
                            }`}
                          >
                            {evaluationType === 'quarterly' && (
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 mb-1">
                              분기별 평가
                            </div>
                            <div className="text-gray-600 text-sm">
                              동료 평가 → 분기 레포트 생성
                            </div>
                          </div>
                        </label>

                        <label className="flex items-center p-4 bg-white rounded-lg border-2 border-gray-200 cursor-pointer hover:border-purple-300 transition-colors">
                          <input
                            type="radio"
                            name="evaluationType"
                            value="comprehensive"
                            checked={evaluationType === 'comprehensive'}
                            onChange={(e) => setEvaluationType(e.target.value)}
                            className="sr-only"
                          />
                          <div
                            className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                              evaluationType === 'comprehensive'
                                ? 'border-purple-500 bg-purple-500'
                                : 'border-gray-300'
                            }`}
                          >
                            {evaluationType === 'comprehensive' && (
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 mb-1">
                              최종 평가
                            </div>
                            <div className="text-gray-600 text-sm">
                              동료 평가 → 중간 레포트 → <br />
                              팀장 평가 → 연말 레포트 → 이의제기
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* 오른쪽: 평가 일정 미리보기 */}
                  <div className="space-y-6 flex flex-col h-full">
                    <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl p-4 shadow-md flex-1 flex flex-col">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <div className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                          <Users className="w-4 h-4 text-indigo-600" />
                        </div>
                        평가 일정 미리보기
                      </h3>

                      <div className="space-y-4 flex-1 overflow-auto mb-2">
                        {evaluationSchedule.map((item, index) => (
                          <div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                          >
                            <div className="font-semibold text-gray-900 mb-2">
                              {item.type}
                            </div>
                            <div className="text-sm">{item.period}</div>
                          </div>
                        ))}
                      </div>

                      {/* 평가 생성 버튼 */}
                      <button
                        onClick={handleCreateEvaluation}
                        className="w-full px-8 py-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300"
                      >
                        평가 생성하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. 현재 진행 중인 평가 */}
          <div className="lg:flex-[2] bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col">
            <div className="bg-gradient-to-r from-indigo-400 to-indigo-400 p-6 py-5 text-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Activity className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold mb-1">
                      현재 진행 중인 평가
                    </h2>
                    <p className="text-blue-100 text-sm">
                      평가 프로세스 관리 및 모니터링
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mr-[-0.5rem]">
                  <div className="text-right">
                    <div className="text-3xl font-bold">
                      {evaluationPeriods.length}
                    </div>
                    <div className="text-blue-100 text-sm">총 평가 수</div>
                  </div>
                  <button
                    className="p-2 bg-black/20 rounded-[100%] backdrop-blur-sm hover:bg-black/30 transition-colors active:bg-black/40"
                    onClick={fetchAvailablePeriods}
                  >
                    <RefreshCw className="w-7 h-7" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 py-4 space-y-6 overflow-auto flex-1">
              {evaluationPeriods.map((period) => (
                <div
                  key={period.periodId}
                  className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 py-4 shadow-md"
                >
                  <div className="flex items-center justify-between mb-3 w-full">
                    <div className="w-full">
                      <div className="flex items-start  space-x-2 justify-between">
                        <div>
                          <div className="flex items-center space-x-3 mb-3">
                            <span
                              className={`px-3 py-1 ${
                                period.isFinal
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-blue-100 text-blue-800'
                              } rounded-full text-xs font-medium`}
                            >
                              {period.isFinal ? '최종 평가' : '분기 평가'}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                period.periodPhase
                              )}`}
                            >
                              {getStatusText(period.periodPhase)}
                            </span>
                          </div>

                          <h3 className="text-xl font-semibold text-gray-900">
                            {period.periodName}
                          </h3>

                          <span className="text-gray-600 text-xs font-semibold">
                            {period.startDate} ~ {period.endDate}
                          </span>
                        </div>
                        {/* 프로세스 버튼들 */}
                        <div className="flex flex-wrap gap-3">
                          {renderProcessButtons(period)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 진행도 시각화 */}
                  <div className="">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-700">
                        진행도
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-blue-600">
                          {period.currentStep}
                        </span>
                        <span className="text-gray-500">/</span>
                        <span className="text-lg font-semibold text-gray-500">
                          {period.totalSteps}
                        </span>
                      </div>
                    </div>

                    <div className="relative">
                      {/* 메인 진행바 */}
                      <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                        <div
                          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-4 rounded-full transition-all duration-1000 ease-out relative overflow-hidden shadow-lg"
                          style={{
                            width: `${
                              (period.currentStep / period.totalSteps) * 100
                            }%`,
                          }}
                        >
                          {/* 애니메이션 효과 */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 transform -skew-x-12 animate-pulse"></div>
                          {/* <div className="absolute right-0 top-0 w-2 h-full bg-white/30 animate-pulse"></div> */}
                        </div>
                      </div>

                      {/* 단계 표시점들 */}
                      <div
                        className={`flex justify-between mt-3 ${
                          period.isFinal ? 'mx-[-1.1rem]' : 'mx-[-1.1rem]'
                        }`}
                      >
                        {Array.from(
                          { length: period.totalSteps + 1 },
                          (_, i) => (
                            <div
                              key={i}
                              className="flex flex-col items-center w-14"
                            >
                              <div
                                className={`w-4 h-4 rounded-full transition-all duration-500 ${
                                  i < period.currentStep
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg scale-110'
                                    : i === period.currentStep
                                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse shadow-md scale-105'
                                    : 'bg-gray-300'
                                }`}
                              />
                              <div className="text-xs text-gray-500 mt-2 font-medium ">
                                {i === 0 && '시작'}
                                {i > 0 &&
                                  `${
                                    period.isFinal
                                      ? [
                                          '동료 평가',
                                          '중간 레포트',
                                          '팀장 평가',
                                          '연말 레포트',
                                          '이의제기',
                                          '완료',
                                        ][i - 1]
                                      : ['동료 평가', '분기 레포트'][i - 1]
                                  }`}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 현재 처리 중인 모듈 표시 */}
                  {currentProcessingPeriod === period.periodId &&
                    isGeneratingReport && (
                      <div className="bg-white rounded-xl border border-gray-200 p-6 py-5 mt-3 mx-[-0.5rem]">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3"></div>
                            레포트 생성 진행 중
                          </h4>
                          <span className="text-blue-600 font-medium">
                            {
                              reportModules.filter(
                                (m) => m.status === 'completed'
                              ).length
                            }{' '}
                            / {reportModules.length} 완료
                          </span>
                        </div>

                        <div className="space-y-3">
                          {reportModules.map((module) => (
                            <div
                              key={module.id}
                              className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  module.status === 'completed'
                                    ? 'bg-green-100'
                                    : module.status === 'processing'
                                    ? 'bg-blue-100'
                                    : 'bg-gray-100'
                                }`}
                              >
                                {module.status === 'completed' ? (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                ) : module.status === 'processing' ? (
                                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <Clock className="w-5 h-5 text-gray-400" />
                                )}
                              </div>

                              <div className="flex-1">
                                <span
                                  className={`font-medium ${
                                    module.status === 'completed'
                                      ? 'text-green-700'
                                      : module.status === 'processing'
                                      ? 'text-blue-700'
                                      : 'text-gray-600'
                                  }`}
                                >
                                  {module.name}
                                </span>
                              </div>

                              <div
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  module.status === 'completed'
                                    ? 'bg-green-100 text-green-700'
                                    : module.status === 'processing'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {module.status === 'completed'
                                  ? '완료'
                                  : module.status === 'processing'
                                  ? '처리중'
                                  : '대기중'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
