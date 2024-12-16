import type { ArticleType } from '@/shared/types'

import { ARTICLE_TYPE_OPTIONS } from '@/shared/config'

export const verifyArticleType = (
  articleType: null | undefined | string | string[],
): articleType is ArticleType => {
  if (!articleType) {
    return false
  }

  return ARTICLE_TYPE_OPTIONS.includes(articleType as ArticleType)
}
