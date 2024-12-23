import type { IQuoteListProps } from '@/entities/quotes'
import type { IQuotes } from '@/shared/types'

import { useState } from 'react'

import { QuoteCard, QuoteList } from '@/entities/quotes'

export const QuotesWithPrompt = ({
  queryKey,
}: Pick<IQuoteListProps, 'queryKey'>) => {
  const [selectedQuote, setSelectedQuote] = useState<IQuotes | null>(null)

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-1/2">
          <QuoteCard quote={selectedQuote} />
        </div>
        <div className="h-[600px] w-full bg-gray-300 md:w-1/2">
          {/* <ConfuciusChat selectedQuote={selectedQuote} /> */}
        </div>
      </div>
      <div className="w-full">
        <QuoteList onSelectQuote={setSelectedQuote} queryKey={queryKey} />
      </div>
    </div>
  )
}
