import type { ApiClient } from '..'
import type {
  ExtractMethodParameters,
  ExtractMethodReturn,
  IQuote,
  IQuoteCreateRequest,
  IQuoteListRequest,
  IQuotePerson,
  IQuoteUpdateRequest,
  IServerListResponse,
} from '@/shared/types'

import { ApiClientEntityBase } from '../base/apiClientEntityBase'

type IApiClientQuotes = typeof ApiClientQuotes.prototype

export type IApiClientQuotesResponse<TMethod extends keyof IApiClientQuotes> =
  ExtractMethodReturn<IApiClientQuotes, TMethod>

export type IApiClientQuotesParams<TMethod extends keyof IApiClientQuotes> =
  ExtractMethodParameters<IApiClientQuotes, TMethod>

export class ApiClientQuotes extends ApiClientEntityBase<
  IQuote,
  IQuoteCreateRequest,
  IQuoteUpdateRequest,
  IQuoteListRequest
> {
  constructor(apiClient: ApiClient) {
    super(apiClient, 'quotes')
  }

  async getList(
    input: IQuoteListRequest,
  ): Promise<
    IServerListResponse<
      IQuote & { quote_people: Pick<IQuotePerson, 'id' | 'name'> | null }
    >
  > {
    const { page = 1, size = 10, quotePersonName } = input

    return this._apiClient.fetch.get({
      url: {
        segments: ['quotes', 'list'],
        query: { page, size, quotePersonName },
      },
    })
  }
}
