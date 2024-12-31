import type { IAuthStore } from './Auth'
import type { IStudioStore } from './Studio'
import type { createStore } from './utils/createStore'

import { useMemo } from 'react'

import { AuthStore } from './Auth'
import { StudioStore } from './Studio'

type StoreMap = {
  auth: IAuthStore
  studio: IStudioStore
}

type StoreNames = keyof StoreMap

type StoreInstance<T extends object> = ReturnType<typeof createStore<T>>

type StoreInstances = {
  [K in StoreNames]: StoreInstance<StoreMap[K]>
}

export type { StudioMergeItems } from './Studio.types'
/**
 * * 스토어로의 접근은 `useStore` 함수를 사용해야 합니다.
 */
export function useStore<T extends StoreNames, R = StoreInstance<StoreMap[T]>>(
  storeName: T,
  selector?: (state: StoreMap[T]) => R,
) {
  const store = useMemo(() => {
    const map: StoreInstances = {
      auth: AuthStore,
      studio: StudioStore,
    }

    const store = map[storeName]

    if (!store) {
      throw new Error(`Unknown store: ${storeName}`)
    }

    return store
  }, [storeName])

  return (selector ? store(selector) : store) as R
}
