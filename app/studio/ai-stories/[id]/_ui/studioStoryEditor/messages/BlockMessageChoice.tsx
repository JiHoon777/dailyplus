import type { IStoryMessageChoice } from '@/shared/types'

import { cn } from '@/shared/lib/utils'
import { useStore } from '@/shared/store'
import { For } from '@/shared/ui'

export const BlockMessageChoice = ({
  message,
  currentBlockTitle,
}: {
  message: IStoryMessageChoice
  currentBlockTitle: string
}) => {
  const setNextBlock = useStore('studioStoryEditor').getState().setNextBlock
  const isActiveBlock = useStore('studioStoryEditor').getState().isActiveBlock

  const choices = message.choices
  return (
    <div className="flex justify-center gap-2">
      <For each={choices ?? []}>
        {(choice) => (
          <div
            key={choice}
            onClick={() => setNextBlock(currentBlockTitle, choice)}
            className={cn(
              'cursor-pointer rounded-lg border p-4',
              isActiveBlock(choice) && 'bg-gray-100',
            )}
          >
            {choice}
          </div>
        )}
      </For>
    </div>
  )
}
