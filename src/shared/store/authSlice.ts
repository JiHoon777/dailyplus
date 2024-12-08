import type { IUser } from '@/shared/types/entity.types'
import type { StateCreator } from 'zustand'

export interface AuthSlice {
  auth: {
    me: IUser | null

    setMe: (user: IUser | null) => void
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
