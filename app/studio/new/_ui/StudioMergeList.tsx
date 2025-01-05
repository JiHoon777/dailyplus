import { PlusCircle } from 'lucide-react'

import { QuoteListCard } from '@/entities/quotes'
import { useOverlay } from '@/shared/lib/overlay'
import { useStore } from '@/shared/store'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ScrollArea,
  ScrollBar,
} from '@/shared/ui'

import { StudioQuoteOverlay } from './StudioQuoteOverlay'

export const StudioMergeList = () => {
  const items = useStore('studio', (s) => s.mergingItems)

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Merges</h3>
        <Dropdown />
      </div>

      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max gap-4 p-4">
          {items.map((item) => {
            if (item.type === 'quote') {
              return (
                <div className="w-full max-w-[15rem]" key={item.data.id}>
                  <QuoteListCard onClick={() => {}} quote={item.data} />
                </div>
              )
            }

            return <div key={item.data.id}>{item.data.title}</div>
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

const Dropdown = () => {
  const { open } = useOverlay()

  const openQuoteList = () => {
    open(({ isOpen, close }) => (
      <StudioQuoteOverlay isOpen={isOpen} close={close} />
    ))
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <PlusCircle />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={openQuoteList}>Add Quotes</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
