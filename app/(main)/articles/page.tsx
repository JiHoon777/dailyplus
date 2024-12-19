'use client'
import type { ArticleType, SearchParamsType } from '@/shared/types'

import { redirect, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import { ArticleCard, verifyArticleType } from '@/entities/articles'
import { useAppQueries } from '@/shared/api'
import { InfiniteListableQueryLoader } from '@/shared/lib/loader'
import { createApiClientCSR } from '@/shared/lib/supabase-csr'
import { PageBase } from '@/widgets/layout'

export default function ArticlesPage() {
  const searchParams = useSearchParams()
  const queryKeys = useAppQueries.queryKeys
  const articleType = verifyArticleTypeParam(searchParams.get('articleType'))

  const loadList = useCallback(
    async (input: { page: number; limit: number; type?: ArticleType }) => {
      const apiClient = createApiClientCSR()
      const res = await apiClient.getArticles(input)

      return {
        data: res.data ?? [],
        error: res.error,
        totalCount: res.count ?? 0,
      }
    },
    [],
  )

  return (
    <PageBase className={'gap-6'}>
      <h1>Articles</h1>
      <InfiniteListableQueryLoader
        fetchData={loadList}
        params={{
          limit: 10,
          type: articleType === 'all' ? undefined : articleType,
        }}
        queryKey={({ type }) => queryKeys.app.articlesInfinite(type)}
      >
        {({
          list,
          isLoading,
          isFetchingNextPage,
          hasNextPage,
          fetchNextPage,
        }) => (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            {list.map((item) => (
              <ArticleCard key={item.id} article={item} />
            ))}
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
