import type { IStoryMessageChat } from '@/shared/types'

import { cn } from '@/shared/lib/utils'

export const BlockMessageChat = ({
  message,
}: {
  message: IStoryMessageChat
}) => {
  return (
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
  )
}
