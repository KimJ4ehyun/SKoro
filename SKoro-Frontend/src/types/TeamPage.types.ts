export interface TeamMember {
  empNo: string
  empName: string
  profileImage: string
  position: string
  contributionRate: number
  skill: string
  attitude?: string
  score?: number
  ranking: number
  aiAnnualAchievementRate?: number
  aiAchievementRate?: number
}

export interface User {
  name: string
  company: string
  avatar: string
}

// period interface
export interface Period {
  periodId: number
  year: number
  periodName: string
  unit: string
  orderInYear: number
  startDate: string
  endDate: string
  final: boolean
}

export interface HeaderProps {
  title: string
  canGoBack?: boolean
  selectedPeriod?: Period | null
  backUrl?: string
}

export interface DropdownProps {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

export interface SearchBoxProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export interface MemberCardProps {
  member: TeamMember
  isFinal: boolean
  selectedPeriod: any
}
