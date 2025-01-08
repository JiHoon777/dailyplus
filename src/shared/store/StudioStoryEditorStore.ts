import type { IStoryBlock, IStoryContent } from '@/shared/types'

import { createStore } from './utils/createStore'

export type IStudioStoryEditorStore = {
  blocks: IStoryBlock[]

  init: (content: IStoryContent, blockName: string) => void
}

export const StudioStoryEditorStore = createStore<IStudioStoryEditorStore>(
  (set, _get) => {
    return {
      blocks: [],

      init: (content, blockName) => {
        set((state) => {
          console.log(19, content.blocksMap[blockName])
          const block = content.blocksMap[blockName]
          if (block) {
            state.blocks = [block]
          }
        })
      },
    }
  },
  'Studio Story Editor Store',
)
