import type { IQuotes } from '@/shared/types'

import { Book } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui'

export function QuoteCard({ quote }: { quote: IQuotes | null }) {
  if (!quote) {
    return (
      <Card className="flex h-full w-full items-center justify-center rounded-lg border border-gray-200 bg-white shadow-md">
        <CardContent>
          <p className="text-center text-gray-500">명언을 선택해주세요.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
      <CardHeader className="bg-gray-50">
        <CardTitle className="flex flex-wrap items-center text-2xl font-bold text-gray-800">
          <Book className="mr-2 text-gray-600" />
          {quote.original_text}
        </CardTitle>
        <CardDescription className="text-lg italic text-gray-600">
          {quote.korean_text}
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-white p-6">
        <div>
          <h4 className="mb-2 text-xl font-semibold text-gray-700">AI 해석:</h4>
          {/* <p className="leading-relaxed text-gray-700">
            {quote.aiInterpretation}
          </p> */}
        </div>
      </CardContent>
    </Card>
  )
}
