/**
 * 모든 API 작업의 진입점이 되는 메인 API 클라이언트
 * 관리자용과 일반 사용자용 작업에 대한 접근을 제공
 */
import type { ArticleType } from '../types'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from 'database.types'

import { ApiClientAdmin } from './apiClientAdmin'
import { ApiClientAi } from './apiClientAi'
import { ApiClientApp } from './apiClientApp'
import { ApiClientAuth } from './apiClientAuth'

export class ApiClient {
  readonly auth = new ApiClientAuth(this)
  readonly admin = new ApiClientAdmin(this)
  readonly app = new ApiClientApp(this)
  readonly ai = new ApiClientAi(this)

  constructor(private readonly _supabaseClient: SupabaseClient<Database>) {}

  get supabaseClient() {
    return this._supabaseClient
  }

  getArticles({
    page = 1,
    limit = 10,
    orderBy = 'created_at',
    type,
  }: {
    page: number
    limit?: number
    orderBy?: 'created_at' | 'published_at'
    type?: ArticleType
  }) {
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

    return query
  }
}
