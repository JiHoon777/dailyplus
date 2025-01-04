import type { IApiClientAiBaseParams } from '..'
import type { ApiClientRoot } from '../ApiClient'
import type {
  ExtractMethodParameters,
  ExtractMethodReturn,
  IAiGeneratedArticleBase,
  IArticle,
  IArticleCreateRequest,
  IArticleListRequest,
  IArticleUpdateRequest,
  IServerListResponse,
} from '@/shared/types'

import { z } from 'zod'

import { extractJsonArrayFromText } from '@/shared/lib/utils'

import { ApiClientEntityBase } from '../base/apiClientEntityBase'

type IApiClientArticles = typeof ApiClientArticles.prototype

export type IApiClientArticlesResponse<
  TMethod extends keyof IApiClientArticles,
> = ExtractMethodReturn<IApiClientArticles, TMethod>

export type IApiClientArticlesParams<TMethod extends keyof IApiClientArticles> =
  ExtractMethodParameters<IApiClientArticles, TMethod>

const AiGeneratedArticleValidationSchema = z.object({
  publishedAt: z.date(),
  referenceName: z.string().min(1),
  referenceUrl: z.string().url(),
  summary: z.string().min(1),
  title: z.string().min(1),
})

export class ApiClientArticles extends ApiClientEntityBase<
  IArticle,
  IArticleCreateRequest,
  IArticleUpdateRequest,
  IArticleListRequest
> {
  constructor(apiClient: ApiClientRoot) {
    super(apiClient, 'articles')
  }

  async getList(
    input: IArticleListRequest,
  ): Promise<IServerListResponse<IArticle>> {
    const { page = 1, size = 10, type } = input

    return this.fetch.get({
      segments: [this.segmentPrefix, 'list'],
      query: { page, size, type },
    })
  }

  // Todo: refactor
  async createBulk(_articles: IArticleCreateRequest[]) {
    throw new Error('Method not implemented.')
    // const results = await Promise.allSettled(
    //   articles.map((article) =>
    //     this.supabaseClient.from('articles').insert([article]),
    //   ),
    // )

    // const succeeded = results.filter(
    //   (result): result is PromiseFulfilledResult<any> =>
    //     result.status === 'fulfilled',
    // ).length

    // const failed = results.filter(
    //   (result): result is PromiseRejectedResult => result.status === 'rejected',
    // ).length

    // return {
    //   data: { failed, succeeded },
    //   error: failed > 0 ? `Failed to insert ${failed} articles` : null,
    // }
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
    _input: IApiClientAiBaseParams<'getArticles'>,
  ) {
    throw new Error('Method not implemented.')
    // const generatedArticles = await this.generateBulkFromAi(input)

    // const { error } = await this.createBulk(
    //   generatedArticles.map((item) => ({
    //     ...item,
    //     type: input.type,
    //     unique_id: `${item.title}-${item.reference_url}`,
    //   })),
    // )

    // if (error) {
    //   throw error
    // }

    // return generatedArticles
  }
}
