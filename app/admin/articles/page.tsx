'use client'

import type { IArticlesListableInput } from '@/shared/types'

import { CreateArticleWithAiOverlay } from '@/features/articleGeneration'
import { DpQueryKeys } from '@/shared/api'
import { PagedListableQueryLoader } from '@/shared/lib/loader'
import { useOverlay } from '@/shared/lib/overlay'
import { ApiClientCSR } from '@/shared/lib/supabase-csr'
import { Button, DataTableRenderer, Pagination } from '@/shared/ui'
import { PageBase } from '@/widgets/layout'

import { ArticleColumns } from './_ui'

export default function ArticlesPage() {
  const { open } = useOverlay()
  const loadList = (input: IArticlesListableInput) =>
    ApiClientCSR.articles.getList(input)

  const handleCreateArticle = () => {
    open(({ isOpen, close }) => (
      <CreateArticleWithAiOverlay isOpen={isOpen} close={close} />
    ))
  }

  return (
    <PageBase>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Button onClick={handleCreateArticle}>Create Article with AI</Button>
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
    </PageBase>
  )
}
