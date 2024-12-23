import type { IApiClientQuotesResponse } from '@/shared/api'
import type { ColumnDef } from '@tanstack/react-table'

import { formatDate } from '@/shared/lib/utils'

export const QuotesColumns: ColumnDef<
  IApiClientQuotesResponse<'getList'>['data'][number]
>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'quote_people.name',
    header: 'Quote Person Name',
  },
  {
    accessorKey: 'original_text',
    cell: ({ row }) => (
      <div className="break-all">{row.original.original_text}</div>
    ),
    header: 'Original Text',
  },
  {
    accessorKey: 'korean_text',
    cell: ({ row }) => (
      <div className="break-all">{row.original.korean_text}</div>
    ),
    header: 'Korean Text',
  },
  {
    accessorKey: 'created_at',
    cell: ({ row }) => {
      const dateText = row.original.created_at
      if (!dateText) return <div>No data</div>
      return <div>{formatDate(dateText)}</div>
    },
    header: 'Created At',
  },
  {
    accessorKey: 'updated_at',
    cell: ({ row }) => {
      const dateText = row.original.updated_at
      if (!dateText) return <div>No data</div>
      return <div>{formatDate(dateText)}</div>
    },
    header: 'Created At',
  },
]
