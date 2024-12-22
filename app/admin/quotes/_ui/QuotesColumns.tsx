import type { IQuotes } from '@/shared/types'
import type { ColumnDef } from '@tanstack/react-table'

import { formatDate } from '@/shared/lib/utils'

export const QuotesColumns: ColumnDef<IQuotes>[] = [
  {
    accessorKey: 'id',
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
    header: 'ID',
  },
  {
    accessorKey: 'original_text',
    cell: ({ row }) => (
      <div className="break-all">{row.getValue('original_text')}</div>
    ),
    header: 'Original Text',
  },
  {
    accessorKey: 'korean_text',
    cell: ({ row }) => <div>{row.getValue('korean_text')}</div>,
    header: 'Korean Text',
  },
  {
    accessorKey: 'created_at',
    cell: ({ row }) => {
      const dateText: string = row.getValue('created_at')
      if (!dateText) return <div>No data</div>
      return <div>{formatDate(dateText)}</div>
    },
    header: 'Created At',
  },
  {
    accessorKey: 'updated_at',
    cell: ({ row }) => {
      const dateText: string = row.getValue('updated_at')
      if (!dateText) return <div>No data</div>
      return <div>{formatDate(dateText)}</div>
    },
    header: 'Created At',
  },
]
