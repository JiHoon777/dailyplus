'use client'
import type { ArticleType } from '@/shared/types'

import { redirect, useSearchParams } from 'next/navigation'

import {
  ArticleCard,
  ArticleCardSkeleton,
  ArticleTypeCategory,
  verifyArticleType,
} from '@/entities/articles'
import { useAppQueries } from '@/shared/api'
import {
  InfiniteListableQueryLoader,
  IntersectionTrigger,
} from '@/shared/lib/loader'
import { createApiClientCSR } from '@/shared/lib/supabase-csr'
import { PageBase } from '@/widgets/layout'

export default function ArticlesPage() {
  const searchParams = useSearchParams()
  const queryKeys = useAppQueries.queryKeys
  const articleType = verifyArticleTypeParam(searchParams.get('articleType'))
  const apiClient = createApiClientCSR()
  const getArticles = apiClient.getArticles.bind(apiClient)

  return (
    <PageBase className={'gap-6'}>
      <ArticleTypeCategory
        showAll
        pathName={'/articles'}
        currentArticleType={articleType}
      />
      <InfiniteListableQueryLoader
        fetchData={getArticles}
        params={{
          limit: 10,
          orderBy: 'published_at',
          type: articleType === 'all' ? undefined : articleType,
        }}
        queryKey={queryKeys.app.articlesInfinite}
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
    </PageBase>
  )
}

function verifyArticleTypeParam(
  articleTypeParam: string | null,
): 'all' | ArticleType {
  const verified =
    verifyArticleType(articleTypeParam) || articleTypeParam === 'all'

  if (!verified) {
    return redirect('/articles?articleType=all')
  }

  return articleTypeParam
}
