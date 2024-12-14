'use client'
import type { ArticleType, IArticle } from '@/shared/types'

import { format } from 'date-fns'
import Link from 'next/link'

import { ARTICLE_TYPE_OPTIONS, ARTICLE_TYPE_TO_LABEL } from '@/shared/config'
import { Card, CardContent, CardHeader, Label } from '@/shared/ui'
import { cn } from '@/shared/utils'
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
      <header className="flex gap-4">
        <Label className={'text-xl font-semibold'}>Articles</Label>
        <div className="flex items-center gap-4">
          {ARTICLE_TYPE_OPTIONS.map((item) => {
            const isActive = item === currentArticleType
            return (
              <Link
                href={`/home?articleType=${item}`}
                className={cn(isActive && 'font-bold underline')}
                key={item}
              >
                {ARTICLE_TYPE_TO_LABEL[item]}
              </Link>
            )
          })}
        </div>
      </header>
      <div className="w-full overflow-hidden">
        <AutoPlayCarousel slides={list}>
          {(item: IArticle) => <HomeArticleCard article={item} />}
        </AutoPlayCarousel>
      </div>
    </section>
  )
}

const HomeArticleCard = ({ article }: { article: IArticle }) => {
  return (
    <Card className="h-fit w-full shrink-0">
      <CardHeader>
        <Label className="text-lg font-medium text-gray-700">
          <a
            href={article.reference_url}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-blue-500 hover:underline"
          >
            {article.title}
          </a>
        </Label>
      </CardHeader>
      <CardContent className={'flex flex-col gap-4'}>
        <div>{article.summary}</div>
        <Label>
          {article.reference_name}{' '}
          {article.published_at &&
            `• ${format(article.published_at, 'yyyy-MM-dd')}`}
        </Label>
      </CardContent>
    </Card>
  )
}
