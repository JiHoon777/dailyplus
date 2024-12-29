import type { IQuoteAiInterpretations } from '@/shared/types'
import type { ColumnDef } from '@tanstack/react-table'

export const QuoteAiInterpretationsColumns: ColumnDef<IQuoteAiInterpretations>[] =
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
      accessorKey: 'model_version',
      header: 'Model Version',
    },
    {
      accessorKey: 'quote_id',
      header: 'Quote Id',
    },
    {
      accessorKey: 'user_id',
      header: 'User Id',
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      meta: {
        valueType: 'date',
      },
    },
  ]
