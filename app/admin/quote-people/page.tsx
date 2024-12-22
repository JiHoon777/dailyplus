'use client'

import type { IQuotePeopleListableInput } from '@/shared/types'

import { DpQueryKeys } from '@/shared/api'
import { PagedListableQueryLoader } from '@/shared/lib/loader'
import { useOverlay } from '@/shared/lib/overlay'
import { ApiClientCSR } from '@/shared/lib/supabase-csr'
import { Button, Pagination } from '@/shared/ui'
import { PageBase } from '@/widgets/layout'
import { DataTableRenderer } from '@/widgets/table'

import { QuotePeopleColumns } from './_ui'
import { CreateQuotePeopleOverlay } from './_ui/CreateQuotePeopleOverlay'

export default function QuotepeoplePage() {
  const { open } = useOverlay()
  const loadList = (input: IQuotePeopleListableInput) =>
    ApiClientCSR.quotePeople.getList(input)

  const handleCreateArticle = () => {
    open(({ isOpen, close }) => (
      <CreateQuotePeopleOverlay isOpen={isOpen} close={close} />
    ))
  }

  return (
    <PageBase>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quote People</h1>
        <Button onClick={handleCreateArticle}>Create Quote People</Button>
      </div>

      <PagedListableQueryLoader
        fetchData={loadList}
        queryKey={DpQueryKeys.admin.quotePeople.list}
        params={{ limit: 10 }}
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
    </PageBase>
  )
}
