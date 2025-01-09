import { useStore } from '@/shared/store'
import { For, Show } from '@/shared/ui'

import { EditorBlock } from './EditorBlock'

export const StudioStoryEditor = () => {
  const blocks = useStore('studioStoryEditor', (s) => s.blocks)

  return (
    <div className="no-scrollbar flex h-[94vh] w-full flex-col gap-4 overflow-y-auto rounded-lg border py-4">
      <Show when={blocks.length > 0}>
        <For each={blocks}>
          {(block) => <EditorBlock key={block.title} block={block} />}
        </For>
      </Show>
    </div>
  )
}
