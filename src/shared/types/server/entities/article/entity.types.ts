import type { IServerEntityBase } from '@/shared/types'

export type IArticle = {
  id: number
  title: string
  summary: string
  type: ArticleType
  publishedAt: Date
  referenceUrl: string
  referenceName: string
  createdAt: Date
  updatedAt: Date
} & IServerEntityBase

export enum ArticleType {
  TREND_AND_LIFESTYLE = 'TREND_AND_LIFESTYLE',
  AI = 'AI',
  FRONTEND = 'FRONTEND',
}
