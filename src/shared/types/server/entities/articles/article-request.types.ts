import type { ArticleType, IArticles, IServerListRequest } from '@/shared/types'

export type IArticleCreateRequest = Pick<
  IArticles,
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
export type IArticleUpdateInput = Partial<IArticleCreateRequest>
export type IArticleDeleteInput = Pick<IArticles, 'id'>
