import type { ReactNode } from 'react'

import { FileQuestion, Quote } from 'lucide-react'

export interface QuickStartItem {
  color: string
  href: string
  icon: ReactNode
  label: string
  isAI?: boolean
  todo?: boolean
}

export const quickStartItems: QuickStartItem[] = [
  {
    color: 'bg-emerald-500',
    href: '/daily-quote',
    icon: <Quote className="h-6 w-6" />,
    isAI: true,
    label: '오늘의 문장',
    todo: true,
  },
  {
    color: 'bg-amber-700',
    href: '/daily-english-quote',
    icon: <FileQuestion className="h-6 w-6" />,
    isAI: true,
    label: '오늘의 영어 문장',
    todo: true,
  },

  {
    color: 'bg-amber-700',
    href: '/chess',
    icon: <FileQuestion className="h-6 w-6" />,
    isAI: true,
    label: '만다라트',
    todo: true,
  },
  // {
  //   color: 'bg-amber-700',
  //   href: '/chess',
  //   icon: <FileQuestion className="h-6 w-6" />,
  //   isAI: true,
  //   label: '마인드맵',
  //   todo: true,
  // },
  // {
  //   color: 'bg-amber-700',
  //   href: '/chess',
  //   icon: <FileQuestion className="h-6 w-6" />,
  //   isAI: true,
  //   label: '로직트리',
  //   todo: true,
  // },
  // {
  //   color: 'bg-amber-700',
  //   href: '/chess',
  //   icon: <FileQuestion className="h-6 w-6" />,
  //   isAI: true,
  //   label: '블로그',
  //   todo: true,
  // },
  // {
  //   color: 'bg-indigo-500',
  //   href: '/omok',
  //   icon: <Grid2X2 className="h-6 w-6" />,
  //   isAI: true,
  //   label: '오목 배틀',
  // },
  // {
  //   color: 'bg-slate-600',
  //   href: '/baduk',
  //   icon: <Circle className="h-6 w-6" />,
  //   isAI: true,
  //   label: '바둑 배틀',
  // },
  // {
  //   color: 'bg-amber-700',
  //   href: '/chess',
  //   icon: <Crown className="h-6 w-6" />,
  //   isAI: true,
  //   label: '체스 배틀',
  // },
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
