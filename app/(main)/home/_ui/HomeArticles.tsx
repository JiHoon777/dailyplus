'use server'
import type { ArticleType } from '@/shared/types'

import Link from 'next/link'

import { ArticleTypeCategory } from '@/entities/articles'
import { createApiClientSSR } from '@/shared/lib/supabase-ssr'
import { cn } from '@/shared/lib/utils'
import { Label } from '@/shared/ui'

import { HomeArticlesCarousel } from './HomeArticlesCarousel'

export const HomeArticles = async ({
  currentArticleType,
}: {
  currentArticleType: ArticleType
}) => {
  const apiClient = await createApiClientSSR()
  const { data, error } =
    await apiClient.app.getHomeArticles(currentArticleType)

  // Todo: handle error
  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }

  return (
    <section className={'flex w-full flex-col gap-6'}>
      <HomeArticlesHeader currentArticleType={currentArticleType} />
      <div className="w-full overflow-hidden">
        <HomeArticlesCarousel articles={data ?? []} />
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
