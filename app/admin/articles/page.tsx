'use client'

import { useCallback } from 'react'

import {
  ArticleColumns,
  CreateArticleWithAiModal,
} from '@/_pages/admin/articles'
import { useOverlay } from '@/shared/lib/overlay'
import { createApiClientCSR } from '@/shared/lib/supabase-csr'
import { Button } from '@/shared/ui'
import { PageBase } from '@/widgets/layout'
import { PaginationLoaderWith } from '@/widgets/loader'
import { DataTableRenderer } from '@/widgets/table'

export default function ArticlesPage() {
  const { open } = useOverlay()

  const handleCreateArticle = () => {
    open(({ isOpen, close }) => (
      <CreateArticleWithAiModal isOpen={isOpen} onClose={close} />
    ))
  }

  const loadList = useCallback(
    async (input: { page: number; limit: number }) => {
      const apiClient = createApiClientCSR()
      const res = await apiClient.admin.getArticles(input)

      return {
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

      <PaginationLoaderWith fetchData={loadList} limit={5}>
        {(list) => <DataTableRenderer columns={ArticleColumns} data={list} />}
      </PaginationLoaderWith>
    </PageBase>
  )
}
