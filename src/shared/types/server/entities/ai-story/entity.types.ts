import type { IServerEntityBase } from '../../common'

export type IAiStory = {
  title: string
  content: string
  modelVersion: string
  prompt: string | null
  userId: number | null
} & IServerEntityBase

type BlockTitle = string
export type IStoryContent = {
  startBlockTitle: BlockTitle
  blocksMap: Record<BlockTitle, IStoryBlock>
}
export type IStoryBlock = {
  title: BlockTitle
  messages: IStoryMessage[]
}

export type IStoryMessage = {
  chrName: string
  // 이야기의 중심이 되는 캐릭터
  isMainChr?: boolean
  message: string
  choices?: BlockTitle[]
}
