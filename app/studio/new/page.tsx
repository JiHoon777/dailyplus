'use client'

import { Greeting } from '@/features/auth'
import { DPStudioPage } from '@/shared/ui'

import { StudioMergeList, StudioPromptInput } from './_ui'

export default function StudioNewPage() {
  return (
    <DPStudioPage className="gap-6 pt-[6rem]">
      <Greeting />
      <StudioPromptInput />

      <StudioMergeList />
    </DPStudioPage>
  )
}
