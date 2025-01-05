import type { IQuote } from '@/shared/types'

import { Book } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui'

export function QuoteWithContent({
  quote,
  bottomContent,
}: {
  quote: IQuote | null
  bottomContent?: (quote: IQuote) => JSX.Element
}) {
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
          {quote.originalText}
        </CardTitle>
        <CardDescription className="whitespace-pre-line text-lg italic text-gray-600">
          {quote.koreanText}
        </CardDescription>
      </CardHeader>
      {bottomContent && bottomContent(quote)}
    </Card>
  )
}
