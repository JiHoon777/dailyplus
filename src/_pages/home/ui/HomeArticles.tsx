'use client'
import type { ArticleType, IArticle } from '@/shared/types'

import Link from 'next/link'

import { ArticleCard, ArticleTypeCategory } from '@/entities/articles'
import { cn } from '@/shared/lib/utils'
import { Label } from '@/shared/ui'
import { AutoPlayCarousel } from '@/widgets/carousel'

export const HomeArticles = ({
  list,
  currentArticleType,
}: {
  list: IArticle[]
  currentArticleType: ArticleType
}) => {
  return (
    <section className={'flex w-full flex-col gap-6'}>
      <HomeArticlesHeader currentArticleType={currentArticleType} />
      <div className="w-full overflow-hidden">
        <AutoPlayCarousel slides={list}>
          {(item: IArticle) => <ArticleCard article={item} />}
        </AutoPlayCarousel>
      </div>
    </section>
  )
}

const HomeArticlesHeader = ({
  currentArticleType,
}: {
  currentArticleType: ArticleType
}) => {
  return (
    <header className="flex flex-col gap-4 md:flex-row">
      <Label className={'text-xl font-semibold'}>
        Articles
        <Link
          href={'/articles'}
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
          pathName={'/home'}
          currentArticleType={currentArticleType}
        />
        <Link href={'/articles'} className="hidden md:inline">
          more
        </Link>
      </div>
    </header>
  )
}
