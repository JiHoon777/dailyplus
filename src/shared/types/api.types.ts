/**
 * API 클라이언트의 메서드 응답 타입을 추출하는 유틸리티 타입
 * @template TClient - API 클라이언트 타입
 * @template TMethod - 클라이언트의 메서드 이름
 * @example
 * // getArticles 메서드의 응답 타입 추출
 * type ArticlesResponse = IApiClientResponse<ApiClient, 'getArticles'>
 */
export type IApiClientResponse<
  TClient,
  TMethod extends keyof TClient,
> = TClient[TMethod] extends (...args: any[]) => any
  ? Awaited<ReturnType<TClient[TMethod]>>
  : never
