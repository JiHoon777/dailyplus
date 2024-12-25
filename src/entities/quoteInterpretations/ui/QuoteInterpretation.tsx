import type {
  IQuoteAiInterpretations,
  IQuoteAiInterpretationsListableInput,
  IQuotes,
} from '@/shared/types'
import type { QueryKey } from '@tanstack/react-query'

import { useQuery } from '@tanstack/react-query'
import { ChevronRight, Sparkles } from 'lucide-react'
import { useState } from 'react'

import { ApiClientCSR } from '@/shared/lib/supabase-csr'
import { Spinner } from '@/shared/ui'

import { useCreateQuoteInterpretationWithAi } from '../hooks/useCreateQuoteInterpretationWithAi'

export type IQuoteInterpretationProps = {
  quote: IQuotes
  getQuoteInterpretationQueryKey: (
    input?: Omit<IQuoteAiInterpretationsListableInput, 'page' | 'limit'>,
  ) => QueryKey
}

export const QuoteInterpretation = ({
  quote,
  getQuoteInterpretationQueryKey,
}: IQuoteInterpretationProps) => {
  const { mutate, isPending } = useCreateQuoteInterpretationWithAi()
  const [createdInterpretation, setCreatedInterpretation] =
    useState<IQuoteAiInterpretations | null>(null)
  const { data, error, isLoading } = useQuery({
    queryFn: async () => {
      const { data, error } = await ApiClientCSR.quoteAiInterpretations.getList(
        {
          limit: 1,
          page: 1,
          quote_id: quote.id,
        },
      )

      if (error) {
        throw error
      }

      return data
    },
    queryKey: getQuoteInterpretationQueryKey(),
  })

  const handleCreate = () => {
    mutate(
      {
        quote,
      },
      {
        onSuccess: (res) => {
          setCreatedInterpretation(res)
        },
      },
    )
  }

  const interpretation = createdInterpretation || data?.[0]
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center gap-2 text-gray-600">
        <Sparkles className="h-5 w-5" />
        <h4
          className="max-w-fit cursor-pointer text-lg font-semibold"
          onClick={handleCreate}
        >
          해설
        </h4>
        <ChevronRight className="h-5 w-5" />
        {(isPending || isLoading) && <Spinner />}
      </div>
      {interpretation && (
        <p className="whitespace-pre-line break-all leading-relaxed text-gray-700">
          {interpretation?.content}
        </p>
      )}
    </div>
  )
}
