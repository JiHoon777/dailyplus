/**
 * 검색 파라미터 타입
 * @property [key: string] - 검색 키
 */
export type SearchParamsType = { [key: string]: string | string[] | undefined }

/**
 * 객체의 메서드 응답 타입을 추출하는 유틸리티 타입
 * @template TObject - 대상 객체 타입
 * @template TMethod - 객체의 메서드 이름
 * @example
 * // getArticles 메서드의 응답 타입 추출
 * type ArticlesResponse = ExtractMethodReturn<ApiClient, 'getArticles'>
 */
export type ExtractMethodReturn<
  TObject,
  TMethod extends keyof TObject,
> = TObject[TMethod] extends (...args: any[]) => any
  ? Awaited<ReturnType<TObject[TMethod]>>
  : never

/**
 * API 클라이언트 메서드의 파라미터 타입을 추출하는 유틸리티 타입
 * @template T - API 클라이언트 타입
 * @template M - 클라이언트의 메서드 이름
 * @example
 * // getArticles 메서드의 파라미터 타입 추출
 * type ArticlesParams = ExtractMethodParameters<ApiClient, 'getArticles'>
 */
export type ExtractMethodParameters<T, M extends keyof T> = T[M] extends (
  ...args: infer P
) => any
  ? P[0]
  : never
export type SupportedLanguagesType = 'ko' | 'en'
