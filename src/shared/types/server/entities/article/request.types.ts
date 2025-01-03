import type { ArticleType, IArticle, IServerListRequest } from '@/shared/types'

export type IArticleCreateRequest = Pick<
  IArticle,
  | 'title'
  | 'summary'
  | 'publishedAt'
  | 'referenceName'
  | 'referenceUrl'
  | 'type'
>
export type IArticleListRequest = IServerListRequest<{
  type?: ArticleType
}>
export type IArticleUpdateRequest = Partial<IArticleCreateRequest>
export type IArticleDeleteRequest = Pick<IArticle, 'id'>
