import type { IQuoteAiInterpretations, IQuotes } from '@/shared/types'

import { useState } from 'react'

import { Spinner } from '@/shared/ui'

import { useCreateQuoteInterpretationWithAi } from '../hooks/useCreateQuoteInterpretationWithAi'

export const QuoteInterpretation = ({ quote }: { quote: IQuotes }) => {
  const { mutate, isPending } = useCreateQuoteInterpretationWithAi()
  const [interpretation, setInterpretation] =
    useState<IQuoteAiInterpretations | null>(null)

  const handleCreate = () => {
    mutate(
      {
        quote,
      },
      {
        onSuccess: (res) => {
          setInterpretation(res)
        },
      },
    )
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex gap-2">
        <h4
          className="mb-2 max-w-fit cursor-pointer text-xl font-semibold text-gray-700"
          onClick={handleCreate}
        >
          AI 해설
        </h4>
        {isPending && <Spinner />}
      </div>
      {interpretation && (
        <p className="whitespace-pre-line break-all leading-relaxed text-gray-700">
          {interpretation?.content}
        </p>
      )}
    </div>
  )
}
