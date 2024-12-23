import type { ApiClient } from '../apiClient'
import type {
  ArticlesType,
  ExtractMethodParameters,
  ExtractMethodReturn,
  PerplexityResponse,
  SupportedLanguagesType,
} from '@/shared/types'

import OpenAI from 'openai'

import { DPEnvs } from '@/shared/config'

import { createArticlePromptBodyToPerplexity } from './perplexity'

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
        Authorization: `Bearer ${DPEnvs.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  }

  private async requestToChatGPT<TResult>({
    model = 'gpt-4o-mini',
    messages,
  }: {
    model: OpenAI.Chat.ChatModel
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
  }): Promise<TResult | null> {
    const openai = new OpenAI({
      apiKey: DPEnvs.OPENAI_API_KEY,
    })

    const completion = await openai.chat.completions.create({
      messages,
      model,
    })

    const content = completion.choices[0].message.content

    if (!content) {
      return null
    }

    return JSON.parse(content)
  }

  async getArticlesByPerplexity({
    type,
    language,
  }: {
    type: ArticlesType
    language: SupportedLanguagesType
  }): Promise<PerplexityResponse> {
    const body = createArticlePromptBodyToPerplexity({
      language,
      type,
    })

    const res = await this.requestToPerplexity(body)

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  }
}
