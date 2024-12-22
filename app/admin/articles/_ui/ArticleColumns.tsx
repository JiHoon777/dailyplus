import type { IArticles } from '@/shared/types'
import type { ColumnDef } from '@tanstack/react-table'

import { format } from 'date-fns'

export const ArticleColumns: ColumnDef<IArticles>[] = [
  // {
  //   cell: ({ row }) => <div>No. {row.index + 1}</div>,
  //   header: 'No.',
  //   id: 'index',
  // },
  {
    accessorKey: 'id',
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
    header: 'ID',
  },
  {
    accessorKey: 'title',
    cell: ({ row }) => <div className="break-all">{row.getValue('title')}</div>,
    header: 'Title',
    minSize: 1000,
  },
  {
    accessorKey: 'summary',
    cell: ({ row }) => (
      <div className="break-all">{row.getValue('summary')}</div>
    ),
    header: 'Summary',
    minSize: 1000,
  },
  {
    accessorKey: 'reference_name',
    cell: ({ row }) => <div>{row.getValue('reference_name')}</div>,
    header: 'Reference Name',
  },
  {
    accessorKey: 'reference_url',
    cell: ({ row }) => (
      <div className="max-w-[150px] break-all">
        <a
          href={row.getValue('reference_url')}
          target={'_blank'}
          rel="noreferrer noopener"
          className={'text-blue-700 hover:underline'}
        >
          바로 가기
        </a>
      </div>
    ),
    header: 'Reference Url',
  },
  {
    accessorKey: 'type',
    cell: ({ row }) => <div>{row.getValue('type')}</div>,
    header: 'Type',
  },
  {
    accessorKey: 'published_at',
    cell: ({ row }) => {
      const dateText = row.getValue('published_at')
      if (!dateText) return <div>No data</div>
      return <div>{format(dateText as string, 'yyyy-MM-dd')}</div>
    },
    header: 'Published At',
  },
]
