import type { IArticle } from '@/shared/types'

import { format } from 'date-fns'

import { Card, CardContent, CardHeader, Label } from '@/shared/ui'

export const HomeArticles = ({ list }: { list: IArticle[] }) => {
  return (
    <section className={'flex w-full flex-col gap-2'}>
      <header>
        <Label className={'text-xl font-semibold'}>Articles</Label>
      </header>
      <div className="relative w-full overflow-hidden">
        <div className="animate-infinite-scroll flex gap-6 p-2">
          {/* 첫 번째 리스트 */}
          {list.map((article) => (
            <HomeArticleCard key={article.id} article={article} />
          ))}
          {/* 두 번째 리스트 (무한 스크롤을 위한 복제) */}
          {list.map((article) => (
            <HomeArticleCard key={`${article.id}-clone`} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}

const HomeArticleCard = ({ article }: { article: IArticle }) => {
  return (
    <Card className="h-fit w-[300px] shrink-0">
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
