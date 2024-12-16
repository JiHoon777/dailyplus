'use client'
import type { SearchParamsType } from '@/shared/types'

import { redirect } from 'next/navigation'
import { useCallback } from 'react'

import { verifyArticleType } from '@/entities/articles'
import { createApiClientCSR } from '@/shared/lib/supabase-csr'
import { PageBase } from '@/widgets/layout'

export default function ArticlesPage() {
  const loadList = useCallback(
    async (input: { page: number; limit: number }) => {
      const apiClient = createApiClientCSR()
      const res = await apiClient.getArticles(input)

      return {
        error: res.error,
        list: res.data ?? [],
        totalCount: res.count ?? 0,
      }
    },
    [],
  )

  return (
    <PageBase className={'gap-6'}>
      <h1>Articles</h1>
    </PageBase>
  )
}

function verifyArticleTypeParam(searchParams: SearchParamsType) {
  const verified = verifyArticleType(searchParams['articleType'])

  if (!verified) {
    return redirect('/home?articleType=trend')
  }

  return searchParams['articleType']
}
