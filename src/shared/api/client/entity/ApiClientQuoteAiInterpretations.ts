import type { ApiClient, IApiClientAiBaseParams } from '..'
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
  constructor(apiClient: ApiClient) {
    super(apiClient, 'quote-ai-interpretations')
  }

  async getList(
    input: IQuoteAiInterpretationListRequest,
  ): Promise<IServerListResponse<IQuoteAiInterpretation>> {
    const { page = 1, size = 10, quoteId } = input

    return this.fetch.get({
      url: {
        segments: [this.segmentPrefix, 'list'],
        query: { page, size, quoteId },
      },
    })
  }

  async generateAndSaveQuoteInterpretationWithAi(
    input: IApiClientAiBaseParams<'getQuoteInterpretation'> & {
      quoteId: number
      userId: number
    },
  ) {
    const { customPrompt, quoteId, userId } = input
    const res = await this._apiClient.openai.getQuoteInterpretation(input)

    const interpretation = await this.create({
      content: res,
      modelVersion: 'gpt-4o-mini',
      prompt: customPrompt ?? null,
      quoteId,
      userId,
    })

    return interpretation
  }
}
