import type { ArticleType, IApiClientResponse, IArticle } from '../types'
import type { ApiClient } from './apiClient'

import { ARTICLE_TYPE_OPTIONS } from '../config'

type IApiClientApp = typeof ApiClientApp.prototype
/**
 * ApiClientApp의 특정 메서드 응답 타입을 추출하는 유틸리티 타입
 * @template TMethod - ApiClientApp의 메서드 이름
 * @example
 * // getHomeArticles 메서드의 응답 타입 추출
 * type HomeArticlesResponse = IApiClientAppResponse<'getHomeArticles'>
 */
export type IApiClientAppResponse<TMethod extends keyof IApiClientApp> =
  IApiClientResponse<IApiClientApp, TMethod>

/**
 * 일반 사용자용 API 클라이언트로 일반적인 작업을 처리
 */
export class ApiClientApp {
  constructor(private readonly _apiClient: ApiClient) {}

  get supabaseClient() {
    return this._apiClient.supabaseClient
  }

  async getHomeArticles() {
    const results = await Promise.all(
      ARTICLE_TYPE_OPTIONS.map((type) =>
        this._apiClient.getArticles({
          limit: 5,
          orderBy: 'published_at',
          page: 1,
          type,
        }),
      ),
    )

    const articles = Object.fromEntries(
      ARTICLE_TYPE_OPTIONS.map((type, index) => [
        type,
        results[index].data ?? [],
      ]),
    ) as Record<ArticleType, IArticle[]>

    // Todo: 타입에 따른 에러 처리
    const hasError = results.some((result) => result.error)

    return {
      data: articles,
      error: hasError ? 'Failed to fetch some articles' : null,
    }
  }
}
