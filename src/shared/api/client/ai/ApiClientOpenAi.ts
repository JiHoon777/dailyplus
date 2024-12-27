import type { ApiClient } from '../ApiClient'
import type { IApiClientAiBase } from './types'
import type { ArticlesType, SupportedLanguagesType } from '@/shared/types'

import OpenAI from 'openai'

import { DPEnvs } from '@/shared/config'

export class ApiClientOpenAi implements IApiClientAiBase {
  constructor(private readonly _apiClient: ApiClient) {}

  get supabaseClient() {
    return this._apiClient.supabaseClient
  }

  /**
   * ! Next api routes [POST] /api/ai/openai/chat-completions-create 로 호출
   * ! API Key 보안
   */
  private async createChatCompletions({
    model = 'gpt-4o-mini',
    messages,
  }: {
    model: OpenAI.Chat.ChatModel
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
  }): Promise<string | null> {
    const openai = new OpenAI({
      apiKey: DPEnvs.OPENAI_API_KEY,
    })

    const completion = await openai.chat.completions.create({
      messages,
      model,
    })

    const content = completion.choices?.[0]?.message?.content

    return content ?? null
  }

  getArticles(_input: {
    type: ArticlesType
    language: SupportedLanguagesType
  }): Promise<string | null> {
    throw new Error('Method not implemented.')
  }

  getQuoteInterpretation({
    quoteText,
    customPrompt,
  }: {
    quoteText: string
    customPrompt?: string
  }): Promise<string | null> {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        content: `너는 유머러스하면서도 통찰력 있는 명언 해석가야. 💡재치있는 해석: 유머러스한 관점에서 명언 해석 🎯실용적 교훈: 일상생활에서 실천할 수 있는 구체적인 조언 🌟현대적 적용: 현시대에 맞는 실천 방안`,
        role: 'system',
      },
      {
        content: `명언: "${quoteText}"`,
        role: 'user',
      },
    ]

    if (customPrompt) {
      messages.push({
        content: customPrompt,
        role: 'user',
      })
    }

    const res = this.createChatCompletions({
      messages,
      model: 'gpt-4o-mini',
    })

    return res
  }
}
