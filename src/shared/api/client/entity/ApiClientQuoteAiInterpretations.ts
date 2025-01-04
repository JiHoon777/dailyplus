import type { ApiClientRoot } from '../ApiClient'
import type {
  ExtractMethodParameters,
  ExtractMethodReturn,
  IQuoteAiInterpretation,
  IQuoteAiInterpretationCreateRequest,
  IQuoteAiInterpretationListRequest,
  IQuoteAiInterpretationUpdateRequest,
  IServerListResponse,
} from '@/shared/types'

import { ApiClientEntityBase } from '../base/apiClientEntityBase'

type IApiClientQuoteAiInterpretations =
  typeof ApiClientQuoteAiInterpretations.prototype

export type IApiClientQuoteAiInterpretationsResponse<
  TMethod extends keyof IApiClientQuoteAiInterpretations,
> = ExtractMethodReturn<IApiClientQuoteAiInterpretations, TMethod>

export type IApiClientQuoteAiInterpretationsParams<
  TMethod extends keyof IApiClientQuoteAiInterpretations,
> = ExtractMethodParameters<IApiClientQuoteAiInterpretations, TMethod>

export class ApiClientQuoteAiInterpretations extends ApiClientEntityBase<
  IQuoteAiInterpretation,
  IQuoteAiInterpretationCreateRequest,
  IQuoteAiInterpretationUpdateRequest,
  IQuoteAiInterpretationListRequest
> {
  constructor(apiClient: ApiClientRoot) {
    super(apiClient, 'quote-ai-interpretations')
  }

  async getList(
    input: IQuoteAiInterpretationListRequest,
  ): Promise<IServerListResponse<IQuoteAiInterpretation>> {
    const { page = 1, size = 10, quoteId } = input

    return this.fetch.get({
      segments: [this.segmentPrefix, 'list'],
      query: { page, size, quoteId },
    })
  }

  async generateAndSaveQuoteInterpretationWithAi(json: {
    quoteId: number
    userId: number
  }): Promise<IQuoteAiInterpretation> {
    return this.fetch.post(
      {
        segments: [this.segmentPrefix, 'generate-with-ai'],
      },
      {
        json,
      },
    )
  }
}
