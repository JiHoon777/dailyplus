import type { IListableParams } from '.'
import type { IServerListResponse } from '@/shared/types/server/common'

import { type QueryKey, useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { showToast } from '@/shared/lib/utils'

export const InfiniteListableQueryLoader = <
  TData,
  TParams extends Record<string, unknown>,
>({
  fetchData,
  params,
  queryKey,
  children,
}: {
  fetchData: (
    options: IListableParams<TParams>,
  ) => Promise<IServerListResponse<TData>>
  params: Omit<IListableParams<TParams>, 'page'>
  queryKey: (options: Omit<IListableParams<TParams>, 'page'>) => QueryKey
  children: ({
    list,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  }: {
    list: TData[]
    isLoading: boolean
    isFetchingNextPage: boolean
    hasNextPage: boolean
    fetchNextPage: () => void
  }) => React.ReactNode
}) => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useInfiniteQuery<IServerListResponse<TData>, Error>({
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / params.size)
      const nextPage = allPages.length + 1

      return nextPage <= totalPages ? nextPage : undefined
    },
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const result = await fetchData({
        ...params,
        page: pageParam,
      } as IListableParams<TParams>)

      return result
    },
    queryKey: queryKey(params),
  })

  // Todo: Error Handling
  useEffect(() => {
    if (error) {
      showToast.error(error)
      console.error(error)
    }
  }, [error])

  const flattenedList = data?.pages.flatMap((page) => page.data) ?? []
  return (
    <>
      {children({
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        list: flattenedList,
      })}
    </>
  )
}
