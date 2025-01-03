import type { IServerEntityBase } from '../../common'

export type IAiStory = {
  title: string
  content: string
  modelVersion: string
  prompt: string | null
  userId: number | null
} & IServerEntityBase
