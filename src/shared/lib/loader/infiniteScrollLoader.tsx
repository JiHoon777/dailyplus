import type { ListableParams } from '.'

import { type QueryKey, useInfiniteQuery } from '@tanstack/react-query'

export const InfiniteScrollLoader = <
  TData,
  TParams extends Record<string, unknown>,
>({
  fetchData,
  params,
  queryKey,
  children,
}: {
  fetchData: (options: ListableParams<TParams>) => Promise<{
    list: TData[]
    totalCount: number
    error: Error | null
  }>
  params: Omit<ListableParams<TParams>, 'page'>
  queryKey: (options: Omit<ListableParams<TParams>, 'page'>) => QueryKey
  children: (list: TData[]) => React.ReactNode
}) => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useInfiniteQuery<
    {
      list: TData[]
      totalCount: number
      error: Error | null
    },
    Error,
    {
      list: TData[]
      totalCount: number
      error: Error | null
    },
    QueryKey,
    number
  >({
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.totalCount / params.limit)
      const nextPage = allPages.length + 1

      return nextPage <= totalPages ? nextPage : undefined
    },
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const result = await fetchData({
        ...params,
        page: pageParam,
      })

      if (result.error) {
        throw result.error
      }

      return result
    },
    queryKey: queryKey(params),
  })

  if (error) {
    return <div>Error: {error.toString()}</div>
  }

  const flattenedList = data?.list.flatMap((page) => page) ?? []

  return <div>loading...</div>
}
