import type { SearchParamsType } from '@/shared/types'

import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { verifyArticleType } from '@/entities/articles'
import { Greeting } from '@/features/auth'
import { DPLinks } from '@/shared/config'
import { DPage } from '@/shared/ui'

import {
  ConfuciusQuotes,
  HomeArticlesSSR,
  HomeArticlesSSRFallback,
} from './_ui'

export default async function Home({
  searchParams: _searchParams,
}: {
  searchParams: Promise<SearchParamsType>
}) {
  const resolvedParams = await _searchParams
  const articleTypeParam = verifyArticleTypeParam(resolvedParams)

  return (
    <DPage className={'gap-6'}>
      <Greeting />
      <Suspense fallback={<HomeArticlesSSRFallback />}>
        <HomeArticlesSSR currentArticleType={articleTypeParam} />
      </Suspense>
      <ConfuciusQuotes />
      <div className="h-10 w-full" />
    </DPage>
  )
}

function verifyArticleTypeParam(searchParams: SearchParamsType) {
  const articleType = searchParams['articleType']
  const verified = verifyArticleType(articleType)

  if (!verified) {
    return redirect(DPLinks.app.home({ articleType: 'trendAndLifestyle' }))
  }

  return articleType
}
