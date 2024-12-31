import type { IUsers } from '../types'

import { createStore } from './utils/createStore'

export interface IAuthStore {
  me: IUsers | null

  hasAiPromptAccess: boolean
  setMe: (user: IUsers | null) => void
}

export const AuthStore = createStore<IAuthStore>(
  (set) => ({
    hasAiPromptAccess: false,
    me: null,

    setMe: (user) => {
      set((state) => {
        state.me = user

        // Todo: AI Prompt Access
        state.hasAiPromptAccess = !!user
      })
    },
  }),
  'Auth Store',
)
