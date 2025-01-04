'use server'
import type { ArticleType } from '@/shared/types'

import { ArticleCardSkeleton } from '@/entities/articles'
import { ApiClient } from '@/shared/api'

import { HomeArticlesCarousel } from './HomeArticlesCarousel'
import { HomeArticlesHeader } from './HomeArticlesHeader'

/**
 * 홈 화면의 아티클 섹션을 서버사이드에서 렌더링하는 컴포넌트
 * @param currentArticleType - 현재 선택된 아티클 타입
 */
export const HomeArticlesSSR = async ({
  currentArticleType,
}: {
  currentArticleType: ArticleType
}) => {
  const { data } = await ApiClient.articles.getList({
    size: 10,
    page: 1,
    type: currentArticleType,
  })

  return (
    <section className={'flex w-full flex-col gap-6'}>
      <HomeArticlesHeader currentArticleType={currentArticleType} />
      <div className="w-full overflow-hidden">
        <HomeArticlesCarousel articles={data ?? []} />
      </div>
    </section>
  )
}

export const HomeArticlesSSRFallback = async () => {
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
