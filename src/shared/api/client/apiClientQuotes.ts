import type { ApiClient } from '.'
import type {
  IListableResponse,
  IQuotes,
  IQuotesCreationInput,
  IQuotesListableInput,
  IQuotesUpdateInput,
} from '@/shared/types'

import { ApiClientEntityBase } from './base/apiClientEntityBase'
import { createListableResponse, getPaginationRange } from './utils'

export class ApiClientQuotes extends ApiClientEntityBase<
  'quotes',
  IQuotes,
  IQuotesCreationInput,
  IQuotesUpdateInput,
  IQuotesListableInput
> {
  constructor(apiClient: ApiClient) {
    super(apiClient, 'quotes')
  }

  async getList(
    input: IQuotesListableInput,
  ): Promise<IListableResponse<IQuotes>> {
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
