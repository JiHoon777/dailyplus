import type { IQuoteListProps } from '@/entities/quotes'
import type { IQuotes } from '@/shared/types'

import { useState } from 'react'

import { QuoteInterpretation } from '@/entities/quoteInterpretations/ui/QuoteInterpretation'
import { QuoteList, QuoteWithContent } from '@/entities/quotes'

export const QuotesInteractive = ({
  queryKey,
}: Pick<IQuoteListProps, 'queryKey' | 'quotePeopleName'>) => {
  const [selectedQuote, setSelectedQuote] = useState<IQuotes | null>(null)

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-1/2">
          <QuoteWithContent
            quote={selectedQuote}
            bottomContent={(quote) => <QuoteInterpretation quote={quote} />}
          />
        </div>
        <div className="h-[40vh] w-full bg-gray-300 md:w-1/2">
          {/* <ConfuciusChat selectedQuote={selectedQuote} /> */}
        </div>
      </div>
      <div className="w-full">
        <QuoteList onSelectQuote={setSelectedQuote} queryKey={queryKey} />
      </div>
    </div>
  )
}
