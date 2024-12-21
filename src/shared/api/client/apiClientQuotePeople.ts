import type { ApiClient } from '.'
import type {
  ExtractMethodParameters,
  ExtractMethodReturn,
  IListableResponse,
  IQuotePeople,
  IQuotePeopleListableInput,
} from '@/shared/types'

type IApiClientQuotePeople = typeof ApiClientQuotePeople.prototype

export type IApiClientQuotePeopleResponse<
  TMethod extends keyof IApiClientQuotePeople,
> = ExtractMethodReturn<IApiClientQuotePeople, TMethod>

export type IApiClientQuotePeopleParams<
  TMethod extends keyof IApiClientQuotePeople,
> = ExtractMethodParameters<IApiClientQuotePeople, TMethod>

export class ApiClientQuotePeople {
  constructor(private readonly _apiClient: ApiClient) {}

  get supabaseClient() {
    return this._apiClient.supabaseClient
  }

  async getList(
    input: IQuotePeopleListableInput,
  ): Promise<IListableResponse<IQuotePeople>> {
    const { page = 1, limit = 10, orderBy = 'created_at' } = input

    const { from, to } = this._apiClient.getPaginationRange(page, limit)

    const query = this.supabaseClient
      .from('quote_people')
      .select('*', { count: 'exact' })
      .order(orderBy, { ascending: false })
      .range(from, to)

    const { data, count, error } = await query

    return this._apiClient.createListableResponse(data, count, error)
  }
}
