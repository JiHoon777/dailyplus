import type { IQuotePeople } from '@/shared/types'
import type { ColumnDef } from '@tanstack/react-table'

import { formatDate } from '@/shared/lib/utils'

export const QuotePeopleColumns: ColumnDef<IQuotePeople>[] = [
  {
    accessorKey: 'id',
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
    header: 'ID',
  },
  {
    accessorKey: 'name',
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
    header: 'Name',
  },
  {
    accessorKey: 'description',
    cell: ({ row }) => (
      <div className="break-all">{row.getValue('description')}</div>
    ),
    header: 'Description',
  },
  {
    accessorKey: 'birth_year',
    cell: ({ row }) => <div>{row.getValue('birth_year')}</div>,
    header: 'Birth Year',
  },
  {
    accessorKey: 'death_year',
    cell: ({ row }) => <div>{row.getValue('death_year')}</div>,
    header: 'Death Year',
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
