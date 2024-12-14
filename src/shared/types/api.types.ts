import type { ApiClientApp } from '../api/apiClientApp'

export type IApiClientApp = typeof ApiClientApp.prototype

type IApiClientResponse<
  TClient,
  TMethod extends keyof TClient,
> = TClient[TMethod] extends (...args: any[]) => any
  ? Awaited<ReturnType<TClient[TMethod]>>
  : never

export type IApiClientAppResponse<TMethod extends keyof IApiClientApp> =
  IApiClientResponse<IApiClientApp, TMethod>
