import type { IQuoteListProps } from '@/entities/quotes'

import { QuoteList } from '@/entities/quotes'
import { DpQueryKeys } from '@/shared/api'

export const StudioQuoteList = ({
  onSelectQuote,
}: Pick<IQuoteListProps, 'onSelectQuote'>) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <div>
        <h3 className="text-lg font-bold">Quotes</h3>
      </div>
      <QuoteList
        onSelectQuote={onSelectQuote}
        getQuoteListQueryKey={DpQueryKeys.studio.new.quoteList}
      />
    </div>
  )
}
