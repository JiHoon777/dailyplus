import type { ArticleType, SupportedLanguagesType } from '@/shared/types'

export const ARTICLE_TYPE_OPTIONS: ArticleType[] = [
  'trend',
  'it',
  'world-news',
  'korea-news',
  'ai',
  'front-end',
  'back-end',
] as const

export const SUPPORTED_LANGUAGES: SupportedLanguagesType[] = ['ko', 'en']
