import type { IQuoteAiInterpretation } from '@/shared/types'
import type { ColumnDef } from '@tanstack/react-table'

export const QuoteAiInterpretationsColumns: ColumnDef<IQuoteAiInterpretation>[] =
  [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'prompt',
      header: 'Prompt',
      minSize: 300,
    },
    {
      accessorKey: 'content',
      header: 'Content',
      minSize: 1300,
    },
    {
      accessorKey: 'modelVersion',
      header: 'Model Version',
    },
    {
      accessorKey: 'quoteId',
      header: 'Quote Id',
    },
    {
      accessorKey: 'userId',
      header: 'User Id',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      meta: {
        valueType: 'date',
      },
    },
  ]
