import type { CreateOverlayElement } from './types'
import type { Ref } from 'react'

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

interface Props {
  overlayElement: CreateOverlayElement
  close: () => void
  /** Optional aria-label for the overlay */
  ariaLabel?: string
}

export interface OverlayControlRef {
  close: () => void
}

export const OverlayController = forwardRef(function OverlayController(
  { overlayElement: OverlayElement, close, ariaLabel }: Props,
  ref: Ref<OverlayControlRef>,
) {
  const [isOpenOverlay, setIsOpenOverlay] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleClose = useCallback(() => {
    setIsOpenOverlay(false)

    timeoutRef.current = setTimeout(() => {
      close()
    }, 100)
  }, [close])

  useImperativeHandle(ref, () => {
    return { close }
  }, [close])

  useEffect(() => {
    // Handle ESC key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [handleClose])

  return (
    <div role="dialog" aria-modal="true" aria-label={ariaLabel} tabIndex={-1}>
      <OverlayElement isOpen={isOpenOverlay} close={handleClose} />
    </div>
  )
})
