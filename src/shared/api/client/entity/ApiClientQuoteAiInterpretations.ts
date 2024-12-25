import type { ApiClient, IApiClientAiBaseParams } from '..'
import type {
  ExtractMethodParameters,
  ExtractMethodReturn,
  IListableResponse,
  IQuoteAiInterpretations,
  IQuoteAiInterpretationsCreationInput,
  IQuoteAiInterpretationsListableInput,
  IQuoteAiInterpretationsUpdateInput,
} from '@/shared/types'

import { ApiClientEntityBase } from '../base/apiClientEntityBase'
import { createListableResponse, getPaginationRange } from '../lib'

type IApiClientQuoteAiInterpretations =
  typeof ApiClientQuoteAiInterpretations.prototype

export type IApiClientQuoteAiInterpretationsResponse<
  TMethod extends keyof IApiClientQuoteAiInterpretations,
> = ExtractMethodReturn<IApiClientQuoteAiInterpretations, TMethod>

export type IApiClientQuoteAiInterpretationsParams<
  TMethod extends keyof IApiClientQuoteAiInterpretations,
> = ExtractMethodParameters<IApiClientQuoteAiInterpretations, TMethod>

export class ApiClientQuoteAiInterpretations extends ApiClientEntityBase<
  'quote_ai_interpretations',
  IQuoteAiInterpretations,
  IQuoteAiInterpretationsCreationInput,
  IQuoteAiInterpretationsUpdateInput,
  IQuoteAiInterpretationsListableInput
> {
  constructor(apiClient: ApiClient) {
    super(apiClient, 'quote_ai_interpretations')
  }

  async getList(
    input: IQuoteAiInterpretationsListableInput,
  ): Promise<IListableResponse<IQuoteAiInterpretations>> {
    const { page = 1, limit = 10, orderBy = 'created_at', quote_id } = input

    const { from, to } = getPaginationRange(page, limit)

    const query = this.supabaseClient
      .from(this._tableName)
      .select('*', { count: 'exact' })
      .range(from, to)

    query.order(orderBy, { ascending: false })

    if (quote_id) {
      query.eq('quote_id', quote_id)
    }

    return createListableResponse(await query)
  }

  async generateAndSaveQuoteInterpretationWithAi(
    input: IApiClientAiBaseParams<'getQuoteInterpretation'> & {
      quote_id: number
    },
  ) {
    const { customPrompt, quote_id } = input
    const res = await this._apiClient.fetch.post<{ content: string }>(
      '/api/ai/quote-interpretation',
      input,
    )

    const interpretation = await this.create({
      content: res.content,
      model_version: 'gpt-4o-mini',
      prompt: customPrompt ?? null,
      quote_id,
    })

    return interpretation
  }
}
