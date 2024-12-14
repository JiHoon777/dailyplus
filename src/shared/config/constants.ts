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

export const ARTICLE_TYPE_TO_LABEL: Record<ArticleType, string> = {
  ai: 'AI',
  'back-end': '백엔드',
  'front-end': '프론트엔드',
  it: 'IT 뉴스',
  'korea-news': '대한민국 뉴스',
  trend: '트렌드',
  'world-news': '세계 뉴스',
}

export const SUPPORTED_LANGUAGES: SupportedLanguagesType[] = ['ko', 'en']
