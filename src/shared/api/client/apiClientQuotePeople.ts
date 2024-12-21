import type { ApiClient } from '.'
import type {
  ExtractMethodParameters,
  ExtractMethodReturn,
  IArticle,
  IArticleCreationInput,
  IArticleListableInput,
  IListableResponse,
} from '@/shared/types'

type IApiClientQuotePeople = typeof ApiClientQuotePeople.prototype

export type IApiClientQuotePeopleResponse<
  TMethod extends keyof IApiClientQuotePeople,
> = ExtractMethodReturn<IApiClientQuotePeople, TMethod>

export type IApiClientQuotePeopleParams<
  TMethod extends keyof IApiClientQuotePeople,
> = ExtractMethodParameters<IApiClientQuotePeople, TMethod>

export class ApiClientQuotePeople {
  constructor(private readonly _apiClient: ApiClient) {}

  get supabaseClient() {
    return this._apiClient.supabaseClient
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
