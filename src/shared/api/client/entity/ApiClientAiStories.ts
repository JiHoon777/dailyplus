import type { ApiClient } from '..'
import type {
  ExtractMethodParameters,
  ExtractMethodReturn,
  IAiStories,
  IAiStoriesCreationInput,
  IAiStoriesListableInput,
  IAiStoriesUpdateInput,
  IListableResponse,
} from '@/shared/types'

import { ApiClientEntityBase } from '../base/apiClientEntityBase'
import { createListableResponse, getPaginationRange } from '../lib'

type IApiClientAiStories = typeof ApiClientAiStories.prototype

export type IApiClientAiStoriesResponse<
  TMethod extends keyof IApiClientAiStories,
> = ExtractMethodReturn<IApiClientAiStories, TMethod>

export type IApiClientAiStoriesParams<
  TMethod extends keyof IApiClientAiStories,
> = ExtractMethodParameters<IApiClientAiStories, TMethod>

export class ApiClientAiStories extends ApiClientEntityBase<
  'ai_stories',
  IAiStories,
  IAiStoriesCreationInput,
  IAiStoriesUpdateInput,
  IAiStoriesListableInput
> {
  constructor(apiClient: ApiClient) {
    super(apiClient, 'ai_stories')
  }

  async getListWithIdTitle(
    input: IAiStoriesListableInput,
  ): Promise<IListableResponse<Pick<IAiStories, 'id' | 'title'>>> {
    const {
      page = 1, //
      limit = 10,
      orderBy = 'created_at',
      user_id,
    } = input

    const { from, to } = getPaginationRange(page, limit)

    const query = this.supabaseClient
      .from(this._tableName)
      .select('id, title', { count: 'exact' })
      .range(from, to)

    query.order(orderBy, { ascending: false })

    if (user_id) {
      query.eq('user_id', user_id)
    }

    return createListableResponse(await query)
  }
}
