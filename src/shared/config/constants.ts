import type { ArticleType, SupportedLanguagesType } from '@/shared/types'

export const ARTICLE_TYPE_OPTIONS: ArticleType[] = [
  'trend',
  'lifeStyle',
  'ai',
  'frontEnd',
  'backEnd',
  'it',
] as const

export const ARTICLE_TYPE_TO_LABEL: Record<ArticleType, string> = {
  ai: 'Ai',
  backEnd: '백엔드',
  frontEnd: '프론트엔드',
  it: 'IT',
  lifeStyle: '라이프스타일',
  trend: '트렌드',
}

export const SUPPORTED_LANGUAGES: SupportedLanguagesType[] = ['ko', 'en']
