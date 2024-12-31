import type { IQuoteListProps } from '@/entities/quotes'
import type { OverlayProps } from '@/shared/lib/overlay'

import { QuoteList } from '@/entities/quotes'
import { DpQueryKeys } from '@/shared/api'
import { Sheet, SheetContent, SheetTitle } from '@/shared/ui'

export const StudioQuoteOverlay = ({
  isOpen,
  close,
  onSelectQuote,
}: Pick<IQuoteListProps, 'onSelectQuote'> & OverlayProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent>
        <SheetTitle>Quotes</SheetTitle>
        <QuoteList
          onSelectQuote={onSelectQuote}
          getQuoteListQueryKey={DpQueryKeys.studio.new.quoteList}
        />
      </SheetContent>
    </Sheet>
  )
}
