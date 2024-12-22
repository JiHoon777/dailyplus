import type { ArticlesType } from '@/shared/types'

import Link from 'next/link'
import { Fragment } from 'react'

import { ARTICLE_TYPE_OPTIONS, ARTICLE_TYPE_TO_LABEL } from '@/shared/config'
import { cn } from '@/shared/lib/utils'
import { Separator } from '@/shared/ui'

export const ArticleTypeCategory = ({
  pathName,
  currentArticleType,
  showAll,
}: {
  pathName: string
  currentArticleType: ArticlesType | 'all'
  showAll?: boolean
}) => {
  const baseOptions = ARTICLE_TYPE_OPTIONS.map((type) => ({
    label: ARTICLE_TYPE_TO_LABEL[type],
    value: type,
  }))
  const allOption = showAll ? [{ label: '전체', value: 'all' }] : []
  const options = [...allOption, ...baseOptions]

  return (
    <div className="flex shrink-0 items-center gap-4">
      {options.map((item, index) => {
        const isActive = item.value === currentArticleType
        const isLast = index === options.length - 1
        return (
          <Fragment key={item.value}>
            <Link
              href={`${pathName}?articleType=${item.value}`}
              className={cn(
                'shrink-0 text-sm',
                isActive && 'font-bold underline',
              )}
            >
              {item.label}
            </Link>
            {!isLast && (
              <Separator orientation="vertical" className="h-3 bg-gray-400" />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
