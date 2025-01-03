import type { IQuoteAiInterpretation, IServerListRequest } from '@/shared/types'

export type IQuoteAiInterpretationCreateRequest = Pick<
  IQuoteAiInterpretation,
  'content' | 'modelVersion' | 'quoteId' | 'prompt' | 'userId'
>
export type IQuoteAiInterpretationListRequest = IServerListRequest<{
  quoteId?: number
}>

export type IQuoteAiInterpretationUpdateRequest =
  Partial<IQuoteAiInterpretationCreateRequest>

export type IQuoteAiInterpretationDeleteRequest = Pick<
  IQuoteAiInterpretation,
  'id'
>
