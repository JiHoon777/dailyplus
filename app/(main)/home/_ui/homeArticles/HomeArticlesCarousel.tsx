'use client'

import type { IArticles } from '@/shared/types'

import { ArticleCard } from '@/entities/articles'
import { AutoPlayCarousel } from '@/widgets/carousel'

export const HomeArticlesCarousel = ({
  articles,
}: {
  articles: IArticles[]
}) => {
  return (
    <AutoPlayCarousel slides={articles}>
      {(item: IArticles) => <ArticleCard article={item} />}
    </AutoPlayCarousel>
  )
}
