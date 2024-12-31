import { QuoteListCard } from '@/entities/quotes'
import { useStore } from '@/shared/store'

export const StudioMergeList = () => {
  const items = useStore('studio', (s) => s.mergingItems)

  return (
    <div className="flex w-full flex-col gap-2">
      <div>
        <h3 className="text-lg font-bold">Merges</h3>
      </div>
      <div className="flex w-full gap-2">
        {items.map((item) => {
          if (item.type === 'quote') {
            return (
              <QuoteListCard
                onClick={() => {}}
                key={item.data.id}
                quote={item.data}
              />
            )
          }

          return <div key={item.data.id}>{item.data.title}</div>
        })}
      </div>
    </div>
  )
}
