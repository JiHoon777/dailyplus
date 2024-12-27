import type { IQuotePeople } from '@/shared/types'
import type { ColumnDef } from '@tanstack/react-table'

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
    header: 'Created At',
    meta: {
      valueType: 'date',
    },
  },
  {
    accessorKey: 'updated_at',
    header: 'Created At',
    meta: {
      valueType: 'date',
    },
  },
]
