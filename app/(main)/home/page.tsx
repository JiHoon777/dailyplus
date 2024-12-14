import type { ArticleType, SearchParamsType } from '@/shared/types'

import { redirect } from 'next/navigation'

import { HomeArticles, HomeGreeting, QuickStart } from '@/_pages/home'
import { ARTICLE_TYPE_OPTIONS } from '@/shared/config'
import { createApiClientSSR } from '@/shared/lib/supabase-ssr'
import { PageBase } from '@/widgets/layout'

export default async function Home({
  searchParams: _searchParams,
}: {
  searchParams: Promise<SearchParamsType>
}) {
  const apiClient = await createApiClientSSR()
  const resolvedParams = await _searchParams
  const articleTypeParam = verifyArticleTypeParam(resolvedParams)

  // Todo: handle error
  const homeArticles = await apiClient.app.getHomeArticles(articleTypeParam)
  return (
    <PageBase className={'gap-6'}>
      <HomeGreeting />
      <HomeArticles
        list={homeArticles.data ?? []}
        currentArticleType={articleTypeParam}
      />
      <QuickStart />
    </PageBase>
  )
}

function verifyArticleTypeParam(searchParams: SearchParamsType) {
  const articleType = (searchParams['articleType'] ?? '') as ArticleType
  const verified = ARTICLE_TYPE_OPTIONS.includes(articleType)

  if (!verified) {
    return redirect('/home?articleType=trend')
  }

  return articleType
}
