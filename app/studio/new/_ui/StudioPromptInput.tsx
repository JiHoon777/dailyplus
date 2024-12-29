import type { ChangeEvent } from 'react'

import { useEffect, useRef } from 'react'

import { Textarea } from '@/shared/ui'

export const StudioPromptInput = ({
  value,
  onChange,
  placeholder = '',
  className = '',
  minHeight = 100,
  maxHeight = 400,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  minHeight?: number
  maxHeight?: number
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (!textarea) return

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto'

    // Calculate new height
    const newHeight = Math.min(
      Math.max(textarea.scrollHeight, minHeight),
      maxHeight,
    )
    textarea.style.height = `${newHeight}px`
  }

  // Adjust height when value changes
  useEffect(() => {
    adjustHeight()
  }, [value, minHeight, maxHeight])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`w-full resize-none overflow-y-auto ${className}`}
      style={{
        maxHeight: `${maxHeight}px`,
        minHeight: `${minHeight}px`,
      }}
    />
  )
}
