import type { ApiClient } from '../ApiClient'
import type {
  ExtractMethodParameters,
  ExtractMethodReturn,
} from '@/shared/types'

import OpenAI from 'openai'

import { DPEnvs } from '@/shared/config'

type IApiClientOpenAi = typeof ApiClientOpenAi.prototype

export type IApiClientOpenAiResponse<TMethod extends keyof IApiClientOpenAi> =
  ExtractMethodReturn<IApiClientOpenAi, TMethod>

export type IApiClientOpenAiParams<TMethod extends keyof IApiClientOpenAi> =
  ExtractMethodParameters<IApiClientOpenAi, TMethod>

export class ApiClientOpenAi {
  constructor(private readonly _apiClient: ApiClient) {}

  get supabaseClient() {
    return this._apiClient.supabaseClient
  }

  async createChatCompletions({
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

    const content = completion.choices[0].message.content

    return content
  }
}
