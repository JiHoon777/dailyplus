import type { ArticleType, IArticle, IServerListRequest } from '@/shared/types'

export type IArticleCreateRequest = {
  publishedAt?: Date | null
} & Pick<
  IArticle,
  'title' | 'summary' | 'referenceName' | 'referenceUrl' | 'type'
>
export type IArticleListRequest = IServerListRequest<{
  type?: ArticleType
}>
export type IArticleUpdateRequest = Partial<IArticleCreateRequest>
export type IArticleDeleteRequest = Pick<IArticle, 'id'>
