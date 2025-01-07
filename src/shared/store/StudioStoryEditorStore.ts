import type { IStoryContent, IStoryMessage } from '@/shared/types'

import { createStore } from './utils/createStore'

export type IStudioStoryEditorStore = {
  blockName: string
  messages: IStoryMessage[]

  init: (content: IStoryContent, blockName: string) => void
}

export const StudioStoryEditorStore = createStore<IStudioStoryEditorStore>(
  (set, _get) => {
    return {
      blockName: '',
      messages: [],

      init: (content, blockName) => {
        set((state) => {
          state.blockName = blockName
          state.messages = content.blocksMap[blockName].messages
        })
      },
    }
  },
  'Studio Story Editor Store',
)
