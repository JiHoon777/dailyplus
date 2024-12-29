import { Greeting } from '@/features/auth'
import { DPStudioPage } from '@/shared/ui'

import { StudioPromptInput } from './_ui'

export default function StudioNewPage() {
  return (
    <DPStudioPage className="gap-6">
      <Greeting />
      <StudioPromptInput />
    </DPStudioPage>
  )
}
