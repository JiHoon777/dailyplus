import type { ApiClient } from '.'
import type {
  ExtractMethodParameters,
  ExtractMethodReturn,
  IArticles,
  IArticlesCreationInput,
  IArticlesListableInput,
  IArticlesUpdateInput,
  IListableResponse,
} from '@/shared/types'

import { ApiClientEntityBase } from './base/apiClientEntityBase'
import { createListableResponse, getPaginationRange } from './utils'

type IApiClientArticles = typeof ApiClientArticles.prototype

export type IApiClientArticlesResponse<
  TMethod extends keyof IApiClientArticles,
> = ExtractMethodReturn<IApiClientArticles, TMethod>

export type IApiClientArticlesParams<TMethod extends keyof IApiClientArticles> =
  ExtractMethodParameters<IApiClientArticles, TMethod>

export class ApiClientArticles extends ApiClientEntityBase<
  'articles',
  IArticles,
  IArticlesCreationInput,
  IArticlesUpdateInput,
  IArticlesListableInput
> {
  constructor(apiClient: ApiClient) {
    super(apiClient, 'articles')
  }

  get supabaseClient() {
    return this._apiClient.supabaseClient
  }

  // Todo: refactor
  async createBulk(articles: IArticlesCreationInput[]) {
    const results = await Promise.allSettled(
      articles.map((article) =>
        this.supabaseClient.from('articles').insert([article]),
      ),
    )

    const succeeded = results.filter(
      (result): result is PromiseFulfilledResult<any> =>
        result.status === 'fulfilled',
    ).length

    const failed = results.filter(
      (result): result is PromiseRejectedResult => result.status === 'rejected',
    ).length

    return {
      data: { failed, succeeded },
      error: failed > 0 ? `Failed to insert ${failed} articles` : null,
    }
  }

  async getList(
    input: IArticlesListableInput,
  ): Promise<IListableResponse<IArticles>> {
    const { page = 1, limit = 10, orderBy = 'created_at', type } = input

    const { from, to } = getPaginationRange(page, limit)

    const query = this.supabaseClient
      .from(this._tableName)
      .select('*', { count: 'exact' })
      .range(from, to)

    query.order(orderBy, { ascending: false })

    if (type) {
      query.eq('type', type)
    }

    query.not('published_at', 'is', null)

    return createListableResponse(await query)
  }
}
