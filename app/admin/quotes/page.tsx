'use client'

import type {
  IQuotePeopleListableInput,
  IQuotesListableInput,
} from '@/shared/types'

import { DpQueryKeys } from '@/shared/api'
import { PagedListableQueryLoader } from '@/shared/lib/loader'
import { useOverlay } from '@/shared/lib/overlay'
import { ApiClientCSR } from '@/shared/lib/supabase-csr'
import { Button, Pagination } from '@/shared/ui'
import { PageBase } from '@/widgets/layout'
import { DataTableRenderer } from '@/widgets/table'

import { QuotesColumns } from './_ui'
import { CreateQuotesOverlay } from './_ui/CreateQuotesOverlay'

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
    <PageBase>
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
    </PageBase>
  )
}
