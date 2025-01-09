import type { IStoryMessage } from '@/shared/types'

import { cn } from '@/shared/lib/utils'
import { Show } from '@/shared/ui'

import { MessageChoices } from './MessageChoices'

export const BlockMessage = ({
  message,
  blockTitle,
}: {
  message: IStoryMessage
  blockTitle: string
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
        <MessageChoices
          choices={message.choices ?? []}
          blockTitle={blockTitle}
        />
      </Show>
    </>
  )
}
