'use client'

import type { IQuotePersonListRequest } from '@/shared/types'

import { ApiClient, DpQueryKeys } from '@/shared/api'
import { PagedListableQueryLoader } from '@/shared/lib/loader'
import { useOverlay } from '@/shared/lib/overlay'
import { Button, DataTableRenderer, DPage, Pagination } from '@/shared/ui'

import { CreateQuotePeopleOverlay, QuotePeopleColumns } from './_ui'

export default function QuotepeoplePage() {
  const { open } = useOverlay()
  const loadList = (input: IQuotePersonListRequest) =>
    ApiClient.quotePeople.getList(input)

  const handleCreateArticle = () => {
    open(({ isOpen, close }) => (
      <CreateQuotePeopleOverlay isOpen={isOpen} close={close} />
    ))
  }

  return (
    <DPage>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quote People</h1>
        <Button onClick={handleCreateArticle}>Create Quote People</Button>
      </div>

      <PagedListableQueryLoader
        fetchData={loadList}
        queryKey={DpQueryKeys.admin.quotePeople.list}
        params={{ size: 10 }}
      >
        {({ list, totalPages, currentPage, onPageChange }) => (
          <div className="flex flex-col gap-4">
            <DataTableRenderer columns={QuotePeopleColumns} data={list} />
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
