import type { ApiClient } from '../ApiClient'
import type { IApiClientAiBase } from './types'
import type {
  ArticlesType,
  IPerplexityInput,
  IPerplexityResponse,
  SupportedLanguagesType,
} from '@/shared/types'

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

  private async createChatCompletions({ model, messages }: IPerplexityInput) {
    const completion = await this._apiClient.fetch.post<IPerplexityResponse>({
      body: {
        messages,
        model,
      },
      url: '/api/ai/perplexity/chat-completions-create',
    })

    const content = completion.choices?.[0]?.message?.content

    if (!content) {
      throw new Error('No response from AI')
    }

    return content
  }

  /**
   * @description Perplexity AI로 기사 생성
   *
   * @param {object} params
   * @param {ArticlesType} params.type - 기사 타입
   * @param {SupportedLanguagesType} params.language - 지원 언어
   * @returns {Promise<IPerplexityResponse>} Perplexity AI 응답
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
  }): Promise<IPerplexityResponse['choices'][number]['message']['content']> {
    const dateRangeText = getDateRangeText()
    const systemContent = getSystemContentByLanguage(
      type,
      language,
      dateRangeText,
    )
    const content = getUserContentByLanguage(type, language)

    const res = await this.createChatCompletions({
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
    })

    return res
  }

  getQuoteInterpretation(_input: {
    quoteText: string
    customPrompt?: string
  }): Promise<string> {
    throw new Error('Method not implemented.')
  }
}
