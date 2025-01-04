import type { ApiClientRoot } from '../ApiClient'
import type { IApiClientAiBase } from './types'
import type {
  ArticleType,
  IPerplexityInput,
  IPerplexityResponse,
  SupportedLanguagesType,
} from '@/shared/types'

import ky from 'ky'

import {
  getDateRangeText,
  getSystemContentByLanguage,
  getUserContentByLanguage,
} from '../prompt/articles'

export class ApiClientPerplexity implements IApiClientAiBase {
  constructor(private readonly _apiClient: ApiClientRoot) {}

  private async createChatCompletions({ model, messages }: IPerplexityInput) {
    const completion: IPerplexityResponse = await ky
      .post('/api/ai/perplexity/chat-completions-create', {
        json: {
          messages,
          model,
        },
      })
      .json()

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
   * @param {ArticleType} params.type - 기사 타입
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
    type: ArticleType
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
