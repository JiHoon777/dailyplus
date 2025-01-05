import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { useStore } from '@/shared/store'
import { For, Show } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'

export const StudioStoryNavigation = () => {
  const blocks = useStore('studioStoryNavigation', (s) => s.blocks)

  return (
    <div className="flex w-full max-w-[15rem] flex-col gap-4">
      <For each={blocks} skip={(block) => block.nextBlocks.length === 0}>
        {(block) => (
          <NavigationItem
            key={block.name}
            blockName={block.name}
            nextBlocks={block.nextBlocks}
          />
        )}
      </For>
    </div>
  )
}

// Todo: Ui design
const NavigationItem = ({
  blockName,
  nextBlocks,
}: {
  blockName: string
  nextBlocks?: string[]
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentBlockName = searchParams.get('block')
  const isActive = blockName === currentBlockName

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-4 border p-2',
        isActive && 'bg-gray-100',
      )}
    >
      <Link
        href={{
          pathname: pathname,
          query: {
            block: blockName,
          },
        }}
      >
        {blockName}
      </Link>

      <Show when={(nextBlocks?.length ?? 0) > 0}>
        <div className="grid grid-cols-3 gap-2">
          <For each={nextBlocks ?? []}>
            {(nextBlock) => (
              <NavigationItem key={nextBlock} blockName={nextBlock} />
            )}
          </For>
        </div>
      </Show>
    </div>
  )
}
