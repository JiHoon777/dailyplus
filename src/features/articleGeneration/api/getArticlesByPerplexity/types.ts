import type { ArticleType, SupportedLanguagesType } from '@/shared/types'

export type GetArticlesByPerplexityInputs = {
  type: ArticleType
  language: SupportedLanguagesType
  startDate?: string // YYYY-MM-DD
  endDate?: string // YYYY-MM-DD
}
