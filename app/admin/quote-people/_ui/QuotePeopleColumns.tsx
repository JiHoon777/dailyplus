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
    accessorKey: 'birth_year',
    header: 'Birth Year',
  },
  {
    accessorKey: 'death_year',
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
    header: 'Updated At',
    meta: {
      valueType: 'date',
    },
  },
]
