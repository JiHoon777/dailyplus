import type { ArticleType } from '@/shared/types'

import { redirect } from 'next/navigation'

import { HomeArticles, HomeGreeting, QuickStart } from '@/_pages/home'
import { ARTICLE_TYPE_OPTIONS } from '@/shared/config'
import { createApiClientSSR } from '@/shared/lib/supabase-ssr'
import { PageBase } from '@/widgets/layout'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const apiClient = await createApiClientSSR()
  const resolvedParams = await searchParams
  const verifiedArticleTypeParam = (() => {
    const articleType = (resolvedParams['articleType'] ?? '') as ArticleType
    const verified = ARTICLE_TYPE_OPTIONS.includes(articleType)

    if (!verified) {
      return redirect('/home?articleType=trend')
    }

    return articleType
  })()

  // Todo: handle error
  const homeArticles = await apiClient.app.getHomeArticles(
    verifiedArticleTypeParam,
  )

  return (
    <PageBase className={'gap-6'}>
      <HomeGreeting />
      <HomeArticles list={homeArticles.data ?? []} />
      <QuickStart />
    </PageBase>
  )
}
