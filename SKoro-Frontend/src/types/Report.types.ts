export interface Tab {
  id: string
  label: string
  content: string
}

export interface FeedbackReportProps {
  selectedYear?: string
  selectedRating?: string
  memberName?: string
  type: 'feedback' | 'final' | 'evaluation' | 'memberEvaluation'
  selectedPeriod?: {
    periodId: number
    year: number
    periodName: string
    unit: 'QUARTER' | string // 다른 단위가 있다면 추가
    orderInYear: number
    startDate: string
    endDate: string
    final: boolean
  } | null
  evaluationReasons?: any[]
  memberEmpNo?: string
  periodId?: number
  viewerType?: 'manager' | ''
}
