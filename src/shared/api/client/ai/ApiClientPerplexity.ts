import type { ApiClient } from '../ApiClient'
import type { IApiClientAiBase } from './types'
import type {
  ArticlesType,
  PerplexityResponse,
  SupportedLanguagesType,
} from '@/shared/types'

import { DPEnvs } from '@/shared/config'

import {
  getDateRangeText,
  getSystemContentByLanguage,
  getUserContentByLanguage,
} from '../prompt/articles'

export class ApiClientPerplexity implements IApiClientAiBase {
  constructor(private readonly _apiClient: ApiClient) {}

  get supabaseClient() {
    return this._apiClient.supabaseClient
  }

  /**
   * ! Next api routes [POST] /api/ai/perplexity/chat-completions-create 로 호출
   * ! API Key 보안
   */
  private requestToPerplexity(body: string) {
    return fetch('https://api.perplexity.ai/chat/completions', {
      body,
      headers: {
        Authorization: `Bearer ${DPEnvs.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  }

  /**
   * @description Perplexity AI로 기사 생성
   *
   * @param {object} params
   * @param {ArticlesType} params.type - 기사 타입
   * @param {SupportedLanguagesType} params.language - 지원 언어
   * @returns {Promise<PerplexityResponse>} Perplexity AI 응답
   *
   * @see features/articleGeneration/hooks/useGenerateArticlesWithAi
   * @requires shared/api/client/prompt/articles/getArticles.consts
   * - getDateRangeText: 날짜 범위
   * - getSystemContentByLanguage: 시스템 프롬프트
   * - getUserContentByLanguage: 사용자 프롬프트
   */
  async getArticles({
    type,
    language,
  }: {
    type: ArticlesType
    language: SupportedLanguagesType
  }): Promise<
    PerplexityResponse['choices'][number]['message']['content'] | null
  > {
    const dateRangeText = getDateRangeText()
    const systemContent = getSystemContentByLanguage(
      type,
      language,
      dateRangeText,
    )
    const content = getUserContentByLanguage(type, language)

    const res = await this.requestToPerplexity(
      JSON.stringify({
        messages: [
          {
            content: systemContent,
            role: 'system',
          },
          {
            content,
            role: 'user',
          },
        ],
        model: 'llama-3.1-sonar-huge-128k-online',
      }),
    )

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = (await res.json()) as PerplexityResponse

    return data.choices?.[0]?.message?.content ?? null
  }

  getQuoteInterpretation(_input: {
    quoteText: string
    customPrompt?: string
  }): Promise<string | null> {
    throw new Error('Method not implemented.')
  }
}
