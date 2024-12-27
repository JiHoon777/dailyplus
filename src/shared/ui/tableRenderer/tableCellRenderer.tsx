import type { Cell } from '@tanstack/react-table'

import { flexRender } from '@tanstack/react-table'
import Link from 'next/link'

import { formatDate } from '@/shared/lib/utils'

export const TableCellRenderer = <TData,>({
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
