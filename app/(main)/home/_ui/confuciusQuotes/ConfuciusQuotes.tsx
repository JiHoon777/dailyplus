'use client'

import { DpQueryKeys } from '@/shared/api'

import { QuotesInteractive } from './QuotesInteractive'

export const ConfuciusQuotes = () => {
  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between text-left">
        <h1 className="text-2xl font-bold text-gray-800">공자 명언 이야기</h1>
        {/* <Link href="/">more</Link> */}
      </div>
      <QuotesInteractive
        quotePeopleName="공자"
        getQuoteListQueryKey={DpQueryKeys.app.home.quoteList}
        getQuoteInterpretationQueryKey={
          DpQueryKeys.app.home.quoteInterpretation
        }
      />
    </div>
  )
}
