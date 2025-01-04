import type { IArticle } from '@/shared/types'
import type { ColumnDef } from '@tanstack/react-table'

export const ArticleColumns: ColumnDef<IArticle>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'title',
    header: 'Title',
    minSize: 1000,
  },
  {
    accessorKey: 'summary',
    header: 'Summary',
    minSize: 1000,
  },
  {
    accessorKey: 'referenceName',
    header: 'Reference Name',
  },
  {
    accessorKey: 'referenceUrl',
    header: 'Reference Url',
    meta: {
      valueType: 'link',
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'publishedAt',
    header: 'Published At',
    meta: {
      valueType: 'date',
    },
  },
]
