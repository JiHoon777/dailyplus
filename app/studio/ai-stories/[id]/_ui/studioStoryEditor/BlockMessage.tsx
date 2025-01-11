import type { StoryMessages } from '@/shared/types'

import {
  BlockMessageChat,
  BlockMessageChoice,
  BlockMessageScript,
} from './messages'

export const BlockMessage = ({
  message,
  currentBlockTitle,
}: {
  message: StoryMessages
  currentBlockTitle: string
}) => {
  switch (message.type) {
    case 'chat': {
      return <BlockMessageChat message={message} />
    }
    case 'script': {
      return <BlockMessageScript message={message} />
    }
    case 'choice': {
      return (
        <BlockMessageChoice
          message={message}
          currentBlockTitle={currentBlockTitle}
        />
      )
    }
  }
}
