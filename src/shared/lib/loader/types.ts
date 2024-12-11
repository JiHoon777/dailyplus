export type PaginationParams<TParams extends Record<string, unknown>> = {
  page: number
  limit: number
} & TParams
