import { cn } from '@/shared/lib/utils'
import { useStore } from '@/shared/store'

export const MessageChoices = ({
  choices,
  blockTitle,
}: {
  choices: string[]
  blockTitle: string
}) => {
  const setNextBlock = useStore('studioStoryEditor').getState().setNextBlock
  const isActiveBlock = useStore('studioStoryEditor').getState().isActiveBlock

  return (
    <div className="flex justify-center gap-2">
      {choices?.map((choice) => (
        <div
          key={choice}
          onClick={() => setNextBlock(blockTitle, choice)}
          className={cn(
            'cursor-pointer rounded-lg border p-4',
            isActiveBlock(choice) && 'bg-gray-100',
          )}
        >
          {choice}
        </div>
      ))}
    </div>
  )
}
