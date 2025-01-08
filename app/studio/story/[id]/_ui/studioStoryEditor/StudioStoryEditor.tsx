import type { IStoryBlock, IStoryMessage } from '@/shared/types'

import { cn } from '@/shared/lib/utils'
import { useStore } from '@/shared/store'
import { Show } from '@/shared/ui'

export const StudioStoryEditor = () => {
  const blocks = useStore('studioStoryEditor', (s) => s.blocks)

  console.log(blocks)
  return (
    <div className="flex h-[94vh] w-full flex-col gap-4 overflow-y-auto rounded-lg border py-4">
      <Show when={blocks.length > 0}>
        <StudioStoryEditorBlock block={blocks[0]} />
      </Show>
    </div>
  )
}

const StudioStoryEditorBlock = ({ block }: { block: IStoryBlock }) => {
  console.log(block)
  return (
    <>
      <header className="border-b px-4 pb-4 text-lg font-bold">
        {block.title}
      </header>
      <section className="flex flex-col gap-4 p-4">
        {block.messages.map((message, index) => {
          return <StudioStoryEditorBlockMessage key={index} message={message} />
        })}
      </section>
    </>
  )
}

const StudioStoryEditorBlockMessage = ({
  message,
}: {
  message: IStoryMessage
}) => {
  return (
    <>
      <div
        className={cn(
          'flex flex-col gap-2',
          message.isMainChr //
            ? 'items-start text-left'
            : 'items-end text-right',
        )}
      >
        <span>{message.chrName}</span>
        <div className="rounded-lg border p-3">{message.message}</div>
      </div>
      <Show when={!!message.choices}>
        <div className="flex gap-2">
          {message.choices?.map((choice, index) => (
            <div key={index}>{choice}</div>
          ))}
        </div>
      </Show>
    </>
  )
}
