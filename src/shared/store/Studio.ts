import type { IStudioStore } from './Studio.types'

import { createStore } from './utils/createStore'

export const StudioStore = createStore<IStudioStore>(
  (set) => ({
    mergingItems: [],
    // hasAiPromptAccess: false,
    // me: null,
    // setMe: (user) => {
    //   set((state) => {
    //     state.me = user
    //     // Todo: AI Prompt Access
    //     state.hasAiPromptAccess = !!user
    //   })
    // },
  }),
  'Studio Store',
)
