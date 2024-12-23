'use client'
import Link from 'next/link'

import { QuotesWithPrompt } from '@/features/quotesWithPrompt'
import { DpQueryKeys } from '@/shared/api'

export const ConfuciusQuotes = () => {
  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between text-left">
        <h1 className="text-2xl font-bold text-gray-800">공자 명언 이야기</h1>
        <Link href="/">more</Link>
      </div>
      <QuotesWithPrompt
        quotePeopleName="공자"
        queryKey={DpQueryKeys.app.home.quoteList}
      />
    </div>
  )
}