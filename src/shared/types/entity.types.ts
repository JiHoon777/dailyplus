import type { Database } from 'database.types'

/**
 * User
 */
type _USER = Database['public']['Tables']['users']['Row']
export interface IUser extends _USER {}

/**
 * Aritlcle
 */
type _ARTICLES = Database['public']['Tables']['articles']['Row']
export interface IArticle extends _ARTICLES {}
export type ArticleCreationInput = Pick<
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
