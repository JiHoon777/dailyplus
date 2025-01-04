'use client'
import type { ArticleType, IArticleListRequest } from '@/shared/types'

import { redirect, useSearchParams } from 'next/navigation'

import {
  ArticleCard,
  ArticleCardSkeleton,
  ArticleTypeCategory,
  verifyArticleType,
} from '@/entities/articles'
import { ApiClient, DpQueryKeys } from '@/shared/api'
import { DPLinks } from '@/shared/config'
import {
  InfiniteListableQueryLoader,
  IntersectionTrigger,
} from '@/shared/lib/loader'
import { DPage } from '@/shared/ui'

export default function ArticlesPage() {
  const searchParams = useSearchParams()
  const articleType = verifyArticleTypeParam(searchParams.get('articleType'))
  const getArticles = (input: IArticleListRequest) =>
    ApiClient.articles.getList(input)

  return (
    <DPage className={'gap-6'}>
      <ArticleTypeCategory
        showAll
        pathName={DPLinks.app.articles.list()}
        currentArticleType={articleType}
      />
      <InfiniteListableQueryLoader
        fetchData={getArticles}
        params={{
          size: 10,
          type: articleType === 'all' ? undefined : articleType,
        }}
        queryKey={DpQueryKeys.app.articles.list}
      >
        {({
          list,
          isLoading,
          isFetchingNextPage,
          hasNextPage,
          fetchNextPage,
        }) => (
          <div className="columns-1 gap-4 sm:columns-3">
            {list.map((item) => (
              <div key={item.id} className={'mb-4 break-inside-avoid'}>
                <ArticleCard article={item} />
              </div>
            ))}
            {(isLoading || isFetchingNextPage) &&
              Array.from({ length: 10 }).map((_, index) => (
                <ArticleCardSkeleton
                  key={index}
                  className={'mb-4 break-inside-avoid'}
                />
              ))}
            <IntersectionTrigger
              onIntersect={fetchNextPage}
              hasNextPage={hasNextPage}
              isLoading={isFetchingNextPage || isLoading}
            />
          </div>
        )}
      </InfiniteListableQueryLoader>
    </DPage>
  )
}

function verifyArticleTypeParam(
  articleTypeParam: string | null,
): 'all' | ArticleType {
  const verified =
    verifyArticleType(articleTypeParam) || articleTypeParam === 'all'

  if (!verified) {
    return redirect(DPLinks.app.articles.list({ articleType: 'all' }))
  }

  return articleTypeParam
}
