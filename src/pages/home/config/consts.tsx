import type { ReactNode } from 'react'

import { Circle, Crown, Grid2X2, Quote } from 'lucide-react'

export interface QuickStartItem {
  color: string
  href: string
  icon: ReactNode
  label: string
  isAI?: boolean
}

export const quickStartItems: QuickStartItem[] = [
  {
    color: 'bg-purple-500',
    href: '/dailyQuote',
    icon: <Quote className="h-6 w-6" />,
    isAI: true,
    label: '오늘의 문장',
  },
  {
    color: 'bg-indigo-500',
    href: '/omok',
    icon: <Grid2X2 className="h-6 w-6" />,
    isAI: true,
    label: '오목 배틀',
  },
  {
    color: 'bg-slate-600',
    href: '/baduk',
    icon: <Circle className="h-6 w-6" />,
    isAI: true,
    label: '바둑 배틀',
  },
  {
    color: 'bg-amber-700',
    href: '/chess',
    icon: <Crown className="h-6 w-6" />,
    isAI: true,
    label: '체스 배틀',
  },
  // {
  //   color: 'bg-blue-500',
  //   icon: <MessageSquare className="h-6 w-6" />,
  //   label: '채팅',
  // },
  // {
  //   color: 'bg-green-500',
  //   icon: <Calendar className="h-6 w-6" />,
  //   label: '캘린더',
  // },
  // {
  //   color: 'bg-amber-500',
  //   icon: <Zap className="h-6 w-6" />,
  //   label: '습관',
  // },
  // {
  //   color: 'bg-pink-500',
  //   icon: <LayoutGrid className="h-6 w-6" />,
  //   label: '대시보드',
  // },
  // {
  //   color: 'bg-gray-500',
  //   icon: <Settings className="h-6 w-6" />,
  //   label: '설정',
  // },
]
