'use client'
import type { QueryKey } from '@tanstack/react-query'

import { useQuery } from '@tanstack/react-query'
import { isEqual } from 'lodash-es'
import { useEffect, useState } from 'react'

import { Pagination } from '@/shared/ui'
import { showToast } from '@/shared/utils'

export type PaginationParams<TParams extends Record<string, unknown>> = {
  page: number
  limit: number
} & TParams

export const PaginationLoader = <
  TData,
  TParams extends Record<string, unknown>,
>({
  fetchData,
  params,
  queryKey,
  children,
}: {
  fetchData: (options: PaginationParams<TParams>) => Promise<{
    list: TData[]
    totalCount: number
    error: Error | null
  }>
  params: Omit<PaginationParams<TParams>, 'page'>
  queryKey: (options: PaginationParams<TParams>) => QueryKey
  children: (list: TData[], isLoading: boolean) => React.ReactNode
}) => {
  const [page, setPage] = useState(1)
  const [cachedParams, setCachedParams] = useState(params)

  useEffect(() => {
    if (!isEqual(params, cachedParams)) {
      setPage(1)
      setCachedParams(params)
    }
  }, [params, cachedParams])

  const queryParams = {
    page,
    ...cachedParams,
  } as PaginationParams<TParams>
  const { data, isLoading, error } = useQuery({
    queryFn: () => fetchData(queryParams),
    queryKey: queryKey(queryParams),
  })

  useEffect(() => {
    if (error) {
      showToast.error(error)
    }
  }, [error])

  const totalPages = Math.ceil((data?.totalCount ?? 0) / params.limit)

  return (
    <div className="flex flex-col gap-4">
      {children(data?.list ?? [], isLoading)}
      {totalPages > 1 && (
        <div className="self-start">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  )
}
