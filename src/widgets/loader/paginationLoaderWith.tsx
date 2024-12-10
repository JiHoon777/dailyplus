'use client'
import { isEqual } from 'lodash-es'
import { useEffect, useRef, useState } from 'react'

import { Pagination } from '@/shared/ui'
import { showToast } from '@/shared/utils/showToast'

export const PaginationLoaderWith = <
  TData,
  TParams extends Record<string, any>,
>({
  fetchData,
  limit = 10,
  params = {} as TParams,
  resetPageOnParamsChange = true,
  children,
}: {
  fetchData: (options: { page: number; limit: number } & TParams) => Promise<{
    list: TData[]
    totalCount: number
  }>
  limit?: number
  params?: TParams
  resetPageOnParamsChange?: boolean
  children: (list: TData[], isLoading: boolean) => React.ReactNode
}) => {
  const [page, setPage] = useState(1)
  const [list, setList] = useState<TData[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const paramsRef = useRef(params)
  const loadingRef = useRef(false)

  useEffect(() => {
    if (resetPageOnParamsChange && !isEqual(params, paramsRef.current)) {
      paramsRef.current = params
      setPage(1)
    }
  }, [params, resetPageOnParamsChange])

  useEffect(() => {
    if (loadingRef.current) return
    console.log('fetching data')

    const loadData = async () => {
      loadingRef.current = true
      setIsLoading(true)
      try {
        const result = await fetchData({
          limit,
          page,
          ...paramsRef.current,
        })
        setList(result.list)
        setTotalCount(result.totalCount)
      } catch (error) {
        showToast.error(error)
      } finally {
        setIsLoading(false)
        loadingRef.current = false
      }
    }

    loadData()
  }, [page, limit, fetchData])

  const totalPages = Math.ceil(totalCount / limit)

  return (
    <div className="space-y-4">
      {children(list, isLoading)}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-start">
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
