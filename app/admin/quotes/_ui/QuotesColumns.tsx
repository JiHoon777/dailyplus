import type { IApiClientQuotesResponse } from '@/shared/api'
import type { ColumnDef } from '@tanstack/react-table'

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
    header: 'Original Text',
  },
  {
    accessorKey: 'korean_text',
    header: 'Korean Text',
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    meta: {
      valueType: 'date',
    },
  },
  {
    accessorKey: 'updated_at',
    header: 'Updated At',
    meta: {
      valueType: 'date',
    },
  },
]
