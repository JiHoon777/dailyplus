'use client'
import type { ArticlesType, IArticlesListableInput } from '@/shared/types'

import { redirect, useSearchParams } from 'next/navigation'

import {
  ArticleCard,
  ArticleCardSkeleton,
  ArticleTypeCategory,
  verifyArticleType,
} from '@/entities/articles'
import { DpQueryKeys } from '@/shared/api'
import { DPLinks } from '@/shared/config'
import {
  InfiniteListableQueryLoader,
  IntersectionTrigger,
} from '@/shared/lib/loader'
import { ApiClientCSR } from '@/shared/lib/supabase-csr'
import { DPage } from '@/widgets/layout'

export default function ArticlesPage() {
  const searchParams = useSearchParams()
  const articleType = verifyArticleTypeParam(searchParams.get('articleType'))
  const getArticles = (input: IArticlesListableInput) =>
    ApiClientCSR.articles.getList(input)

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
          limit: 10,
          orderBy: 'published_at',
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
): 'all' | ArticlesType {
  const verified =
    verifyArticleType(articleTypeParam) || articleTypeParam === 'all'

  if (!verified) {
    return redirect(DPLinks.app.articles.list({ articleType: 'all' }))
  }

  return articleTypeParam
}
