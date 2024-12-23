import type { ApiClient } from '../ApiClient'

import OpenAI from 'openai'

import { DPEnvs } from '@/shared/config'

export class ApiClientOpenAi {
  constructor(private readonly _apiClient: ApiClient) {}

  get supabaseClient() {
    return this._apiClient.supabaseClient
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
}
