'use client'

import type { IArticle } from '@/shared/types'
import type { ColumnDef } from '@tanstack/react-table'

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useGetArticles } from '@/shared/api'
import { Button, ScreenLoading } from '@/shared/ui'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { PageBase } from '@/widgets/layout'
import { useOverlay } from '@/shared/lib/overlay'
import { CreateArticleWithAiModal } from '@/pages/admin/posts'

const columns: ColumnDef<IArticle>[] = [
  {
    accessorKey: 'id',
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
    header: 'ID',
  },
  {
    accessorKey: 'unique_id',
    cell: ({ row }) => <div>{row.getValue('unique_id')}</div>,
    header: 'Unique Id',
  },
  {
    accessorKey: 'title',
    cell: ({ row }) => <div>{row.getValue('title')}</div>,
    header: 'Title',
  },
  {
    accessorKey: 'summary',
    cell: ({ row }) => <div>{row.getValue('summary')}</div>,
    header: 'Summary',
  },
  {
    accessorKey: 'reference_name',
    cell: ({ row }) => <div>{row.getValue('reference_name')}</div>,
    header: 'Reference Name',
  },
  {
    accessorKey: 'reference_url',
    cell: ({ row }) => <div>{row.getValue('reference_url')}</div>,
    header: 'Reference Url',
  },
  {
    accessorKey: 'type',
    cell: ({ row }) => <div>{row.getValue('type')}</div>,
    header: 'Type',
  },
  {
    accessorKey: 'published_at',
    cell: ({ row }) => <div>{row.getValue('published_at')}</div>,
    header: 'Published At',
  },
]

// Todo: 테이블 렌더러 구현하면 분리
export default function ArticlesPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useGetArticles(page)
  const { open } = useOverlay()

  const table = useReactTable({
    columns,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const handleCreateArticle = () => {
    open(({ isOpen, close }) => (
      <CreateArticleWithAiModal isOpen={isOpen} onClose={close} />
    ))
  }

  useEffect(() => {
    if (error) {
      toast(JSON.stringify(error))
    }
  }, [error])

  console.log(17, data)

  if (isLoading) {
    return <ScreenLoading />
  }

  return (
    <PageBase className="gap-6">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Manage Aritlces</h3>
        <Button onClick={handleCreateArticle}>Create Article With Ai</Button>
      </div>
      <div className="w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </PageBase>
  )
}