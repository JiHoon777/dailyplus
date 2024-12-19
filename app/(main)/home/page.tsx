import type { SearchParamsType } from '@/shared/types'

import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { ArticleCardSkeleton, verifyArticleType } from '@/entities/articles'
import { PageBase } from '@/widgets/layout'

import { HomeArticles, HomeGreeting, QuickStart } from './_ui'

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
      <Suspense fallback={<Fallback />}>
        <HomeArticles currentArticleType={articleTypeParam} />
      </Suspense>
      <QuickStart />
    </PageBase>
  )
}

function Fallback() {
  return (
    <div className="flex w-full gap-4 overflow-hidden">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="w-[30%] shrink-0">
          <ArticleCardSkeleton key={index} className="w-full" />
        </div>
      ))}
    </div>
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
