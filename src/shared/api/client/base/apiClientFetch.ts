import type { ApiClient } from '../ApiClient'

export class ApiClientFetch {
  constructor(private readonly apiClient: ApiClient) {}

  async post<TResult = unknown, TBody = unknown>({
    url,
    header = {},
    body,
  }: {
    url: string
    header?: Record<string, string>
    body: TBody
  }): Promise<TResult> {
    const response = await fetch(url, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...header,
      },
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    return response.json()
  }
}
