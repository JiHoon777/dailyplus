import type { ApiClient } from '../ApiClient'

import { tokenStorage } from '@/shared/lib/utils'

import { ApiClientFetch } from './apiClientFetch'

type AppRequestOptions = {
  path: string
  header?: Record<string, string>
}

type AppRequestOptionsWithBody<TBody> = AppRequestOptions & {
  body: TBody
}

export class AppApiClient extends ApiClientFetch {
  constructor(apiClient: ApiClient) {
    super(apiClient)
  }

  private get baseHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    const token = tokenStorage.getToken()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    return headers
  }

  // Todo: use env server url
  private getUrl(path: string): string {
    return `http://localhost:4000/${path}`
  }

  // 호출하는 메서드에서 타입을 맞춰주고 있으므로 간단하게 any 이용
  private mapToBaseOptions(options: any) {
    const { path, header, body } = options
    return {
      url: this.getUrl(path),
      header: {
        ...this.baseHeaders,
        ...header,
      },
      ...(typeof body === 'object' && { body }),
    }
  }

  async get<TResult = unknown>(options: AppRequestOptions): Promise<TResult> {
    return super.request({ ...this.mapToBaseOptions(options), method: 'GET' })
  }

  async post<TResult = unknown, TBody = unknown>(
    options: AppRequestOptionsWithBody<TBody>,
  ): Promise<TResult> {
    return super.request({ ...this.mapToBaseOptions(options), method: 'POST' })
  }

  async put<TResult = unknown, TBody = unknown>(
    options: AppRequestOptionsWithBody<TBody>,
  ): Promise<TResult> {
    return super.request({ ...this.mapToBaseOptions(options), method: 'PUT' })
  }

  async patch<TResult = unknown, TBody = unknown>(
    options: AppRequestOptionsWithBody<TBody>,
  ): Promise<TResult> {
    return super.request({ ...this.mapToBaseOptions(options), method: 'PATCH' })
  }

  async delete<TResult = unknown>(
    options: AppRequestOptions,
  ): Promise<TResult> {
    return super.request({
      ...this.mapToBaseOptions(options),
      method: 'DELETE',
    })
  }
}
