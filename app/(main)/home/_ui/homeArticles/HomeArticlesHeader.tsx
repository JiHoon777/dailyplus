import type { ArticleType } from '@/shared/types'

import Link from 'next/link'

import { ArticleTypeCategory } from '@/entities/articles'
import { DPLinks } from '@/shared/config'
import { cn } from '@/shared/lib/utils'
import { Label } from '@/shared/ui'

export const HomeArticlesHeader = ({
  currentArticleType,
}: {
  currentArticleType: ArticleType
}) => {
  return (
    <header className="flex flex-col gap-4 md:flex-row">
      <Label className={'text-xl font-semibold'}>
        Articles
        <Link
          href={DPLinks.app.articles.list()}
          className={cn('ml-6 text-base font-normal', 'inline md:hidden')}
        >
          more
        </Link>
      </Label>
      <div
        className={cn(
          'flex w-full max-w-full items-center justify-between',
          'overflow-x-auto md:overflow-x-visible',
        )}
      >
        <ArticleTypeCategory
          pathName={DPLinks.app.home()}
          currentArticleType={currentArticleType}
        />
        <Link href={DPLinks.app.articles.list()} className="hidden md:inline">
          more
        </Link>
      </div>
    </header>
  )
}
