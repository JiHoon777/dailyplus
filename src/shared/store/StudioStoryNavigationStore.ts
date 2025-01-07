import type { IStoryContent } from '@/shared/types'

import { createStore } from './utils/createStore'

type StoryBlock = {
  name: string
  nextBlocks: string[]
}

export interface IStudioStoryNavigationStore {
  blocks: StoryBlock[]

  init: (content: IStoryContent) => void
}

export const StudioStoryNavigationStore =
  createStore<IStudioStoryNavigationStore>((set) => {
    return {
      blocks: [],

      // Todo: Graph
      init: (content: IStoryContent) => {
        const blocks: StoryBlock[] = []

        // 시작 블록의 마지막 메시지 추가
        const startBlock = content.blocksMap[content.startBlockName]
        const startBlockLastMessage =
          startBlock.messages[startBlock.messages.length - 1]
        blocks.push({
          name: content.startBlockName,
          nextBlocks: startBlockLastMessage.choices ?? [],
        })

        // 나머지 블록들의 마지막 메시지 추가
        Object.entries(content.blocksMap).forEach(([blockName, block]) => {
          if (blockName !== content.startBlockName) {
            const lastMessage = block.messages[block.messages.length - 1]
            blocks.push({
              name: blockName,
              nextBlocks: lastMessage.choices ?? [],
            })
          }
        })

        set((state) => {
          state.blocks = blocks
        })
      },
    }
  }, 'Studio Story Navigation Store')
