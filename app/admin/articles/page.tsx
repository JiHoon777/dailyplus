'use client'

import { useCallback } from 'react'

import { ArticleColumns } from '@/_pages/admin/articles'
import { CreateArticleWithAiModal } from '@/features/articleGeneration'
import { useAppQueries } from '@/shared/api'
import { PaginationLoader } from '@/shared/lib/loader'
import { useOverlay } from '@/shared/lib/overlay'
import { createApiClientCSR } from '@/shared/lib/supabase-csr'
import { Button } from '@/shared/ui'
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
    async (input: { page: number; limit: number }) => {
      const apiClient = createApiClientCSR()
      const res = await apiClient.getArticles(input)

      return {
        error: res.error,
        list: res.data ?? [],
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

      <PaginationLoader
        fetchData={loadList}
        queryKey={(params) => queryKeys.adminArticles(params.page)}
        params={{ limit: 5 }}
      >
        {(list) => <DataTableRenderer columns={ArticleColumns} data={list} />}
      </PaginationLoader>
    </PageBase>
  )
}
