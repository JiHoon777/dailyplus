'use client'
import type { ComponentProps } from 'react'

import { forwardRef, useCallback, useEffect, useRef } from 'react'

import { Textarea } from '../textarea'

interface ResizableTextareaProps extends ComponentProps<'textarea'> {
  minHeight?: number
  maxHeight?: number
}

export const ResizableTextarea = forwardRef<
  HTMLTextAreaElement,
  ResizableTextareaProps
>(({ minHeight = 100, maxHeight = 400, ...props }, forwardedRef) => {
  const innerRef = useRef<HTMLTextAreaElement | null>(null)
  const textareaRef = (forwardedRef ||
    innerRef) as React.RefObject<HTMLTextAreaElement>

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto'

    // Calculate new height
    const newHeight = Math.min(
      Math.max(textarea.scrollHeight, minHeight),
      maxHeight,
    )

    console.log(newHeight, maxHeight)
    textarea.style.overflowY = newHeight < maxHeight ? 'hidden' : 'scroll'

    textarea.style.height = `${newHeight}px`
  }, [])

  useEffect(() => {
    adjustHeight()
  }, [adjustHeight, props.value])

  return <Textarea {...props} ref={textareaRef} />
})
