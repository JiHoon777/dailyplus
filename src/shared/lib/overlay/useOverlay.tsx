import type { CreateOverlayElement } from './types'

import { useContext, useEffect, useMemo, useRef, useState } from 'react'

import { OverlayController, type OverlayControlRef } from './overlayController'
import { OverlayContext } from './overlayProvider'

let elementId = 1

interface Options {
  exitOnUnmount?: boolean
}

export function useOverlay({ exitOnUnmount = true }: Options = {}) {
  const context = useContext(OverlayContext)

  if (context == null) {
    throw new Error('useOverlay is only available within OverlayProvider.')
  }

  const { mount, unmount } = context
  const [id] = useState(() => String(elementId++))

  const overlayRef = useRef<OverlayControlRef | null>(null)

  useEffect(() => {
    return () => {
      if (exitOnUnmount) {
        unmount(id)
      }
    }
  }, [exitOnUnmount, id, unmount])

  return useMemo(
    () => ({
      close: () => unmount(id),
      open: (overlayElement: CreateOverlayElement) => {
        mount(
          id,
          <OverlayController
            key={Date.now()}
            ref={overlayRef}
            overlayElement={overlayElement}
            close={() => unmount(id)}
          />,
        )
      },
    }),
    [id, mount, unmount],
  )
}
