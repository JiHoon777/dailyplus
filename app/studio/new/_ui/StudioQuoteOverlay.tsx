import type { IQuoteListProps } from '@/entities/quotes'
import type { OverlayProps } from '@/shared/lib/overlay'

import { QuoteList } from '@/entities/quotes'
import { DpQueryKeys } from '@/shared/api'
import { SheetOverlay } from '@/shared/ui'

export const StudioQuoteOverlay = ({
  isOpen,
  close,
  onSelectQuote,
}: Pick<IQuoteListProps, 'onSelectQuote'> & OverlayProps) => {
  return (
    <SheetOverlay isOpen={isOpen} onClose={close}>
      <div>
        <h3 className="text-lg font-bold">Quotes</h3>
      </div>
      <QuoteList
        onSelectQuote={onSelectQuote}
        getQuoteListQueryKey={DpQueryKeys.studio.new.quoteList}
      />
    </SheetOverlay>
  )
}
