import type { ApiClient } from '.'
import type {
  ExtractMethodParameters,
  ExtractMethodReturn,
  IArticle,
  IArticleCreationInput,
  IArticleListableInput,
  IListableResponse,
} from '@/shared/types'

type IApiClientArticles = typeof ApiClientArticles.prototype

export type IApiClientArticlesResponse<
  TMethod extends keyof IApiClientArticles,
> = ExtractMethodReturn<IApiClientArticles, TMethod>

export type IApiClientArticlesParams<TMethod extends keyof IApiClientArticles> =
  ExtractMethodParameters<IApiClientArticles, TMethod>

export class ApiClientArticles {
  constructor(private readonly _apiClient: ApiClient) {}

  get supabaseClient() {
    return this._apiClient.supabaseClient
  }

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
    const { page = 1, limit = 10, orderBy = 'created_at', type } = input

    const from = (page - 1) * limit
    const to = from + limit - 1

    const query = this.supabaseClient
      .from('articles')
      .select('*', { count: 'exact' })
      .order(orderBy, { ascending: false })
      .range(from, to)

    if (type) {
      query.eq('type', type)
    }

    query.not('published_at', 'is', null)

    const { data, count, error } = await query

    return {
      data: data ?? [],
      error,
      totalCount: count ?? 0,
    }
  }
}
