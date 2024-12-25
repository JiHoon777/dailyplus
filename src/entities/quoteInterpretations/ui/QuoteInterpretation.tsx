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
import { Button, Skeleton } from '@/shared/ui'

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
  const {
    mutate,
    isPending: isCreateLoading,
    error: createError,
  } = useCreateQuoteInterpretationWithAi()
  const [createdInterpretation, setCreatedInterpretation] =
    useState<IQuoteAiInterpretations | null>(null)
  const {
    data,
    isLoading: isGetLoading,
    error: getError,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const { data, error: getError } =
        await ApiClientCSR.quoteAiInterpretations.getList({
          limit: 1,
          page: 1,
          quote_id: quote.id,
        })

      if (getError) {
        throw getError
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

  const handleRetry = () => {
    if (getError) {
      refetch()
      return
    }
    if (createError) {
      handleCreate()
    }
  }

  const interpretation = createdInterpretation || data?.[0]
  const hasError = getError || createError
  const isLoading = isCreateLoading || isGetLoading
  const showRetry = !interpretation && hasError && !isLoading
  const showContent = interpretation && !isLoading
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
        {showRetry && <Button onClick={handleRetry}>Retry</Button>}
      </div>
      {showContent && (
        <p className="whitespace-pre-line break-all leading-relaxed text-gray-700">
          {interpretation?.content}
        </p>
      )}
      {isLoading && <InterpretationSkeleton />}
    </div>
  )
}

const InterpretationSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  )
}
