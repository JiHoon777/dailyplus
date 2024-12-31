'use client'

import { Greeting } from '@/features/auth'
import { useOverlay } from '@/shared/lib/overlay'
import { Button, DPStudioPage } from '@/shared/ui'

import { StudioMergeList, StudioPromptInput, StudioQuoteOverlay } from './_ui'

export default function StudioNewPage() {
  const { open } = useOverlay()

  const openQuoteList = () => {
    open(({ isOpen, close }) => (
      <StudioQuoteOverlay isOpen={isOpen} close={close} />
    ))
  }
  console.log('hi')

  return (
    <DPStudioPage className="gap-6 pt-[6rem]">
      <Greeting />
      <StudioPromptInput />
      <div className="w-full gap-4">
        <Button onClick={openQuoteList}>Add Quote</Button>
      </div>
      <StudioMergeList />
    </DPStudioPage>
  )
}
