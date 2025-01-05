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
    accessorKey: 'quotePerson.name',
    header: 'Quote Person Name',
  },
  {
    accessorKey: 'originalText',
    header: 'Original Text',
  },
  {
    accessorKey: 'koreanText',
    header: 'Korean Text',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    meta: {
      valueType: 'date',
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    meta: {
      valueType: 'date',
    },
  },
]
