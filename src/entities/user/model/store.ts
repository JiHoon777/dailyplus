import type { User, UserState } from './types'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserStore extends UserState {
  setUser: (user: User | null) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      setUser: (user) => set({ user }),

      user: null,
    }),
    {
      name: 'user-storage',
    },
  ),
)
