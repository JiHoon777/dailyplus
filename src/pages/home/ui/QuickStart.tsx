import type { QuickStartItem } from '../constants/quickStartItems'

import Link from 'next/link'

import { Badge } from '@/shared/ui/badge'
import { Card, CardContent } from '@/shared/ui/card'

export const QuickStart = ({ items }: { items: QuickStartItem[] }) => {
  return (
    <div className={'flex w-full flex-col gap-6'}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">빠른 실행</h3>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-6">
        {items.map((item, index) => (
          <Card
            key={index}
            className="group cursor-pointer overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <CardContent className="p-4">
              <Link href={item.href} className="flex items-center gap-3">
                <div className="relative">
                  <div className={`rounded-lg p-2 ${item.color} text-white`}>
                    {item.icon}
                  </div>
                  {item.isAI && (
                    <Badge
                      variant={'outline'}
                      className="absolute -right-2.5 -top-2.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-sm"
                    >
                      Ai
                    </Badge>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
