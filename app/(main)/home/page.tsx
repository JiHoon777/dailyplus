import type { SearchParamsType } from '@/shared/types'

import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { verifyArticleType } from '@/entities/articles'
import { PageBase } from '@/widgets/layout'

import { HomeArticlesSSR, HomeArticlesSSRFallback, HomeGreeting } from './_ui'

export default async function Home({
  searchParams: _searchParams,
}: {
  searchParams: Promise<SearchParamsType>
}) {
  const resolvedParams = await _searchParams
  const articleTypeParam = verifyArticleTypeParam(resolvedParams)

  return (
    <PageBase className={'gap-6'}>
      <HomeGreeting />
      <Suspense fallback={<HomeArticlesSSRFallback />}>
        <HomeArticlesSSR currentArticleType={articleTypeParam} />
      </Suspense>
    </PageBase>
  )
}

function verifyArticleTypeParam(searchParams: SearchParamsType) {
  const articleType = searchParams['articleType']
  const verified = verifyArticleType(articleType)

  if (!verified) {
    return redirect('/home?articleType=trend')
  }

  return articleType
}
