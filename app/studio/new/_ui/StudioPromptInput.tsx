import type { ChangeEvent } from 'react'

import { useStore } from '@/shared/store'
import { ResizableTextarea } from '@/shared/ui'

export const StudioPromptInput = () => {
  const userPrompt = useStore('studio', (s) => s.userPrompt)
  const setUserPrompt = useStore('studio').getState().setUserPropmpt

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserPrompt(e.target.value)
  }

  return (
    <ResizableTextarea
      value={userPrompt}
      onChange={handleChange}
      placeholder={'Write your Prompt'}
      className={`w-full resize-none overflow-y-auto`}
    />
  )
}
