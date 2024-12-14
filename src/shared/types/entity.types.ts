import type { Database } from 'database.types'

/**
 * User
 */
export type IUser = Database['public']['Tables']['users']['Row']

/**
 * Aritlcle
 */
export type IArticle = Database['public']['Tables']['articles']['Row']
export type IArticleCreationInput = Pick<
  IArticle,
  | 'title'
  | 'summary'
  | 'published_at'
  | 'reference_name'
  | 'reference_url'
  | 'type'
  | 'unique_id'
>

export type ArticleType = Database['public']['Enums']['article_type']
