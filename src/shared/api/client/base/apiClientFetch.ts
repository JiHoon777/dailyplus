import type { ApiClientRoot } from '../ApiClient'
import type { IServerResponseBase } from '@/shared/types'

import {
  buildUrlWithQueryParams,
  type IBuildUrlWithQueryParamsInput,
} from '@/shared/lib/utils'
import { ApiErrorCode } from '@/shared/types'

export type FetchBaseRequestOptions<TBody> = {
  url: string | IBuildUrlWithQueryParamsInput
  header?: Record<string, string>
  credentials?: RequestCredentials
  method?: HttpMethod
  body?: TBody
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export class ApiClientFetch {
  constructor(private readonly _apiClient: ApiClientRoot) {}

  async request<TResult>({
    method,
    url,
    header = {},
    body,
    credentials,
  }: FetchBaseRequestOptions<unknown>): Promise<TResult> {
    const urlParsed =
      typeof url === 'object' ? buildUrlWithQueryParams(url) : url
    try {
      const response = await fetch(urlParsed, {
        method,
        credentials,
        headers: {
          ...header,
        },
        ...(typeof body === 'object' && { body: JSON.stringify(body) }),
      })

      console.log(37, url)
      const json = await response.json()
      console.log(38, json, response.ok)
      if (!json && !response.ok) {
        throw new Error('API call failed')
      }

      return json
    } catch (ex) {
      throw new Error('API call failed')
    }
  }

  private get baseHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    return headers
  }

  // Todo: use env server url
  private getUrl(path: string): string {
    return `http://localhost:4000/${path}`
  }

  // 호출하는 메서드에서 타입을 맞춰주고 있으므로 간단하게 any 이용
  private mapToBaseOptions(options: FetchBaseRequestOptions<unknown>) {
    const { url: _url, header, body } = options

    const urlParsed =
      typeof _url === 'object' ? buildUrlWithQueryParams(_url) : _url

    const url = this.getUrl(urlParsed)
    return {
      url,
      credentials: 'include' as RequestCredentials,
      header: {
        ...this.baseHeaders,
        ...header,
      },
      ...(typeof body === 'object' && { body }),
    }
  }

  private async appRequest<TResult>(
    input: FetchBaseRequestOptions<unknown>,
  ): Promise<TResult> {
    const res: IServerResponseBase<TResult> = await this.request(input)

    const errorText = `Error Code: ${res.errorCode}: ${res.errorMessage}`
    switch (res.errorCode) {
      case ApiErrorCode.AUTH_TOKEN_EXPIRED: {
        // Try to refresh token and retry the request
        await this._apiClient.auth.refreshToken()
        return this.appRequest(input)
      }
      default: {
        if (res.errorCode) {
          throw new Error(errorText, { cause: res.errorCode })
        }
      }
    }

    return res.data
  }

  async get<TResult = unknown>(
    options: FetchBaseRequestOptions<unknown>,
  ): Promise<TResult> {
    return this.appRequest({ ...this.mapToBaseOptions(options), method: 'GET' })
  }

  async post<TResult = unknown, TBody = unknown>(
    options: FetchBaseRequestOptions<TBody>,
  ): Promise<TResult> {
    return this.appRequest({
      ...this.mapToBaseOptions(options),
      method: 'POST',
    })
  }

  async put<TResult = unknown, TBody = unknown>(
    options: FetchBaseRequestOptions<TBody>,
  ): Promise<TResult> {
    return this.appRequest({ ...this.mapToBaseOptions(options), method: 'PUT' })
  }

  async patch<TResult = unknown, TBody = unknown>(
    options: FetchBaseRequestOptions<TBody>,
  ): Promise<TResult> {
    return this.appRequest({
      ...this.mapToBaseOptions(options),
      method: 'PATCH',
    })
  }

  async delete<TResult = unknown>(
    options: FetchBaseRequestOptions<unknown>,
  ): Promise<TResult> {
    return this.appRequest({
      ...this.mapToBaseOptions(options),
      method: 'DELETE',
    })
  }
}
