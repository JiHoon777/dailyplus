import type { IServerEntityBase } from '../../common'

export type IAiStory = {
  title: string
  content: IStoryContent
  modelVersion: string
  prompt: string | null
  userId: number | null
} & IServerEntityBase

export type BlockTitle = string
export type IStoryContent = {
  storyTitle: string
  startBlockTitle: BlockTitle
  blocksMap: Record<BlockTitle, IStoryBlock>
}

export type IStoryBlock = {
  title: BlockTitle
  messages: StoryMessages[]
}

export type StoryMessageType = 'chat' | 'script' | 'choice'

export type IStoryMessageChat = {
  type: 'chat'
  chrName: string
  // 이야기의 중심이 되는 캐릭터
  isMainChr?: boolean
  message: string
}

// 지문
export type IStoryMessageScript = {
  type: 'script'
  message: string
}

// 선택지
export type IStoryMessageChoice = {
  type: 'choice'
  choices: BlockTitle[]
}

export type StoryMessages =
  | IStoryMessageChat
  | IStoryMessageScript
  | IStoryMessageChoice
