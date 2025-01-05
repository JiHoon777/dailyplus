import type { IServerEntityBase } from '../../common'

export type IAiStory = {
  title: string
  content: string
  modelVersion: string
  prompt: string | null
  userId: number | null
} & IServerEntityBase

type BlockName = string
export type IStoryContent = {
  startBlockName: BlockName
  blocksMap: Record<
    BlockName,
    { name: string; message: string; choices?: BlockName[] }[]
  >
}
