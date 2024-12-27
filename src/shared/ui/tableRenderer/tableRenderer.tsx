import type { Cell, ColumnDef } from '@tanstack/react-table'

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'

import { formatDate } from '@/shared/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[]
  data: TData[]
}

export function DataTableRenderer<TData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const table = useReactTable({
    columnResizeMode: 'onChange',
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                  >
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
                  <TableCell
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                  >
                    <TableCellRenderer cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

const TableCellRenderer = <TData,>({
  cell,
}: {
  cell: Cell<TData, unknown>
}) => {
  const value = cell.getValue()?.toString() ?? ''
  const meta = cell.column.columnDef.meta

  if (meta?.valueType === 'custom') {
    return flexRender(cell.column.columnDef.cell, cell.getContext())
  }

  if (!value) {
    return <div>No data</div>
  }

  if (meta?.valueType === 'date') {
    return <div>{formatDate(value)}</div>
  }
  if (meta?.valueType === 'link') {
    if (meta?.linkType === 'internal') {
      return <Link href={value}>링크</Link>
    }
    return (
      <a
        href={value}
        target={'_blank'}
        rel="noreferrer noopener"
        className={'text-blue-700 hover:underline'}
      >
        링크
      </a>
    )
  }

  // default: string
  return <div className="whitespace-pre-line break-all">{value}</div>
}
