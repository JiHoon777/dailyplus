// hooks/useGenerateArticlesWithAi.ts

import type { IApiClientPerplexityParams } from '@/shared/api'
import type { IArticlesCreationInput } from '@/shared/types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { DpQueryKeys } from '@/shared/api'
import { ApiClientCSR } from '@/shared/lib/supabase-csr'
import { showToast } from '@/shared/lib/utils'

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

export function useCreateArticlesWithAi() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      inputs: IApiClientPerplexityParams<'getArticlesByPerplexity'>,
    ) => {
      const { type: articleType } = inputs
      const res = await ApiClientCSR.perplexity.getArticlesByPerplexity(inputs)
      const answer = res.choices?.[0]?.message?.content ?? null

      if (!answer) {
        throw new Error('No response from AI')
      }

      const parsedData = JSON.parse(extractJsonFromText(answer))

      if (!Array.isArray(parsedData)) {
        throw new Error('Data is not an array')
      }

      const validatedArticles = parsedData.reduce<
        Omit<IArticlesCreationInput, 'type' | 'unique_id'>[]
      >((acc, item) => {
        try {
          const validatedItem = ArticleSchema.parse(item)
          acc.push(validatedItem)
        } catch (error) {
          console.error('Validation error for item:', item, error)
        }
        return acc
      }, [])

      const { error } = await ApiClientCSR.articles.createBulk(
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
        queryKey: DpQueryKeys.admin.articles.list(),
      })
      showToast.success('Successfully created articles')
    },
  })
}