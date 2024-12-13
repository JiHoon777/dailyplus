import type { ApiClient } from './apiClient'

export class ApiClientAi {
  constructor(private readonly _apiClient: ApiClient) {}

  get supabaseClient() {
    return this._apiClient.supabaseClient
  }

  requestToPerplexity(question: string) {
    return fetch('https://api.perplexity.ai/chat/completions', {
      body: question,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  }
}
