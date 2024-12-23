import type { ApiClient } from '..'
import type {
  ExtractMethodParameters,
  ExtractMethodReturn,
  IListableResponse,
  IQuotePeople,
  IQuotes,
  IQuotesCreationInput,
  IQuotesListableInput,
  IQuotesUpdateInput,
} from '@/shared/types'

import { ApiClientEntityBase } from '../base/apiClientEntityBase'
import { createListableResponse, getPaginationRange } from '../utils'

type IApiClientQuotes = typeof ApiClientQuotes.prototype

export type IApiClientQuotesResponse<TMethod extends keyof IApiClientQuotes> =
  ExtractMethodReturn<IApiClientQuotes, TMethod>

export type IApiClientQuotesParams<TMethod extends keyof IApiClientQuotes> =
  ExtractMethodParameters<IApiClientQuotes, TMethod>

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
  ): Promise<
    IListableResponse<
      IQuotes & { quote_people: Pick<IQuotePeople, 'id' | 'name'> | null }
    >
  > {
    const {
      page = 1,
      limit = 10,
      orderBy = 'created_at',
      quotePeopleName,
    } = input

    const { from, to } = getPaginationRange(page, limit)

    const query = this.supabaseClient
      .from(this._tableName)
      .select(
        `
        *,
        quote_people(id, name)
        `,
        { count: 'exact' },
      )
      .range(from, to)

    query.order(orderBy, { ascending: false })

    if (quotePeopleName) {
      query.eq('quote_people.name', quotePeopleName)
    }

    return createListableResponse(await query)
  }
}
