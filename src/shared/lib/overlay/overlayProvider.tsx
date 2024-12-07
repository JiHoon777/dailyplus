import type { OverlayContextType } from './types'
import type { PropsWithChildren, ReactNode } from 'react'

import React, { createContext, useCallback, useMemo, useState } from 'react'

import { OverlayError } from './types'

export const OverlayContext = createContext<OverlayContextType | null>(null)

export function OverlayProvider({ children }: PropsWithChildren) {
  const [overlayById, setOverlayById] = useState<Map<string, ReactNode>>(
    new Map(),
  )

  const mount = useCallback((id: string, element: ReactNode) => {
    setOverlayById((overlayById) => {
      if (overlayById.has(id)) {
        throw new OverlayError(`Overlay with id "${id}" already exists`)
      }
      const cloned = new Map(overlayById)
      cloned.set(id, element)
      return cloned
    })
  }, [])

  const unmount = useCallback((id: string) => {
    setOverlayById((overlayById) => {
      if (!overlayById.has(id)) {
        return overlayById
      }
      const cloned = new Map(overlayById)
      cloned.delete(id)
      return cloned
    })
  }, [])

  const context = useMemo(() => ({ mount, unmount }), [mount, unmount])

  const overlayElements = useMemo(
    () =>
      [...overlayById.entries()].map(([id, element]) => (
        <React.Fragment key={id}>{element}</React.Fragment>
      )),
    [overlayById],
  )

  return (
    <OverlayContext.Provider value={context}>
      {children}
      {overlayElements}
    </OverlayContext.Provider>
  )
}
