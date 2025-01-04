import type { ApiClientRoot } from '../ApiClient'
import type { IApiClientAiBase } from './types'
import type { ArticleType, SupportedLanguagesType } from '@/shared/types'
import type OpenAI from 'openai'

export class ApiClientOpenAi implements IApiClientAiBase {
  constructor(private readonly _apiClient: ApiClientRoot) {}

  private async createChatCompletions({
    model = 'gpt-4o-mini',
    messages,
  }: {
    model: OpenAI.Chat.ChatModel
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
  }): Promise<string> {
    const completion =
      await this._apiClient.fetch.post<OpenAI.Chat.Completions.ChatCompletion>({
        body: {
          messages,
          model,
        },
        url: '/api/ai/openai/chat-completions-create',
      })

    const content = completion.choices?.[0]?.message?.content

    if (!content) {
      throw new Error('No response from AI')
    }

    return content
  }

  getArticles(_input: {
    type: ArticleType
    language: SupportedLanguagesType
  }): Promise<string> {
    throw new Error('Method not implemented.')
  }

  getQuoteInterpretation({
    quoteText,
    customPrompt,
  }: {
    quoteText: string
    customPrompt?: string
  }): Promise<string> {
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
