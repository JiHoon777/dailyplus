'use client'

import type { IStudioMergeItems } from '../_types'
import type { IQuotes } from '@/shared/types'

import { useState } from 'react'

import { Greeting } from '@/features/auth'
import { useOverlay } from '@/shared/lib/overlay'
import { Button, DPStudioPage } from '@/shared/ui'

import { StudioMergeList, StudioPromptInput, StudioQuoteOverlay } from './_ui'

export default function StudioNewPage() {
  const { open } = useOverlay()
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

  const openQuoteList = () => {
    open(({ isOpen, close }) => (
      <StudioQuoteOverlay
        isOpen={isOpen}
        close={close}
        onSelectQuote={addQuote}
      />
    ))
  }

  return (
    <DPStudioPage className="gap-6 pt-[6rem]">
      <Greeting />
      <StudioPromptInput value={prompt} onChange={setPrompt} />
      <div className="w-full gap-4">
        <Button onClick={openQuoteList}>Add Quote</Button>
      </div>
      <StudioMergeList items={mergeItems} />
    </DPStudioPage>
  )
}
