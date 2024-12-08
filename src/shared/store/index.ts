import type { AuthSlice } from './authSlice'

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { createAuthSlice } from './authSlice'

type StoreState = AuthSlice

export const useStore = create<StoreState>()(
  immer((...args) => ({
    ...createAuthSlice(...args),
  })),
)
