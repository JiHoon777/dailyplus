import type { User, UserState } from './types'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserStore extends UserState {
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      data: null,
      isAuthenticated: false,
      isLoading: false,

      setLoading: (isLoading) => set({ isLoading }),
      setUser: (user) => set({ data: user, isAuthenticated: Boolean(user) }),
    }),
    {
      name: 'user-storage',
    },
  ),
)
