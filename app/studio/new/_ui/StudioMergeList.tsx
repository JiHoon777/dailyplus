import type { IStudioMergeItems } from 'app/studio/_types'

export const StudioMergeList = ({ items }: { items: IStudioMergeItems[] }) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <div>
        <h3 className="text-lg font-bold">Merges</h3>
      </div>
      <div className="flex w-full gap-2">
        {items.map((item) => {
          if (item.type === 'quote') {
            return <div key={item.data.id}>{item.data.original_text}</div>
          }

          return <div key={item.data.id}>{item.data.title}</div>
        })}
      </div>
    </div>
  )
}
