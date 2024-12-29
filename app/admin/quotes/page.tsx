'use client'

import type { IQuotesListableInput } from '@/shared/types'

import { DpQueryKeys } from '@/shared/api'
import { PagedListableQueryLoader } from '@/shared/lib/loader'
import { useOverlay } from '@/shared/lib/overlay'
import { ApiClientCSR } from '@/shared/lib/supabase-csr'
import { Button, DataTableRenderer, DPage, Pagination } from '@/shared/ui'

import { CreateQuotesOverlay, QuotesColumns } from './_ui'

export default function QuotesPage() {
  const { open } = useOverlay()
  const loadList = (input: IQuotesListableInput) =>
    ApiClientCSR.quotes.getList(input)

  const handleCreateArticle = () => {
    open(({ isOpen, close }) => (
      <CreateQuotesOverlay isOpen={isOpen} close={close} />
    ))
  }

  return (
    <DPage>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quotes</h1>
        <Button onClick={handleCreateArticle}>Create Quote</Button>
      </div>

      <PagedListableQueryLoader
        fetchData={loadList}
        queryKey={DpQueryKeys.admin.quotes.list}
        params={{ limit: 10 }}
      >
        {({ list, totalPages, currentPage, onPageChange }) => (
          <div className="flex flex-col gap-4">
            <DataTableRenderer columns={QuotesColumns} data={list} />
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
