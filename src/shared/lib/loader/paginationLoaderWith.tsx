'use client'
import type { QueryKey } from '@tanstack/react-query'

import { useQuery } from '@tanstack/react-query'
import { isEqual } from 'lodash-es'
import { useEffect, useRef, useState } from 'react'

import { Pagination } from '@/shared/ui'
import { showToast } from '@/shared/utils'

type PaginationParams = {
  page: number
  limit: number
}

export const PaginationLoaderWith = <
  TData,
  TParams extends Record<string, any>,
>({
  fetchData,
  limit = 10,
  params = {} as TParams,
  queryKey,
  children,
}: {
  fetchData: (options: PaginationParams & TParams) => Promise<{
    list: TData[]
    totalCount: number
    error: Error | null
  }>
  limit?: number
  params?: TParams
  queryKey: (options: PaginationParams & TParams) => QueryKey
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

  const { data, isLoading, error } = useQuery({
    queryFn: () => fetchData({ limit, page, ...cachedParams }),
    queryKey: queryKey({ limit, page, ...cachedParams }),
  })

  useEffect(() => {
    if (error) {
      showToast.error(error)
    }
  }, [error])

  const totalPages = Math.ceil((data?.totalCount ?? 0) / limit)

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
