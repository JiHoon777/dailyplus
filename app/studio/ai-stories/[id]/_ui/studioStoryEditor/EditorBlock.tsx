import type { IStoryBlock } from '@/shared/types'

import { For } from '@/shared/ui'

import { BlockMessage } from './BlockMessage'

export const EditorBlock = ({ block }: { block: IStoryBlock }) => {
  return (
    <>
      <header className="sticky top-0 w-full border-b px-4 pb-4 text-lg font-bold">
        {block.title}
      </header>
      <section className="flex w-full flex-col gap-4 p-4">
        <For each={block.messages}>
          {(message, index) => (
            <BlockMessage
              key={index}
              message={message}
              currentBlockTitle={block.title}
            />
          )}
        </For>
      </section>
    </>
  )
}
