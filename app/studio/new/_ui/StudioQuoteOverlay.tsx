import type { OverlayProps } from '@/shared/lib/overlay'

import { QuoteList } from '@/entities/quotes'
import { DpQueryKeys } from '@/shared/api'
import { useStore } from '@/shared/store'
import { Sheet, SheetContent, SheetTitle } from '@/shared/ui'

export const StudioQuoteOverlay = ({ isOpen, close }: OverlayProps) => {
  const append = useStore('studio').getState().appendItem

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent className="p-0">
        <SheetTitle className="p-4">Quotes</SheetTitle>

        <div className="h-full w-full">
          <QuoteList
            direction="col"
            onSelectQuote={(q) =>
              append({
                type: 'quote',
                data: q,
              })
            }
            getQuoteListQueryKey={DpQueryKeys.studio.new.quoteList}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
