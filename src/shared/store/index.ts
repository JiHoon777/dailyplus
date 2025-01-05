import type { IAuthStore } from './Auth'
import type { IStudioStore } from './Studio'
import type { IStudioStoryNavigationStore } from './StudioStoryNavigation'
import type { createStore } from './utils/createStore'

import { useMemo } from 'react'

import { AuthStore } from './Auth'
import { StudioStore } from './Studio'
import {
  type IStudioStoryEditorStore,
  StudioStoryEditorStore,
} from './StudioStoryEditor'
import { StudioStoryNavigationStore } from './StudioStoryNavigation'
import {
  type IStudioStoryPlayerStore,
  StudioStoryPlayerStore,
} from './StudioStoryPlayer'

type StoreMap = {
  auth: IAuthStore

  studio: IStudioStore
  studioStoryNavigation: IStudioStoryNavigationStore
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
      studioStoryNavigation: StudioStoryNavigationStore,
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
