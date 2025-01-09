import type { IStoryBlock } from '@/shared/types'

import { BlockMessage } from './BlockMessage'

export const EditorBlock = ({ block }: { block: IStoryBlock }) => {
  return (
    <>
      <header className="sticky top-0 w-full border-b px-4 pb-4 text-lg font-bold">
        {block.title}
      </header>
      <section className="flex w-full flex-col gap-4 p-4">
        {block.messages.map((message, index) => {
          return (
            <BlockMessage
              key={index}
              message={message}
              blockTitle={block.title}
            />
          )
        })}
      </section>
    </>
  )
}
