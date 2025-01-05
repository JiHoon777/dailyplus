import type { IQuotePerson } from '@/shared/types'
import type { ColumnDef } from '@tanstack/react-table'

export const QuotePeopleColumns: ColumnDef<IQuotePerson>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
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
