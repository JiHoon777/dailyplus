'use client'

import type { IArticle } from '@/shared/types'

import { useCallback } from 'react'

import { ArticleColumns } from '@/_pages/admin/articles'
import { CreateArticleWithAiModal } from '@/features/articleGeneration'
import { useAppQueries } from '@/shared/api'
import {
  type IListableResponse,
  PagedListableQueryLoader,
} from '@/shared/lib/loader'
import { useOverlay } from '@/shared/lib/overlay'
import { createApiClientCSR } from '@/shared/lib/supabase-csr'
import { Button, Pagination } from '@/shared/ui'
import { PageBase } from '@/widgets/layout'
import { DataTableRenderer } from '@/widgets/table'

export default function ArticlesPage() {
  const { open } = useOverlay()
  const queryKeys = useAppQueries.queryKeys

  const handleCreateArticle = () => {
    open(({ isOpen, close }) => (
      <CreateArticleWithAiModal isOpen={isOpen} onClose={close} />
    ))
  }

  const loadList = useCallback(
    async (input: {
      page: number
      limit: number
    }): Promise<IListableResponse<IArticle>> => {
      const apiClient = createApiClientCSR()
      const res = await apiClient.getArticles(input)

      return {
        data: res.data ?? [],
        error: res.error,
        totalCount: res.count ?? 0,
      }
    },
    [],
  )

  return (
    <PageBase>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Button onClick={handleCreateArticle}>Create Article with AI</Button>
      </div>

      <PagedListableQueryLoader
        fetchData={loadList}
        queryKey={(params) => queryKeys.adminArticles(params.page)}
        params={{ limit: 5 }}
      >
        {({ list, totalPages, currentPage, onPageChange }) => (
          <div className="flex flex-col gap-4">
            <DataTableRenderer columns={ArticleColumns} data={list} />
            <div className="self-start">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        )}
      </PagedListableQueryLoader>
    </PageBase>
  )
}
