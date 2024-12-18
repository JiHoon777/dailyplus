'use client'

import { ArticleColumns } from '@/_pages/admin/articles'
import { CreateArticleWithAiModal } from '@/features/articleGeneration'
import { useAppQueries } from '@/shared/api'
import { PagedListableQueryLoader } from '@/shared/lib/loader'
import { useOverlay } from '@/shared/lib/overlay'
import { createApiClientCSR } from '@/shared/lib/supabase-csr'
import { Button, Pagination } from '@/shared/ui'
import { PageBase } from '@/widgets/layout'
import { DataTableRenderer } from '@/widgets/table'

export default function ArticlesPage() {
  const { open } = useOverlay()
  const queryKeys = useAppQueries.queryKeys
  const apiClient = createApiClientCSR()
  const loadList = apiClient.getArticles.bind(apiClient)

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
        queryKey={queryKeys.admin.articlesPagination}
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
