import type { IServerEntityBase } from '../../common'

export type IQuoteAiInterpretation = {
  modelVersion: string
  content: string
  prompt: string | null
  quoteId: number | null
  userId: number | null
} & IServerEntityBase
