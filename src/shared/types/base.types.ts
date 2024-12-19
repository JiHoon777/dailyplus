export type SearchParamsType = { [key: string]: string | string[] | undefined }

export type IListableParams<TParams extends Record<string, unknown>> = {
  page: number
  limit: number
} & TParams

export type IListableResponse<TData> = {
  data: TData[]
  totalCount: number
  error: Error | null
}
