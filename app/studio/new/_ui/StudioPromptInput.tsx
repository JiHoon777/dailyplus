import type { ChangeEvent } from 'react'

import { useCallback, useEffect, useRef } from 'react'

import { useStore } from '@/shared/store'
import { Textarea } from '@/shared/ui'

const MIN_HEIGHT = 100
const MAX_HEIGHT = 400

export const StudioPromptInput = () => {
  const userPrompt = useStore('studio', (s) => s.userPrompt)
  const setUserPrompt = useStore('studio').getState().setUserPropmpt

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto'

    // Calculate new height
    const newHeight = Math.min(
      Math.max(textarea.scrollHeight, MIN_HEIGHT),
      MAX_HEIGHT,
    )
    textarea.style.height = `${newHeight}px`
  }, [])

  useEffect(() => {
    adjustHeight()
  }, [adjustHeight, userPrompt])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserPrompt(e.target.value)
  }

  return (
    <Textarea
      ref={textareaRef}
      value={userPrompt}
      onChange={handleChange}
      placeholder={'Write your Prompt'}
      className={`w-full resize-none overflow-y-auto`}
      style={{
        maxHeight: `${MAX_HEIGHT}px`,
        minHeight: `${MIN_HEIGHT}px`,
      }}
    />
  )
}
