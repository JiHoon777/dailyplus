import type { ApiClientRoot } from '../ApiClient'
import type {
  ExtractMethodParameters,
  ExtractMethodReturn,
  IArticle,
  IArticleCreateRequest,
  IArticleListRequest,
  IArticleUpdateRequest,
  IServerListResponse,
} from '@/shared/types'

import { ApiClientEntityBase } from '../base/apiClientEntityBase'

type IApiClientArticles = typeof ApiClientArticles.prototype

export type IApiClientArticlesResponse<
  TMethod extends keyof IApiClientArticles,
> = ExtractMethodReturn<IApiClientArticles, TMethod>

export type IApiClientArticlesParams<TMethod extends keyof IApiClientArticles> =
  ExtractMethodParameters<IApiClientArticles, TMethod>

export class ApiClientArticles extends ApiClientEntityBase<
  IArticle,
  IArticleCreateRequest,
  IArticleUpdateRequest,
  IArticleListRequest
> {
  constructor(apiClient: ApiClientRoot) {
    super(apiClient, 'articles')
  }

  async getList(
    input: IArticleListRequest,
  ): Promise<IServerListResponse<IArticle>> {
    const { page = 1, size = 10, type } = input

    return this.fetch.get({
      segments: [this.segmentPrefix, 'list'],
      query: { page, size, type },
    })
  }
}
