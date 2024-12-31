import type { StudioMergeItems } from './Studio.types'

import { createStore } from './utils/createStore'

export interface IStudioStore {
  userPrompt: string
  mergingItems: StudioMergeItems[]

  setUserPropmpt: (prompt: string) => void
  appendItem: (item: StudioMergeItems) => void
  removeItem: (item: StudioMergeItems) => void
  clearItems: () => void
}

export const StudioStore = createStore<IStudioStore>(
  (set) => ({
    userPrompt: '',
    mergingItems: [],

    setUserPropmpt: (prompt) => {
      set((state) => {
        state.userPrompt = prompt
      })
    },
    appendItem: (item) =>
      set((state) => {
        const existingItem = state.mergingItems.find(
          (existing) =>
            existing.type === item.type && existing.data.id === item.data.id,
        )

        if (existingItem) {
          return
        }

        // Spread 안 하면 타입 오류가 발생했다 안했다, 이머 타입 체크 버그같은데...
        state.mergingItems.push({ ...item })
      }),
    removeItem: (item) =>
      set((state) => {
        const index = state.mergingItems.findIndex(
          (existing) =>
            existing.type === item.type && existing.data.id === item.data.id,
        )

        if (index !== -1) {
          state.mergingItems.splice(index, 1)
        }
      }),
    clearItems: () =>
      set((state) => {
        state.mergingItems = []
      }),
  }),
  'Studio Store',
)
