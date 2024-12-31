import type { IAuthStore } from './Auth'

import { useMemo } from 'react'

import { AuthStore } from './Auth'

type StoreMap = {
  auth: typeof AuthStore
}

type StoreNames = keyof StoreMap

/**
 * * 스토어로의 접근은 `useStore` 함수를 사용해야 합니다.
 */
export const useStore = <
  T extends StoreNames,
  R = T extends 'auth' ? IAuthStore : never,
>(
  storeName: T,
  selector?: T extends 'auth' ? (state: IAuthStore) => R : never,
) => {
  const store = useMemo(() => {
    return {
      auth: AuthStore,
    }[storeName]
  }, [storeName])

  return (selector ? store(selector) : store((state) => state)) as R
}
