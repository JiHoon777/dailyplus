import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useStore } from '@/shared/store'

export const StudioStoryNavigation = () => {
  const pathname = usePathname()
  const blocks = useStore('studioStoryNavigation', (s) => s.blocks)

  return (
    <div className="flex w-full max-w-[15rem] flex-col gap-4">
      {blocks.map((block) => {
        const noHasNextBlock = block.nextBlocks.length === 0

        if (noHasNextBlock) {
          return null
        }

        return (
          <div key={block.name} className="flex w-full flex-col gap-2">
            <Link
              href={{
                pathname: pathname,
                query: {
                  block: block.name,
                },
              }}
            >
              {block.name}
            </Link>
            {block.nextBlocks.length > 0 && (
              <div className="flex flex-wrap gap-2 border p-2">
                {block.nextBlocks.map((nextBlock) => (
                  <Link
                    key={nextBlock}
                    href={{
                      pathname: pathname,
                      query: {
                        block: nextBlock,
                      },
                    }}
                  >
                    {nextBlock}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
