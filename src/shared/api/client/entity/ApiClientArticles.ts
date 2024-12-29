import type { ApiClient, IApiClientAiBaseParams } from '..'
import type {
  ExtractMethodParameters,
  ExtractMethodReturn,
  IAiGeneratedArticleBase,
  IArticles,
  IArticlesCreationInput,
  IArticlesListableInput,
  IArticlesUpdateInput,
  IListableResponse,
} from '@/shared/types'

import { z } from 'zod'

import {
  extractJsonArrayFromText,
  formatToHyphenYyyyMMddDate,
} from '@/shared/lib/utils'

import { ApiClientEntityBase } from '../base/apiClientEntityBase'
import { createListableResponse, getPaginationRange } from '../lib'

type IApiClientArticles = typeof ApiClientArticles.prototype

export type IApiClientArticlesResponse<
  TMethod extends keyof IApiClientArticles,
> = ExtractMethodReturn<IApiClientArticles, TMethod>

export type IApiClientArticlesParams<TMethod extends keyof IApiClientArticles> =
  ExtractMethodParameters<IApiClientArticles, TMethod>

const AiGeneratedArticleValidationSchema = z.object({
  published_at: z
    .string()
    .nullable()
    .transform((val) => formatToHyphenYyyyMMddDate(val)),
  reference_name: z.string().min(1),
  reference_url: z.string().url(),
  summary: z.string().min(1),
  title: z.string().min(1),
})

export class ApiClientArticles extends ApiClientEntityBase<
  'articles',
  IArticles,
  IArticlesCreationInput,
  IArticlesUpdateInput,
  IArticlesListableInput
> {
  constructor(apiClient: ApiClient) {
    super(apiClient, 'articles')
  }

  get supabaseClient() {
    return this._apiClient.supabaseClient
  }

  // Todo: refactor
  async createBulk(articles: IArticlesCreationInput[]) {
    const results = await Promise.allSettled(
      articles.map((article) =>
        this.supabaseClient.from('articles').insert([article]),
      ),
    )

    const succeeded = results.filter(
      (result): result is PromiseFulfilledResult<any> =>
        result.status === 'fulfilled',
    ).length

    const failed = results.filter(
      (result): result is PromiseRejectedResult => result.status === 'rejected',
    ).length

    return {
      data: { failed, succeeded },
      error: failed > 0 ? `Failed to insert ${failed} articles` : null,
    }
  }

  async getList(
    input: IArticlesListableInput,
  ): Promise<IListableResponse<IArticles>> {
    const { page = 1, limit = 10, orderBy = 'created_at', type } = input

    const { from, to } = getPaginationRange(page, limit)

    const query = this.supabaseClient
      .from(this._tableName)
      .select('*', { count: 'exact' })
      .range(from, to)

    query.order(orderBy, { ascending: false })
    query.not('published_at', 'is', null)

    if (type) {
      query.eq('type', type)
    }

    return createListableResponse(await query)
  }

  //
  // Generate with AI
  //

  private validateArticles(parsedData: IAiGeneratedArticleBase[]) {
    if (!Array.isArray(parsedData)) {
      throw new Error('Data is not an array')
    }

    return parsedData.reduce<IAiGeneratedArticleBase[]>((acc, item) => {
      try {
        const validatedItem = AiGeneratedArticleValidationSchema.parse(item)
        acc.push(validatedItem)
      } catch (error) {
        console.error('Validation error for item:', item, error)
      }
      return acc
    }, [])
  }

  private async generateBulkFromAi(
    input: IApiClientAiBaseParams<'getArticles'>,
  ) {
    const res = await this._apiClient.perplexity.getArticles(input)

    if (!res) {
      throw new Error('No response from AI')
    }

    const validatedArticles = this.validateArticles(
      JSON.parse(extractJsonArrayFromText(res)),
    )

    return validatedArticles
  }

  async generateAndSaveArticlesWithAi(
    input: IApiClientAiBaseParams<'getArticles'>,
  ) {
    const generatedArticles = await this.generateBulkFromAi(input)

    const { error } = await this.createBulk(
      generatedArticles.map((item) => ({
        ...item,
        type: input.type,
        unique_id: `${item.title}-${item.reference_url}`,
      })),
    )

    if (error) {
      throw error
    }

    return generatedArticles
  }
}
