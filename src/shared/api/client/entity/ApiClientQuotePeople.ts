import type { ApiClient } from '..'
import type {
  IServerListResponse,
  IQuotePerson,
  IQuotePersonCreateRequest,
  IQuotePersonListRequest,
  IQuotePersonUpdateRequest,
} from '@/shared/types'

import { ApiClientEntityBase } from '../base/apiClientEntityBase'
import { createListableResponse, getPaginationRange } from '../lib'

export class ApiClientQuotePeople extends ApiClientEntityBase<
  'quote_people',
  IQuotePerson,
  IQuotePersonCreateRequest,
  IQuotePersonUpdateRequest,
  IQuotePersonListRequest
> {
  constructor(apiClient: ApiClient) {
    super(apiClient, 'quote_people')
  }

  async getList(
    input: IQuotePersonListRequest,
  ): Promise<IServerListResponse<IQuotePerson>> {
    const { page = 1, limit = 10, orderBy = 'created_at' } = input

    const { from, to } = getPaginationRange(page, limit)

    const query = this.supabaseClient
      .from(this._tableName)
      .select('*', { count: 'exact' })
      .range(from, to)

    query.order(orderBy, { ascending: false })

    return createListableResponse(await query)
  }
}
