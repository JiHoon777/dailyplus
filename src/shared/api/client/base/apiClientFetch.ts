import type { ApiClient } from '../ApiClient'

type ApiClientFetchRequestOptions = {
  url: string
  header?: Record<string, string>
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export class ApiClientFetch {
  constructor(private readonly apiClient: ApiClient) {}

  async request<TResult>({
    method,
    url,
    header = {},
    body,
  }: ApiClientFetchRequestOptions & {
    method: HttpMethod
    body?: unknown
  }): Promise<TResult> {
    const response = await fetch(url, {
      method,
      headers: {
        ...header,
      },
      ...(typeof body === 'object' && { body: JSON.stringify(body) }),
    })

    if (!response.ok) {
      throw new Error('API call failed')
    }

    return response.json()
  }
}
