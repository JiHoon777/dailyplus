/**
 * 모든 API 작업의 진입점이 되는 메인 API 클라이언트
 * 관리자용과 일반 사용자용 작업에 대한 접근을 제공
 */
import type {
  ExtractMethodParameters,
  ExtractMethodReturn,
} from '@/shared/types'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from 'database.types'

import { ApiClientOpenAi, ApiClientPerplexity } from './ai'
import {
  ApiClientArticles,
  ApiClientAuth,
  ApiClientQuotePeople,
  ApiClientQuotes,
} from './entity'

type IApiClientApp = typeof ApiClient.prototype

export type IApiClientResponse<TMethod extends keyof IApiClientApp> =
  ExtractMethodReturn<IApiClientApp, TMethod>

export type IApiClientParams<TMethod extends keyof IApiClientApp> =
  ExtractMethodParameters<IApiClientApp, TMethod>

export class ApiClient {
  readonly auth = new ApiClientAuth(this)
  readonly perplexity = new ApiClientPerplexity(this)
  readonly openai = new ApiClientOpenAi(this)

  readonly articles = new ApiClientArticles(this)
  readonly quotePeople = new ApiClientQuotePeople(this)
  readonly quotes = new ApiClientQuotes(this)

  constructor(private readonly _supabaseClient: SupabaseClient<Database>) {}

  get supabaseClient() {
    return this._supabaseClient
  }
}
