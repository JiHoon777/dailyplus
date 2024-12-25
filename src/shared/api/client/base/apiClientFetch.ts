import type { ApiClient } from '../ApiClient'

export class ApiClientFetch {
  constructor(private readonly apiClient: ApiClient) {}

  async post<TResult = unknown, TBody = unknown>(
    url: string,
    body: TBody,
  ): Promise<TResult> {
    const response = await fetch(url, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    return response.json()
  }
}
