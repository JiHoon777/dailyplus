import type { SupportedLanguagesType } from '@/shared/types'

import { ArticleType } from '@/shared/types'

export const ARTICLE_TYPE_OPTIONS: ArticleType[] = Object.values(ArticleType)

export const ARTICLE_TYPE_TO_LABEL: Record<ArticleType, string> = {
  [ArticleType.AI]: 'Ai',
  [ArticleType.FRONTEND]: '프론트엔드',
  [ArticleType.TREND_AND_LIFESTYLE]: '트렌드 & 라이프스타일',
}

export const SUPPORTED_LANGUAGES: SupportedLanguagesType[] = ['ko', 'en']
