import type { ApiClientRoot } from '../ApiClient'
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
  constructor(apiClient: ApiClientRoot) {
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

    return this.fetch.get({
      url: {
        segments: [this.segmentPrefix, 'list'],
        query: { page, size, quotePersonName },
      },
    })
  }
}
