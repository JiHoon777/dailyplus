import type { IStoryBlock, IStoryContent } from '@/shared/types'

import { createStore } from './utils/createStore'

export type IStudioStoryEditorStore = {
  blocks: IStoryBlock[]

  init: (content: IStoryContent, blockName: string) => void
  setNextBlock: (currentBlockTitle: string, nextBlockTitle: string) => void
  isActiveBlock: (blockTitle: string) => boolean
}

export const StudioStoryEditorStore = createStore<IStudioStoryEditorStore>(
  (set, get) => {
    let $storyContent: IStoryContent

    return {
      blocks: [],

      init: (content, blockName) => {
        set((state) => {
          $storyContent = content

          const block = content.blocksMap[blockName]
          if (block) {
            state.blocks = [block]
          }
        })
      },

      setNextBlock: (currentBlockTitle, nextBlockTitle) => {
        set((state) => {
          const currentBlockIndex = state.blocks.findIndex(
            (block) => block.title === currentBlockTitle,
          )

          if (currentBlockIndex >= -1) {
            const nextBlockIndex = currentBlockIndex + 1
            state.blocks = [
              ...state.blocks.slice(0, nextBlockIndex),
              $storyContent.blocksMap[nextBlockTitle],
            ]
          }
        })
      },

      isActiveBlock: (blockTitle) => {
        return get().blocks.some((block) => block.title === blockTitle)
      },
    }
  },
  'Studio Story Editor Store',
)
