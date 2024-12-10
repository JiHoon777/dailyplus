'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import {
  ArticleColumns,
  CreateArticleWithAiModal,
} from '@/_pages/admin/articles'
import { useGetArticles } from '@/shared/api'
import { useOverlay } from '@/shared/lib/overlay'
import { Button, PaginationWithState, ScreenLoading } from '@/shared/ui'
import { PageBase } from '@/widgets/layout'
import { DataTableRenderer } from '@/widgets/table'

export default function ArticlesPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useGetArticles(page)
  const { open } = useOverlay()

  const handleCreateArticle = () => {
    open(({ isOpen, close }) => (
      <CreateArticleWithAiModal isOpen={isOpen} onClose={close} />
    ))
  }

  if (isLoading) return <ScreenLoading />
  if (error) {
    toast.error('Failed to load articles')
    return null
  }

  console.log(33, data)

  const totalPages = Math.ceil((data?.length || 0) / 10) // 한 페이지당 10개 항목 기준

  return (
    <PageBase>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Button onClick={handleCreateArticle}>Create Article with AI</Button>
      </div>

      <div className="space-y-4">
        <DataTableRenderer columns={ArticleColumns} data={data ?? []} />

        <div className="mt-4 flex justify-center">
          <PaginationWithState
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </PageBase>
  )
}
