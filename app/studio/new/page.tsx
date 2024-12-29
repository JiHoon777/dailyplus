'use client'

import type { IStudioMergeItems } from '../_types'
import type { IQuotes } from '@/shared/types'

import { useState } from 'react'

import { Greeting } from '@/features/auth'
import { DPStudioPage } from '@/shared/ui'

import {
  StudioAiStoryList,
  StudioMergeList,
  StudioPromptInput,
  StudioQuoteList,
} from './_ui'

export default function StudioNewPage() {
  const [prompt, setPrompt] = useState('')

  const [mergeItems, setMergeItems] = useState<IStudioMergeItems[]>([])

  const addQuote = (item: IQuotes) => {
    const existingItem = mergeItems.find(
      (mergeItem) =>
        mergeItem.type === 'quote' && mergeItem.data.id === item.id,
    )

    if (existingItem) {
      return
    }

    const newItem: IStudioMergeItems = {
      data: item,
      type: 'quote',
    }
    setMergeItems((prev) => [...prev, newItem])
  }

  return (
    <DPStudioPage className="gap-6 pt-[6rem]">
      <Greeting />
      <StudioPromptInput value={prompt} onChange={setPrompt} />
      <StudioMergeList items={mergeItems} />
      <StudioQuoteList onSelectQuote={addQuote} />
      <StudioAiStoryList />
    </DPStudioPage>
  )
}
