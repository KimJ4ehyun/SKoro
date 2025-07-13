import {
  Home,
  Target,
  Dumbbell,
  FileText,
  PenTool,
  Flag,
  Goal,
} from 'lucide-react'
import type { NavItem } from '../types/Navbar.types'

export const managerNavItems: NavItem[] = [
  { id: 'home', icon: Home, label: '홈', path: '/' },
  { id: 'teamGoal', icon: Flag, label: '팀 목표', path: '/team-goal' },
  {
    id: 'team',
    icon: Target,
    label: '팀 관리',
    path: '/team',
  },
  {
    id: 'feedback',
    icon: Dumbbell,
    label: '분기별 피드백',
    path: '/feedback',
  },
  {
    id: 'final',
    icon: FileText,
    label: '연말 최종평가',
    path: '/final',
  },
  {
    id: 'evaluation',
    icon: PenTool,
    label: '최종평가 시스템',
    path: '/evaluation',
  },
]

export const memberNavItems: NavItem[] = [
  { id: 'home', icon: Home, label: '홈', path: '/' },
  { id: 'teamGoal', icon: Flag, label: '팀 목표', path: '/team-goal' },
  {
    id: 'feedback',
    icon: Dumbbell,
    label: '분기별 피드백',
    path: '/feedback',
  },
  {
    id: 'final',
    icon: FileText,
    label: '연말 최종평가',
    path: '/final',
  },
  {
    id: 'evaluation',
    icon: PenTool,
    label: '동료 평가 시스템',
    path: '/peertalk',
  },
]

export const adminNavItems: NavItem[] = [
  { id: 'home', icon: Home, label: '홈', path: '/' },
  { id: 'logic', icon: Goal, label: '평가 로직', path: '/logic' },
]
