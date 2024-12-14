'use client'
import type { IArticle } from '@/shared/types'

import { format } from 'date-fns'

import { Card, CardContent, CardHeader, Label } from '@/shared/ui'
import { AutoPlayCarousel } from '@/widgets/carousel'

export const HomeArticles = ({ list }: { list: IArticle[] }) => {
  return (
    <section className={'flex w-full flex-col gap-2'}>
      <header>
        <Label className={'text-xl font-semibold'}>Articles</Label>
      </header>
      <div className="relative w-full overflow-hidden">
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
