'use client'

import { CreateArticleWithAiModal } from '@/features/articleGeneration'
import { DpQueryKeys } from '@/shared/api'
import { PagedListableQueryLoader } from '@/shared/lib/loader'
import { useOverlay } from '@/shared/lib/overlay'
import { ApiClientCSR } from '@/shared/lib/supabase-csr'
import { Button, Pagination } from '@/shared/ui'
import { PageBase } from '@/widgets/layout'
import { DataTableRenderer } from '@/widgets/table'

import { ArticleColumns } from './_ui'

export default function ArticlesPage() {
  const { open } = useOverlay()
  const loadList = ApiClientCSR.articles.getList.bind(ApiClientCSR)

  const handleCreateArticle = () => {
    open(({ isOpen, close }) => (
      <CreateArticleWithAiModal isOpen={isOpen} onClose={close} />
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
