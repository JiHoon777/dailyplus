// hooks/useGenerateArticlesWithAi.ts

import type { GetArticlesByPerplexityInputs } from '../api/getArticlesByPerplexity'
import type { IArticleCreationInput } from '@/shared/types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

import { useAppQueries } from '@/shared/api'
import { createApiClientCSR } from '@/shared/lib/supabase-csr'
import { showToast } from '@/shared/lib/utils'

import { getArticlesByPerplexity } from '../api/getArticlesByPerplexity'
import { extractJsonFromText } from '../lib/extractJsonFromText'
import { sanitizePublishedDate } from '../lib/sanitizePublishedDate'

const ArticleSchema = z.object({
  published_at: z
    .string()
    .nullable()
    .transform((val) => sanitizePublishedDate(val)),
  reference_name: z.string().min(1),
  reference_url: z.string().url(),
  summary: z.string().min(1),
  title: z.string().min(1),
})

export function useGenerateArticlesWithAi() {
  const queryClient = useQueryClient()
  const queryKeys = useAppQueries.queryKeys

  return useMutation({
    mutationFn: async (inputs: GetArticlesByPerplexityInputs) => {
      const { type: articleType } = inputs
      const api = createApiClientCSR()
      const res = await getArticlesByPerplexity(inputs)
      const answer = res.choices?.[0]?.message?.content ?? null

      if (!answer) {
        throw new Error('No response from AI')
      }

      const parsedData = JSON.parse(extractJsonFromText(answer))

      if (!Array.isArray(parsedData)) {
        throw new Error('Data is not an array')
      }

      const validatedArticles = parsedData.reduce<
        Omit<IArticleCreationInput, 'type' | 'unique_id'>[]
      >((acc, item) => {
        try {
          const validatedItem = ArticleSchema.parse(item)
          acc.push(validatedItem)
        } catch (error) {
          console.error('Validation error for item:', item, error)
        }
        return acc
      }, [])

      const { error } = await api.admin.createBulkArticles(
        validatedArticles.map((item) => ({
          ...item,
          type: articleType,
          unique_id: `${item.title}-${item.reference_url}`,
        })),
      )

      if (error) {
        throw error
      }

      return validatedArticles
    },
    onError: (error) => {
      showToast.error(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.articlesPagination(1).slice(0, 2),
      })
      toast('Successfully created articles')
    },
  })
}
