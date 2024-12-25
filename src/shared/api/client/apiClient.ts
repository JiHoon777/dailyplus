/**
 * 모든 API 작업의 진입점이 되는 메인 API 클라이언트
 * 관리자용과 일반 사용자용 작업에 대한 접근을 제공
 */
import type { IApiClientAiBase } from './ai/types'
import type {
  ExtractMethodParameters,
  ExtractMethodReturn,
} from '@/shared/types'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from 'database.types'

import { ApiClientOpenAi, ApiClientPerplexity } from './ai'
import { ApiClientFetch } from './base/apiClientFetch'
import {
  ApiClientArticles,
  ApiClientAuth,
  ApiClientQuoteAiInterpretations,
  ApiClientQuotePeople,
  ApiClientQuotes,
} from './entity'

type IApiClientApp = typeof ApiClient.prototype

export type IApiClientResponse<TMethod extends keyof IApiClientApp> =
  ExtractMethodReturn<IApiClientApp, TMethod>

export type IApiClientParams<TMethod extends keyof IApiClientApp> =
  ExtractMethodParameters<IApiClientApp, TMethod>

export class ApiClient {
  readonly fetch = new ApiClientFetch(this)

  readonly perplexity: IApiClientAiBase = new ApiClientPerplexity(this)
  readonly openai: IApiClientAiBase = new ApiClientOpenAi(this)

  readonly auth = new ApiClientAuth(this)
  readonly articles = new ApiClientArticles(this)
  readonly quotePeople = new ApiClientQuotePeople(this)
  readonly quotes = new ApiClientQuotes(this)
  readonly quoteAiInterpretations = new ApiClientQuoteAiInterpretations(this)

  constructor(private readonly _supabaseClient: SupabaseClient<Database>) {}

  get supabaseClient() {
    return this._supabaseClient
  }
}
