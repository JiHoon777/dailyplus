import type { IQuote, IServerListRequest } from '@/shared/types'

export type IQuoteCreateRequest = Pick<
  IQuote,
  'originalText' | 'koreanText' | 'quotePersonId'
>

export type IQuoteListRequest = IServerListRequest<{
  quotePersonName?: string
}>

export type IQuoteUpdateRequest = Partial<IQuoteCreateRequest>

export type IQuoteDeleteRequest = Pick<IQuote, 'id'>
