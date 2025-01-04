import type {
  IQuote,
  IQuoteAiInterpretation,
  IQuoteAiInterpretationListRequest,
} from '@/shared/types'
import type { QueryKey } from '@tanstack/react-query'

import { useMutation, useQuery } from '@tanstack/react-query'
import { ChevronRight, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  ApiClient,
  type IApiClientQuoteAiInterpretationsParams,
} from '@/shared/api'
import { useAiPromptAccess } from '@/shared/hooks'
import { cn, showToast } from '@/shared/lib/utils'
import { useStore } from '@/shared/store'
import { Button, Skeleton } from '@/shared/ui'

export type IQuoteInterpretationProps = {
  quote: IQuote
  getQuoteInterpretationQueryKey: (
    input?: Omit<IQuoteAiInterpretationListRequest, 'page' | 'size'>,
  ) => QueryKey
}

export const QuoteInterpretation = ({
  quote,
  getQuoteInterpretationQueryKey,
}: IQuoteInterpretationProps) => {
  const userId = useStore('auth', (s) => s.me?.id)
  const { hasAiPromptAccess } = useAiPromptAccess()
  const [createdInterpretation, setCreatedInterpretation] =
    useState<IQuoteAiInterpretation | null>(null)

  const {
    data,
    isLoading: isGetLoading,
    error: getError,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const res = await ApiClient.quoteAiInterpretations.getList({
        size: 1,
        page: 1,
        quoteId: quote.id,
      })

      if (getError) {
        throw getError
      }

      return res.data[0] ?? null
    },
    queryKey: getQuoteInterpretationQueryKey({ quoteId: quote.id }),
  })

  const {
    mutate,
    isPending: isCreateLoading,
    error: createError,
  } = useMutation({
    mutationFn: async (
      input: IApiClientQuoteAiInterpretationsParams<'generateAndSaveQuoteInterpretationWithAi'>,
    ) => {
      const interpretation =
        await ApiClient.quoteAiInterpretations.generateAndSaveQuoteInterpretationWithAi(
          input,
        )

      return interpretation
    },
    onSuccess(res) {
      setCreatedInterpretation(res)
      showToast.success('Quote Interpretation created successfully!')
    },
  })

  const isLoading = isCreateLoading || isGetLoading
  const handleCreate = () => {
    // Todo: handle Ai Prompt Access
    if (isLoading || !hasAiPromptAccess || !userId) {
      return
    }

    mutate({
      quoteText: `${quote.originalText}, ${quote.koreanText}`,
      quoteId: quote.id,
      userId: userId,
    })
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

  useEffect(() => {
    setCreatedInterpretation(null)
  }, [quote])

  const interpretation = createdInterpretation || data
  const hasError = getError || createError
  const showRetry = !interpretation && hasError && !isLoading
  const showContent = interpretation && !isLoading
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center gap-2 text-gray-600">
        <div
          className={cn('flex max-w-fit cursor-pointer items-center gap-2', {
            'pointer-events-none': isLoading,
          })}
          onClick={handleCreate}
        >
          <Sparkles className="h-5 w-5" />
          <h4 className="max-w-fittext-lg font-semibold">해설</h4>
          <ChevronRight className="h-5 w-5" />
        </div>
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
