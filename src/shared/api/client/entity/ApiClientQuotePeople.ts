import type { ApiClient } from '..'
import type {
  IQuotePerson,
  IQuotePersonCreateRequest,
  IQuotePersonListRequest,
  IQuotePersonUpdateRequest,
  IServerListResponse,
} from '@/shared/types'

import { ApiClientEntityBase } from '../base/apiClientEntityBase'

export class ApiClientQuotePeople extends ApiClientEntityBase<
  IQuotePerson,
  IQuotePersonCreateRequest,
  IQuotePersonUpdateRequest,
  IQuotePersonListRequest
> {
  constructor(apiClient: ApiClient) {
    super(apiClient, 'quote_persons')
  }

  async getList(
    input: IQuotePersonListRequest,
  ): Promise<IServerListResponse<IQuotePerson>> {
    const { page = 1, size = 10 } = input

    return this.fetch.get({
      url: {
        segments: [this.segmentPrefix, 'list'],
        query: { page, size },
      },
    })
  }
}
