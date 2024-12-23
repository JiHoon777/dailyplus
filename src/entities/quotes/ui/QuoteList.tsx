import type { IQuotes, IQuotesListableInput } from '@/shared/types'
import type { QueryKey } from '@tanstack/react-query'

import {
  InfiniteListableQueryLoader,
  IntersectionTrigger,
} from '@/shared/lib/loader'
import { ApiClientCSR } from '@/shared/lib/supabase-csr'

export type IQuoteListProps = {
  onSelectQuote: (quote: IQuotes) => void
  queryKey: (input: Omit<IQuotesListableInput, 'page' | 'limit'>) => QueryKey
}

export const QuoteList = ({ onSelectQuote, queryKey }: IQuoteListProps) => {
  const getQuoteList = (input: IQuotesListableInput) =>
    ApiClientCSR.quotes.getList(input)

  return (
    <InfiniteListableQueryLoader
      fetchData={getQuoteList}
      params={{
        limit: 10,
        quotePeopleName: '공자',
      }}
      queryKey={queryKey}
    >
      {({
        list,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
      }) => (
        <div className="overflow-x-auto whitespace-nowrap pb-4">
          {list.map((quote) => (
            <div
              key={quote.id}
              className="inline-block w-64 cursor-pointer rounded-lg bg-white p-4 shadow hover:bg-gray-50"
              onClick={() => onSelectQuote(quote)}
            >
              <h3 className="mb-2 break-all text-lg font-bold">
                {quote.original_text}
              </h3>
              <p className="break-all text-sm text-gray-600">
                {quote.korean_text}
              </p>
            </div>
          ))}
          {/* {(isLoading || isFetchingNextPage) &&
              Array.from({ length: 10 }).map((_, index) => (
                <ArticleCardSkeleton
                  key={index}
                  className={'mb-4 break-inside-avoid'}
                />
              ))} */}
          <IntersectionTrigger
            onIntersect={fetchNextPage}
            hasNextPage={hasNextPage}
            isLoading={isFetchingNextPage || isLoading}
          />
        </div>
      )}
    </InfiniteListableQueryLoader>
  )
}
