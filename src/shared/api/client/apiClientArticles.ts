import type { ApiClient } from '.'
import type {
  ExtractMethodParameters,
  ExtractMethodReturn,
  IArticle,
  IArticleCreationInput,
  IArticleListableInput,
  IArticleUpdateInput,
  IListableResponse,
} from '@/shared/types'

import { ApiClientEntityBase } from './base/apiClientEntityBase'
import { createListableResponse } from './utils'

type IApiClientArticles = typeof ApiClientArticles.prototype

export type IApiClientArticlesResponse<
  TMethod extends keyof IApiClientArticles,
> = ExtractMethodReturn<IApiClientArticles, TMethod>

export type IApiClientArticlesParams<TMethod extends keyof IApiClientArticles> =
  ExtractMethodParameters<IApiClientArticles, TMethod>

export class ApiClientArticles extends ApiClientEntityBase<
  'articles',
  IArticle,
  IArticleCreationInput,
  IArticleUpdateInput
> {
  constructor(apiClient: ApiClient) {
    super(apiClient, 'articles')
  }

  get supabaseClient() {
    return this._apiClient.supabaseClient
  }

  // Todo: refactor
  async createBulk(articles: IArticleCreationInput[]) {
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
    input: IArticleListableInput,
  ): Promise<IListableResponse<IArticle>> {
    const { orderBy = 'created_at', type } = input

    const query = this._listQuery(input)

    query.order(orderBy, { ascending: false })

    if (type) {
      query.eq('type', type)
    }

    query.not('published_at', 'is', null)

    const res = await query
    return createListableResponse(res)
  }
}
