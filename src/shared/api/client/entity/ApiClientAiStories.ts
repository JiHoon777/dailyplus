import type { ApiClientRoot } from '../ApiClient'
import type {
  ExtractMethodParameters,
  ExtractMethodReturn,
  IAiStory,
  IAiStoryCreateRequest,
  IAiStoryListRequest,
  IAiStoryUpdateRequest,
  IServerListResponse,
} from '@/shared/types'

import { ApiClientEntityBase } from '../base/apiClientEntityBase'

type IApiClientAiStories = typeof ApiClientAiStories.prototype

export type IApiClientAiStoriesResponse<
  TMethod extends keyof IApiClientAiStories,
> = ExtractMethodReturn<IApiClientAiStories, TMethod>

export type IApiClientAiStoriesParams<
  TMethod extends keyof IApiClientAiStories,
> = ExtractMethodParameters<IApiClientAiStories, TMethod>

export class ApiClientAiStories extends ApiClientEntityBase<
  IAiStory,
  IAiStoryCreateRequest,
  IAiStoryUpdateRequest,
  IAiStoryListRequest
> {
  constructor(apiClient: ApiClientRoot) {
    super(apiClient, 'ai-stories')
  }

  async getListWithIdTitle(
    input: IAiStoryListRequest,
  ): Promise<IServerListResponse<Pick<IAiStory, 'id' | 'title'>>> {
    const { page = 1, size = 10, userId } = input

    return this.fetch.get({
      segments: [this.segmentPrefix, 'list'],
      query: { page, size, userId },
    })
  }

  async generateFromQuotesWithAi(json: {
    quoteIds: number[]
    customPrompt?: string
  }): Promise<IAiStory> {
    return this.fetch.post(
      {
        segments: [this.segmentPrefix, 'generate-from-quotes-with-ai'],
      },
      {
        json,
      },
    )
  }
}
