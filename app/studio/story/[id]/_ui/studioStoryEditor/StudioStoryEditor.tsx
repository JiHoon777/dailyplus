import { useStore } from '@/shared/store'
import { Show } from '@/shared/ui'

export const StudioStoryEditor = () => {
  const blockName = useStore('studioStoryEditor', (s) => s.blockName)
  const messages = useStore('studioStoryEditor', (s) => s.messages)

  return (
    <div className="flex h-[94vh] w-full flex-col gap-4 overflow-y-auto rounded-lg border py-4">
      <header className="border-b px-4 pb-4 text-lg font-bold">
        {blockName}
      </header>
      <section>
        {messages.map((message, index) => {
          return (
            <div className="flex flex-col gap-2 p-4 text-left" key={index}>
              <span>{message.chrName}</span>
              <div>{message.message}</div>
              <Show when={!!message.choices}>
                <div className="flex gap-2">
                  {message.choices?.map((choice, index) => (
                    <div key={index}>{choice}</div>
                  ))}
                </div>
              </Show>
            </div>
          )
        })}
      </section>
    </div>
  )
}
