import type { IAuthStore } from './AuthStore'
import type { IStudioStore } from './StudioStore'
import type { createStore } from './utils/createStore'

import { useMemo } from 'react'

import { AuthStore } from './AuthStore'
import { StudioStore } from './StudioStore'
import {
  type IStudioStoryEditorStore,
  StudioStoryEditorStore,
} from './StudioStoryEditorStore'
import {
  type IStudioStoryPlayerStore,
  StudioStoryPlayerStore,
} from './StudioStoryPlayerStore'

type StoreMap = {
  auth: IAuthStore

  studio: IStudioStore
  studioStoryEditor: IStudioStoryEditorStore
  studioStoryPlayer: IStudioStoryPlayerStore
}

type StoreNames = keyof StoreMap

type StoreInstance<T extends object> = ReturnType<typeof createStore<T>>

type StoreInstances = {
  [K in StoreNames]: StoreInstance<StoreMap[K]>
}

export type { StudioMergeItems } from './Studio.types'

export function useStore<T extends StoreNames, R = StoreInstance<StoreMap[T]>>(
  storeName: T,
  selector?: (state: StoreMap[T]) => R,
) {
  const store = useMemo(() => {
    const map: StoreInstances = {
      auth: AuthStore,

      // studio
      studio: StudioStore,
      studioStoryPlayer: StudioStoryPlayerStore,
      studioStoryEditor: StudioStoryEditorStore,
    }

    const store = map[storeName]

    if (!store) {
      throw new Error(`Unknown store: ${storeName}`)
    }

    return store
  }, [storeName])

  return (selector ? store(selector) : store) as R
}
