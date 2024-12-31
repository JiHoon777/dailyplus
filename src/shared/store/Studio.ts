import type { IAiStories, IQuotes } from '../types'
import type { StudioMergeItems } from './Studio.types'

import { createStore } from './utils/createStore'

type AppendableItem =
  | { type: 'quote'; data: IQuotes }
  | { type: 'ai_story'; data: IAiStories }

export interface IStudioStore {
  mergingItems: StudioMergeItems[]
  append: (item: AppendableItem) => void
  removeItem: (item: StudioMergeItems) => void
  clearItems: () => void
}

export const StudioStore = createStore<IStudioStore>(
  (set) => ({
    mergingItems: [],

    append: (item) => {
      set((state) => {
        const existingIndex = state.mergingItems.findIndex(
          (existing) => 
            existing.type === item.type && 
            existing.data.id === item.data.id,
        )

        if (existingIndex === -1) {
          state.mergingItems.push(item)
        }
      })
    },

    removeItem: (item) => {
      set((state) => {
        const index = state.mergingItems.findIndex(
          (existing) =>
            existing.type === item.type && 
            existing.data.id === item.data.id,
        )

        if (index !== -1) {
          state.mergingItems.splice(index, 1)
        }
      })
    },

    clearItems: () => {
      set((state) => {
        state.mergingItems = []
      })
    },
  }),
  'Studio Store',
)
