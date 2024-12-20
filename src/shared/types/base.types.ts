/**
 * 검색 파라미터 타입
 * @property [key: string] - 검색 키
 */
export type SearchParamsType = { [key: string]: string | string[] | undefined }

/**
 * 페이지네이션이 가능한 데이터의 파라미터 타입
 * @template TParams - 추가 파라미터 타입
 * @property page - 현재 페이지 번호
 * @property limit - 한 페이지당 보여줄 아이템 수
 */
export type IListableParams<TParams extends Record<string, unknown>> = {
  page: number
  limit: number
} & TParams

/**
 * 페이지네이션이 적용된 응답 데이터의 타입
 * @template TData - 실제 데이터 타입
 * @property data - 실제 데이터 배열
 * @property totalCount - 전체 데이터 개수
 * @property error - 에러 발생 시 에러 객체, 없으면 null
 */
export type IListableResponse<TData> = {
  data: TData[]
  totalCount: number
  error: Error | null
}

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
