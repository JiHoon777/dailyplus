'use client'
import type { ArticleType, IArticle } from '@/shared/types'

import Link from 'next/link'
import { Fragment } from 'react'

import { ArticleCard } from '@/entities/articles'
import { ARTICLE_TYPE_OPTIONS, ARTICLE_TYPE_TO_LABEL } from '@/shared/config'
import { Label, Separator } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'
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
        <div className="flex shrink-0 items-center gap-4">
          <ArticleTypeCategory currentArticleType={currentArticleType} />
        </div>
        <Link href={'/articles'} className="hidden md:inline">
          more
        </Link>
      </div>
    </header>
  )
}

const ArticleTypeCategory = ({
  currentArticleType,
}: {
  currentArticleType: ArticleType
}) => {
  return (
    <>
      {ARTICLE_TYPE_OPTIONS.map((item, index) => {
        const isActive = item === currentArticleType
        const isLast = index === ARTICLE_TYPE_OPTIONS.length - 1
        return (
          <Fragment key={item}>
            <Link
              href={`/home?articleType=${item}`}
              className={cn('shrink-0', isActive && 'font-bold underline')}
            >
              {ARTICLE_TYPE_TO_LABEL[item]}
            </Link>
            {!isLast && (
              <Separator orientation="vertical" className="h-3 bg-gray-400" />
            )}
          </Fragment>
        )
      })}
    </>
  )
}
