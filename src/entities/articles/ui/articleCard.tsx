import type { IArticles } from '@/shared/types'

import { format } from 'date-fns'

import { cn } from '@/shared/lib/utils'
import { Card, CardContent, CardHeader, Label, Skeleton } from '@/shared/ui'

export const ArticleCard = ({ article }: { article: IArticles }) => {
  return (
    <Card className="h-fit w-full shrink-0">
      <CardHeader>
        <Label className="text-lg font-medium text-gray-700">
          <a
            href={article.reference_url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-3xl font-bold hover:text-blue-500 hover:underline"
          >
            {article.title}
          </a>
        </Label>
      </CardHeader>
      <CardContent className={'flex flex-col gap-4'}>
        <div className={'text-xl font-medium'}>{article.summary}</div>
        <Label>
          {article.reference_name}{' '}
          {article.published_at &&
            `• ${format(article.published_at, 'yyyy-MM-dd')}`}
        </Label>
      </CardContent>
    </Card>
  )
}

export const ArticleCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Card className={cn('h-fit shrink-0', className)}>
      <CardHeader className="w-full">
        <Skeleton className="h-6 w-full rounded-xl" />
      </CardHeader>
      <CardContent className={'flex w-full flex-col gap-4'}>
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
      </CardContent>
    </Card>
  )
}
