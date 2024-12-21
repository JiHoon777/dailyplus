import type { ApiClient } from '../apiClient'
import type {
  ArticleType,
  ExtractMethodParameters,
  ExtractMethodReturn,
  PerplexityResponse,
  SupportedLanguagesType,
} from '@/shared/types'

import { configureBody } from './perplexity'

type IApiClientPrompt = typeof ApiClientPrompt.prototype

export type IApiClientPromptResponse<TMethod extends keyof IApiClientPrompt> =
  ExtractMethodReturn<IApiClientPrompt, TMethod>

export type IApiClientPromptParams<TMethod extends keyof IApiClientPrompt> =
  ExtractMethodParameters<IApiClientPrompt, TMethod>

export class ApiClientPrompt {
  constructor(private readonly _apiClient: ApiClient) {}

  get supabaseClient() {
    return this._apiClient.supabaseClient
  }

  private requestToPerplexity(body: string) {
    return fetch('https://api.perplexity.ai/chat/completions', {
      body,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  }

  async getArticlesByPerplexity({
    type,
    language,
    startDate,
    endDate,
  }: {
    type: ArticleType
    language: SupportedLanguagesType
    startDate?: string // YYYY-MM-DD
    endDate?: string // YYYY-MM-DD
  }): Promise<PerplexityResponse> {
    const body = configureBody({
      endDate,
      language,
      startDate,
      type,
    })

    const res = await this.requestToPerplexity(body)

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  }
}
