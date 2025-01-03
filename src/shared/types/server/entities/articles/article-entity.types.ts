//==============================================================================
// * Articles Entity
//==============================================================================

export type IArticles = {
  id: number
  title: string
  summary: string
  type: ArticleType
  publishedAt: Date
  referenceUrl: string
  referenceName: string
  createdAt: Date
  updatedAt: Date
}

export enum ArticleType {
  TREND_AND_LIFESTYLE = 'TREND_AND_LIFESTYLE',
  AI = 'AI',
  FRONTEND = 'FRONTEND',
}
