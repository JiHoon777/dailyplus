import type { ApiClientRoot } from '../ApiClient'
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
  constructor(apiClient: ApiClientRoot) {
    super(apiClient, 'quote-persons')
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
