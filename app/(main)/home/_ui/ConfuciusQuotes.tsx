'use client'
import { QuotesWithPrompt } from '@/features/quotesWithPrompt'
import { DpQueryKeys } from '@/shared/api'

export const ConfuciusQuotes = () => {
  return (
    <div className="w-full">
      <h1 className="mb-6 text-left text-2xl font-bold text-gray-800">
        논어 명언 이야기
      </h1>
      <QuotesWithPrompt queryKey={DpQueryKeys.app.home.quoteList} />
    </div>
  )
}
