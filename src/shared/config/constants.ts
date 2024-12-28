import type { ArticlesType, SupportedLanguagesType } from '@/shared/types'

export const ARTICLE_TYPE_OPTIONS: ArticlesType[] = [
  'trendAndLifestyle',
  'ai',
  'frontend',
]

export const ARTICLE_TYPE_TO_LABEL: Record<ArticlesType, string> = {
  ai: 'Ai',
  frontend: '프론트엔드',
  trendAndLifestyle: '트렌드 & 라이프스타일',
}

export const SUPPORTED_LANGUAGES: SupportedLanguagesType[] = ['ko', 'en']
