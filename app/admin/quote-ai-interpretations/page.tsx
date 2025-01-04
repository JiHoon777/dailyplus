'use client'

import type { IQuoteAiInterpretationListRequest } from '@/shared/types'

import { ApiClient, DpQueryKeys } from '@/shared/api'
import { PagedListableQueryLoader } from '@/shared/lib/loader'
import { DataTableRenderer, DPage, Pagination } from '@/shared/ui'

import { QuoteAiInterpretationsColumns } from './_ui'

export default function QuoteAiInterpretationsPage() {
  const loadList = (input: IQuoteAiInterpretationListRequest) =>
    ApiClient.quoteAiInterpretations.getList(input)

  return (
    <DPage>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quote Ai Interpretations</h1>
      </div>

      <PagedListableQueryLoader
        fetchData={loadList}
        queryKey={DpQueryKeys.admin.quoteAiInterpretations.list}
        params={{ size: 10 }}
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
