import type { IUser } from '@/shared/model/entity.types'
import type { StateCreator } from 'zustand'

export interface AuthSlice {
  auth: {
    user: IUser | null

    setUser: (user: IUser | null) => void
  }
}

export const createAuthSlice: StateCreator<
  AuthSlice,
  [['zustand/immer', never]],
  []
> = (set) => ({
  auth: {
    setUser: (user) =>
      set((state) => {
        state.auth.user = user
      }),

    user: null,
  },
})
