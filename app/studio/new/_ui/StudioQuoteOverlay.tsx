import type { IQuoteListProps } from '@/entities/quotes'
import type { OverlayProps } from '@/shared/lib/overlay'

import { QuoteList } from '@/entities/quotes'
import { DpQueryKeys } from '@/shared/api'

export const StudioQuoteOverlay = ({
  isOpen,
  close,
  onSelectQuote,
}: Pick<IQuoteListProps, 'onSelectQuote'> & OverlayProps) => {
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
