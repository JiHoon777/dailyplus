import type { StudioMergeItems } from './Studio.types'
import type { IAiStories, IQuotes } from '../types'

import { createStore } from './utils/createStore'

export interface IStudioStore {
  mergingItems: StudioMergeItems[]
  addQuote: (quote: IQuotes) => void
  addAiStory: (story: IAiStories) => void
  removeItem: (item: StudioMergeItems) => void
  clearItems: () => void
}

export const StudioStore = createStore<IStudioStore>(
  (set) => ({
    mergingItems: [],
    addQuote: (quote) => {
      set((state) => {
        const existingIndex = state.mergingItems.findIndex(
          (item) => item.type === 'quote' && item.data.id === quote.id
        )

        if (existingIndex === -1) {
          state.mergingItems.push({
            type: 'quote',
            data: quote,
          })
        }
      })
    },
    addAiStory: (story) => {
      set((state) => {
        const existingIndex = state.mergingItems.findIndex(
          (item) => item.type === 'ai_story' && item.data.id === story.id
        )

        if (existingIndex === -1) {
          state.mergingItems.push({
            type: 'ai_story',
            data: story,
          })
        }
      })
    },
    removeItem: (item) => {
      set((state) => {
        const index = state.mergingItems.findIndex(
          (existing) =>
            existing.type === item.type &&
            existing.data.id === item.data.id
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
  'Studio Store'
)
