import type { IArticleCreateRequest } from './server/entities/article/request.types'

/**
 * AI로 생성된 아티클의 기본 구조를 정의합니다.
 * 데이터베이스에 저장되기 전의 raw 형태입니다.
 */
export type IAiGeneratedArticleBase = Pick<
  IArticleCreateRequest,
  'title' | 'summary' | 'publishedAt' | 'referenceName' | 'referenceUrl'
>
