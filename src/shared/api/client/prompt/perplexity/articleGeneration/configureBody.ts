import type { ArticleType, SupportedLanguagesType } from '@/shared/types'

import {
  getDateRangeText,
  getSystemContentByLanguage,
  getUserContentByLanguage,
} from './consts'

export const configureBody = ({
  startDate,
  endDate,
  type,
  language,
}: {
  startDate?: string
  endDate?: string
  type: ArticleType
  language: SupportedLanguagesType
}) => {
  const dateRangeText = getDateRangeText(startDate, endDate)
  const systemContent = getSystemContentByLanguage(
    type,
    language,
    dateRangeText,
  )
  const content = getUserContentByLanguage(type, language)

  return JSON.stringify({
    messages: [
      {
        content: systemContent,
        role: 'system',
      },
      {
        content,
        role: 'user',
      },
    ],
    model: 'llama-3.1-sonar-huge-128k-online',
  })
}
