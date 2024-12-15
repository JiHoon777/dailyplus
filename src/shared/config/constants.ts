import type { ArticleType, SupportedLanguagesType } from '@/shared/types'

export const ARTICLE_TYPE_OPTIONS: ArticleType[] = [
  'trend',
  'it',
  'ai',
  'lifeStyle',
  'frontEnd',
  'backEnd',
  'economy',
  'bitcoin',
] as const

export const ARTICLE_TYPE_TO_LABEL: Record<ArticleType, string> = {
  ai: 'AI',
  backEnd: '백엔드',
  bitcoin: '비트코인',
  economy: '경제',
  frontEnd: '프론트엔드',
  it: 'IT 뉴스',
  lifeStyle: 'LifeStyle',
  trend: '트렌드',
}

export const SUPPORTED_LANGUAGES: SupportedLanguagesType[] = ['ko', 'en']
