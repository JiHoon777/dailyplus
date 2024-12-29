'use client'

import type { IQuoteAiInterpretationsListableInput } from '@/shared/types'

import { DpQueryKeys } from '@/shared/api'
import { PagedListableQueryLoader } from '@/shared/lib/loader'
import { ApiClientCSR } from '@/shared/lib/supabase-csr'
import { DataTableRenderer, DPage, Pagination } from '@/shared/ui'

import { QuoteAiInterpretationsColumns } from './_ui'

export default function QuoteAiInterpretationsPage() {
  const loadList = (input: IQuoteAiInterpretationsListableInput) =>
    ApiClientCSR.quoteAiInterpretations.getList(input)

  return (
    <DPage>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quote Ai Interpretations</h1>
      </div>

      <PagedListableQueryLoader
        fetchData={loadList}
        queryKey={DpQueryKeys.admin.quoteAiInterpretations.list}
        params={{ limit: 10 }}
      >
        {({ list, totalPages, currentPage, onPageChange }) => (
          <div className="flex flex-col gap-4">
            <DataTableRenderer
              columns={QuoteAiInterpretationsColumns}
              data={list}
            />
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
