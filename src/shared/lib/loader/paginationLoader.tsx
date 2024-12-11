'use client'
import type { ListableParams } from './types'
import type { QueryKey } from '@tanstack/react-query'

import { useQuery } from '@tanstack/react-query'
import { isEqual } from 'lodash-es'
import { useEffect, useState } from 'react'

import { Pagination } from '@/shared/ui'
import { showToast } from '@/shared/utils'

/**
 * 페이지네이션 데이터 로딩을 처리하는 범용 컴포넌트입니다.
 *
 * @template TData - 리스트 아이템의 타입
 * @template TParams - 추가 쿼리 파라미터의 타입 (Record<string, unknown> 상속)
 *
 * @param fetchData - 페이지네이션된 데이터를 가져오는 함수. list, totalCount, error를 반환해야 함
 * @param params - 추가 쿼리 파라미터 (검색어, 필터 등). 따로 메모이제이션 하지 않아도 됩니다.
 * @param queryKey - React Query 캐싱을 위한 고유 키를 생성하는 함수
 * @param children - 아이템 리스트와 로딩 상태를 전달받는 렌더 함수
 *
 * @example
 * ```tsx
      <PaginationLoader
        fetchData={loadList}
        queryKey={(params) => queryKeys.adminArticles(params.page)}
        params={{ limit: 5 }}
      >
        {(list) => <DataTableRenderer columns={ArticleColumns} data={list} />}
      </PaginationLoader>
 * ```
 */
export const PaginationLoader = <
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
  queryKey: (options: ListableParams<TParams>) => QueryKey
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
  } as ListableParams<TParams>
  const { data, isLoading, error } = useQuery({
    queryFn: () => fetchData(queryParams),
    queryKey: queryKey(queryParams),
  })

  // Todo: Error Handling
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
