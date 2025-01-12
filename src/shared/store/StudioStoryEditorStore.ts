import type { IStoryBlock, IStoryContent } from '@/shared/types'

import { createStore } from './utils/createStore'

export type IStudioStoryEditorStore = {
  blocks: IStoryBlock[]

  init: (content: IStoryContent, blockName: string) => void
  setNextBlock: (currentBlockTitle: string, nextBlockTitle: string) => void
  isActiveBlock: (blockTitle: string) => boolean
}

type PrivateState = {
  storyContent: IStoryContent
}

export const StudioStoryEditorStore = createStore<IStudioStoryEditorStore>(
  (set, get) => {
    const $state: PrivateState = {
      storyContent: {} as IStoryContent,
    }

    return {
      blocks: [],

      init: (content, blockName) => {
        $state.storyContent = content

        set((state) => {
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

          if (currentBlockIndex > -1) {
            const nextBlockIndex = currentBlockIndex + 1
            state.blocks = [
              ...state.blocks.slice(0, nextBlockIndex),
              $state.storyContent.blocksMap[nextBlockTitle],
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
