'use client'

import type { IArticle } from '@/shared/types'

import { ArticleCard } from '@/entities/articles'
import { AutoPlayCarousel } from '@/shared/ui/carousel'

export const HomeArticlesCarousel = ({
  articles,
}: {
  articles: IArticle[]
}) => {
  return (
    <AutoPlayCarousel slides={articles}>
      {(item: IArticle) => <ArticleCard article={item} />}
    </AutoPlayCarousel>
  )
}
