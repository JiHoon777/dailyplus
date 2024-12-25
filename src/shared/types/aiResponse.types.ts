import type { IArticlesCreationInput } from './entity.types'

/**
 * AI로 생성된 아티클의 기본 구조를 정의합니다.
 * 데이터베이스에 저장되기 전의 raw 형태입니다.
 */
export type IAiGeneratedArticleBase = Pick<
  IArticlesCreationInput,
  'title' | 'summary' | 'published_at' | 'reference_name' | 'reference_url'
>
