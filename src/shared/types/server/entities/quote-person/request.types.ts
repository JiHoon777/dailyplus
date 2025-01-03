import type { IQuotePerson, IServerListRequest } from '@/shared/types'

export type IQuotePersonCreateRequest = {
  description?: string | null
} & Pick<IQuotePerson, 'name'>

export type IQuotePersonListRequest = IServerListRequest

export type IQuotePersonUpdateRequest = Partial<IQuotePersonCreateRequest>

export type IQuotePersonDeleteRequest = Pick<IQuotePerson, 'id'>
