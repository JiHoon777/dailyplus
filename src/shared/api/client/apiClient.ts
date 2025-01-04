/**
 * 모든 API 작업의 진입점이 되는 메인 API 클라이언트
 * 관리자용과 일반 사용자용 작업에 대한 접근을 제공
 */
import type { IApiClientAiBase } from './ai/types'

import { ApiClientOpenAi } from './ai'
import { ApiClientFetch } from './base/ApiClientFetch'
import {
  ApiClientAiStories,
  ApiClientArticles,
  ApiClientAuth,
  ApiClientQuoteAiInterpretations,
  ApiClientQuotePeople,
  ApiClientQuotes,
} from './entity'

export class ApiClientRoot {
  readonly fetch = new ApiClientFetch(this)

  readonly openai: IApiClientAiBase = new ApiClientOpenAi(this)

  readonly auth = new ApiClientAuth(this)
  readonly articles = new ApiClientArticles(this)
  readonly quotePeople = new ApiClientQuotePeople(this)
  readonly quotes = new ApiClientQuotes(this)
  readonly quoteAiInterpretations = new ApiClientQuoteAiInterpretations(this)
  readonly aiStories = new ApiClientAiStories(this)

  constructor() {}
}
