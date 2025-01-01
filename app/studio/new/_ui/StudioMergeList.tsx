import { QuoteListCard } from '@/entities/quotes'
import { useStore } from '@/shared/store'
import { ScrollArea, ScrollBar } from '@/shared/ui'

export const StudioMergeList = () => {
  const items = useStore('studio', (s) => s.mergingItems)

  return (
    <div className="flex w-full flex-col gap-2">
      <div>
        <h3 className="text-lg font-bold">Merges</h3>
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
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
