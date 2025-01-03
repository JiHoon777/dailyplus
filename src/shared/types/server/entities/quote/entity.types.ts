import type { IServerEntityBase } from '../../common'

export type IQuote = {
  originalText: string
  koreanText: string
  quotePersonId: number
} & IServerEntityBase
