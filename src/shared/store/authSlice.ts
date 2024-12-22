import type { IUsers } from '@/shared/types/entity.types'
import type { StateCreator } from 'zustand'

export interface AuthSlice {
  auth: {
    me: IUsers | null

    setMe: (user: IUsers | null) => void
  }
}

export const createAuthSlice: StateCreator<
  AuthSlice,
  [['zustand/immer', never]],
  []
> = (set) => ({
  auth: {
    me: null,

    setMe: (user) =>
      set((state) => {
        state.auth.me = user
      }),
  },
})
