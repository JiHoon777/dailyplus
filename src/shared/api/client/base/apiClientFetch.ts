import type { ApiClientRoot } from '../ApiClient'
import type { IServerResponseBase } from '@/shared/types'
import type { KyInstance, Options } from 'ky'

import ky from 'ky'

import {
  buildUrlWithQueryParams,
  type IBuildUrlWithQueryParamsInput,
  Logger,
} from '@/shared/lib/utils'
import { ApiErrorCode } from '@/shared/types'

export class ApiClientFetch {
  private readonly logger = new Logger(this.constructor.name)
  private api!: KyInstance

  constructor(private readonly _apiClient: ApiClientRoot) {
    this.init()
  }

  private parseUrl(url: string | IBuildUrlWithQueryParamsInput): string {
    return typeof url === 'object' ? buildUrlWithQueryParams(url) : url
  }

  private async request<T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string | IBuildUrlWithQueryParamsInput,
    options?: Options,
  ): Promise<T> {
    const response = await this.api[method](this.parseUrl(url), options)
    const data: IServerResponseBase<T> = await response.json()
    return data.data
  }

  async get<TResult = unknown>(
    url: string | IBuildUrlWithQueryParamsInput,
    options?: Options,
  ): Promise<TResult> {
    return this.request<TResult>('get', url, options)
  }

  async post<TResult = unknown>(
    url: string | IBuildUrlWithQueryParamsInput,
    options?: Options,
  ): Promise<TResult> {
    return this.request<TResult>('post', url, options)
  }

  async put<TResult = unknown>(
    url: string | IBuildUrlWithQueryParamsInput,
    options?: Options,
  ): Promise<TResult> {
    return this.request<TResult>('put', url, options)
  }

  async patch<TResult = unknown>(
    url: string | IBuildUrlWithQueryParamsInput,
    options?: Options,
  ): Promise<TResult> {
    return this.request<TResult>('patch', url, options)
  }

  async delete<TResult = unknown>(
    url: string | IBuildUrlWithQueryParamsInput,
    options?: Options,
  ): Promise<TResult> {
    return this.request<TResult>('delete', url, options)
  }

  private init() {
    this.api = ky.create({
      // Todo: use env server url
      prefixUrl: 'http://localhost:4000',
      credentials: 'include',
      timeout: 10000,
      retry: 2,
      hooks: {
        beforeRequest: [
          (request) => {
            request.headers.set('Content-Type', 'application/json')
          },
        ],
        afterResponse: [
          async (request, options, response) => {
            const res: IServerResponseBase<unknown> = await response
              .clone()
              .json()
            this.logger.group(`afterResponse.res, ${request.url}`)
            this.logger.debug(
              `response.ok: ${response.ok}, response.status: ${response.status}`,
            )
            this.logger.debug(res)
            this.logger.groupEnd()

            if (res.errorCode) {
              const errorText = `Error Code: ${res.errorCode}: ${res.errorMessage}`

              if (res.errorCode === ApiErrorCode.AUTH_TOKEN_EXPIRED) {
                // Try to refresh token and retry the request
                await this._apiClient.auth.refreshToken()

                return ky(request)
              } else {
                throw new Error(errorText, { cause: res.errorCode })
              }
            }

            return response
          },
        ],
        beforeError: [
          (error) => {
            this.logger.group(`beforeError.error, ${error.request.url}`)
            this.logger.error(error)
            this.logger.groupEnd()
            return error
          },
        ],
      },
    })
  }
}
