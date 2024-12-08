import type { IUser } from '@/shared/model/entity.types'
import type { StateCreator } from 'zustand'

export interface AuthSlice {
  //
  // states
  //
  authUser: IUser | null

  //
  // actions
  //
  setAuthUser: (user: IUser | null) => void
}

export const createAuthSlice: StateCreator<
  AuthSlice,
  [['zustand/immer', never]],
  []
> = (set) => ({
  //
  // states
  //
  authUser: null,

  //
  // actions
  //
  setAuthUser: (user) =>
    set((state) => {
      state.user = user
    }),
})
