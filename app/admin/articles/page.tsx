'use client'

import type { IArticleListRequest } from '@/shared/types'

import { ApiClient, DpQueryKeys } from '@/shared/api'
import { PagedListableQueryLoader } from '@/shared/lib/loader'
import { useOverlay } from '@/shared/lib/overlay'
import { Button, DataTableRenderer, DPage, Pagination } from '@/shared/ui'

import { ArticleColumns, CreateArticleOverlay } from './_ui'

export default function ArticlesPage() {
  const { open } = useOverlay()
  const loadList = (input: IArticleListRequest) =>
    ApiClient.articles.getList(input)

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
          <Button onClick={handleCreateArticle}>Create Article</Button>
        </div>
      </div>

      <PagedListableQueryLoader
        fetchData={loadList}
        queryKey={DpQueryKeys.admin.articles.list}
        params={{ size: 5 }}
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
