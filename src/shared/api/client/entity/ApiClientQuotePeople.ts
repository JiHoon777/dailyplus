import type { ApiClient } from '..'
import type {
  IListableResponse,
  IQuotePeople,
  IQuotePeopleCreationInput,
  IQuotePeopleListableInput,
  IQuotePeopleUpdateInput,
} from '@/shared/types'

import { ApiClientEntityBase } from '../base/apiClientEntityBase'
import { createListableResponse, getPaginationRange } from '../utils'

export class ApiClientQuotePeople extends ApiClientEntityBase<
  'quote_people',
  IQuotePeople,
  IQuotePeopleCreationInput,
  IQuotePeopleUpdateInput,
  IQuotePeopleListableInput
> {
  constructor(apiClient: ApiClient) {
    super(apiClient, 'quote_people')
  }

  async getList(
    input: IQuotePeopleListableInput,
  ): Promise<IListableResponse<IQuotePeople>> {
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
