'use client'

import type { IArticlesListableInput } from '@/shared/types'

import { DpQueryKeys } from '@/shared/api'
import { PagedListableQueryLoader } from '@/shared/lib/loader'
import { useOverlay } from '@/shared/lib/overlay'
import { ApiClientCSR } from '@/shared/lib/supabase-csr'
import { Button, DataTableRenderer, DPage, Pagination } from '@/shared/ui'

import {
  ArticleColumns,
  CreateArticleOverlay,
  CreateArticleWithAiOverlay,
} from './_ui'

export default function ArticlesPage() {
  const { open } = useOverlay()
  const loadList = (input: IArticlesListableInput) =>
    ApiClientCSR.articles.getList(input)

  const handleCreateArticleWithAi = () => {
    open(({ isOpen, close }) => (
      <CreateArticleWithAiOverlay isOpen={isOpen} close={close} />
    ))
  }
  const handleCreateArticle = () => {
    open(({ isOpen, close }) => (
      <CreateArticleOverlay isOpen={isOpen} close={close} />
    ))
  }

  return (
    <DPage>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Articles</h1>
        <div className="flex items-center gap-4">
          <Button onClick={handleCreateArticleWithAi}>
            Create Article with AI
          </Button>
          <Button onClick={handleCreateArticle}>Create Article</Button>
        </div>
      </div>

      <PagedListableQueryLoader
        fetchData={loadList}
        queryKey={DpQueryKeys.admin.articles.list}
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
    </DPage>
  )
}
