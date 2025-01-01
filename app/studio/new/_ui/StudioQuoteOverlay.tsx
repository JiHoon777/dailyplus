import type { OverlayProps } from '@/shared/lib/overlay'
import type { IQuotes } from '@/shared/types'

import { QuoteList } from '@/entities/quotes'
import { DpQueryKeys } from '@/shared/api'
import { useStore } from '@/shared/store'
import { Sheet, SheetContent, SheetTitle } from '@/shared/ui'

export const StudioQuoteOverlay = ({ isOpen, close }: OverlayProps) => {
  const append = useStore('studio').getState().appendItem

  const handleSelectQuote = (quote: IQuotes) =>
    append({
      type: 'quote',
      data: quote,
    })

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent className="p-0">
        <SheetTitle className="p-4">Quotes</SheetTitle>

        <div className="h-full w-full">
          <QuoteList
            direction="col"
            onSelectQuote={handleSelectQuote}
            getQuoteListQueryKey={DpQueryKeys.studio.new.quoteList}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
