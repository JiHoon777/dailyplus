import type { StudioMergeItems } from './Studio.types'
import type { WritableDraft } from 'immer'

import { createStore } from './utils/createStore'

export type IStudioStore = {
  userPrompt: string
  mergingItems: StudioMergeItems[]
  MAX_MERGING_ITEMS: number

  setUserPrompt: (prompt: string) => void
  appendItem: (item: StudioMergeItems) => void
  removeItem: (item: StudioMergeItems) => void
  clearItems: () => void
}

export const StudioStore = createStore<IStudioStore>((set, get) => {
  const $compareMergingItem = (
    existing: StudioMergeItems,
    item: StudioMergeItems,
  ) => existing.type === item.type && existing.data.id === item.data.id

  const $findMergingItem = (item: StudioMergeItems) =>
    get().mergingItems.find((existing) => $compareMergingItem(existing, item))

  const $findMergingItemIndex = (item: StudioMergeItems) =>
    get().mergingItems.findIndex((existing) =>
      $compareMergingItem(existing, item),
    )

  return {
    get MAX_MERGING_ITEMS() {
      return 3
    },

    userPrompt: '',
    mergingItems: [],

    setUserPrompt: (prompt) => {
      set((state) => {
        state.userPrompt = prompt
      })
    },
    appendItem: (item) =>
      set((state) => {
        if (state.mergingItems.length >= state.MAX_MERGING_ITEMS) {
          return
        }

        const existingItem = $findMergingItem(item)

        if (!existingItem) {
          state.mergingItems.push(item as WritableDraft<StudioMergeItems>)
        }
      }),
    removeItem: (item) =>
      set((state) => {
        const index = $findMergingItemIndex(item)

        if (index !== -1) {
          state.mergingItems.splice(index, 1)
        }
      }),
    clearItems: () =>
      set((state) => {
        state.mergingItems = []
      }),
  }
}, 'Studio Store')
