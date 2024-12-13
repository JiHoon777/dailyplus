import type { IArticle } from '../types/entity.types'
import type { ApiClient } from './apiClient'

/**
 * 관리자 전용 API 클라이언트로 관리자 수준의 작업을 처리
 * 이 클라이언트는 관리자 수준의 작업에만 사용되어야 함
 * Todo: 공통 파라메터 추출 & 일원화
 */
export class ApiClientAdmin {
  constructor(private readonly _apiClient: ApiClient) {}

  get supabaseClient() {
    return this._apiClient.supabaseClient
  }

  getUsers({ page = 1, limit = 10 }: { page: number; limit?: number }) {
    const from = (page - 1) * limit
    const to = from + limit - 1

    return this.supabaseClient
      .from('users')
      .select('*', { count: 'exact' })
      .range(from, to)
  }

  getArticles({
    page = 1,
    limit = 10,
    orderBy = 'created_at',
  }: {
    page: number
    limit?: number
    orderBy?: 'created_at' | 'published_at'
  }) {
    const from = (page - 1) * limit
    const to = from + limit - 1

    return this.supabaseClient
      .from('articles')
      .select('*', { count: 'exact' })
      .order(orderBy, { ascending: false })
      .range(from, to)
  }

  async createBulkArticles(
    articles: Pick<
      IArticle,
      | 'published_at'
      | 'title'
      | 'summary'
      | 'reference_name'
      | 'reference_url'
      | 'type'
      | 'unique_id'
    >[],
  ) {
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
}
