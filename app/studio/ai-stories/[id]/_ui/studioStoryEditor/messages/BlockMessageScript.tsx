import type { IStoryMessageScript } from '@/shared/types'

export const BlockMessageScript = ({
  message,
}: {
  message: IStoryMessageScript
}) => {
  return (
    <div className={'flex flex-col gap-2 text-center'}>
      <div>{message.message}</div>
    </div>
  )
}
