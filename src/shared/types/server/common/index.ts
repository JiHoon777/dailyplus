export type IServerResponseBase<T> = {
  success: boolean
  data: T
  errorCode: string
  errorMessage: string
}

/**
 * 페이지네이션이 가능한 데이터의 파라미터 타입
 * @template TParams - 추가 파라미터 타입
 * @property page - 현재 페이지 번호
 * @property size - 한 페이지당 보여줄 아이템 수
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type IServerListRequest<TParams extends Record<string, unknown> = {}> = {
  page: number
  size: number
} & TParams

/**
 * 페이지네이션이 적용된 응답 데이터의 타입
 * @template TData - 실제 데이터 타입
 * @property data - 실제 데이터 배열
 * @property total - 전체 데이터 개수
 * @property error - 에러 발생 시 에러 객체, 없으면 null
 */
export type IServerListResponse<TData> = {
  total: number
  page: number
  size: number
  data: TData[]
}

export type IServerEntityBase = {
  id: number
  createdAt: Date
  updatedAt: Date
}
