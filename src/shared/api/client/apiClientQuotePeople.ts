import type { ApiClient } from '.'
import type {
  IListableResponse,
  IQuotePeople,
  IQuotePeopleCreationInput,
  IQuotePeopleListableInput,
  IQuotePeopleUpdateInput,
} from '@/shared/types'

import { ApiClientEntityBase } from './base/apiClientEntityBase'
import { createListableResponse } from './utils'

export class ApiClientQuotePeople extends ApiClientEntityBase<
  'quote_people',
  IQuotePeople,
  IQuotePeopleCreationInput,
  IQuotePeopleUpdateInput
> {
  constructor(apiClient: ApiClient) {
    super(apiClient, 'quote_people')
  }

  async getList(
    input: IQuotePeopleListableInput,
  ): Promise<IListableResponse<IQuotePeople>> {
    const { orderBy = 'created_at' } = input

    const query = this._listQuery(input)

    query.order(orderBy, { ascending: false })

    const res = await query
    return createListableResponse(res)
  }
}
