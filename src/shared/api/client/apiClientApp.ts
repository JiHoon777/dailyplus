import type { ApiClient } from './apiClient'
import type { ArticleType, ExtractMethodReturn } from '@/shared/types'

type IApiClientApp = typeof ApiClientApp.prototype
/**
 * ApiClientApp의 특정 메서드 응답 타입을 추출하는 유틸리티 타입
 * @template TMethod - ApiClientApp의 메서드 이름
 * @example
 * // getHomeArticles 메서드의 응답 타입 추출
 * type HomeArticlesResponse = IApiClientAppResponse<'getHomeArticles'>
 */
export type IApiClientAppResponse<TMethod extends keyof IApiClientApp> =
  ExtractMethodReturn<IApiClientApp, TMethod>

/**
 * 일반 사용자용 API 클라이언트로 일반적인 작업을 처리
 */
export class ApiClientApp {
  constructor(private readonly _apiClient: ApiClient) {}

  get supabaseClient() {
    return this._apiClient.supabaseClient
  }

  async getHomeArticles(type: ArticleType) {
    return this._apiClient.getArticles({
      limit: 10,
      orderBy: 'published_at',
      page: 1,
      type,
    })
  }
}
