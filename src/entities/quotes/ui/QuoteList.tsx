import type { IQuotes, IQuotesListableInput } from '@/shared/types'
import type { QueryKey } from '@tanstack/react-query'

import {
  InfiniteListableQueryLoader,
  IntersectionTrigger,
} from '@/shared/lib/loader'
import { ApiClientCSR } from '@/shared/lib/supabase-csr'

export type IQuoteListProps = {
  onSelectQuote: (quote: IQuotes) => void
  getQuoteListQueryKey: (
    input: Omit<IQuotesListableInput, 'page' | 'limit'>,
  ) => QueryKey
  quotePeopleName?: string
}

export const QuoteList = ({
  onSelectQuote,
  getQuoteListQueryKey,
  quotePeopleName,
}: IQuoteListProps) => {
  const getQuoteList = (input: IQuotesListableInput) =>
    ApiClientCSR.quotes.getList(input)

  return (
    <InfiniteListableQueryLoader
      fetchData={getQuoteList}
      params={{
        limit: 10,
        quotePeopleName,
      }}
      queryKey={getQuoteListQueryKey}
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
            <QuoteListCard
              quote={quote}
              key={quote.id}
              onClick={onSelectQuote}
            />
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

export const QuoteListCard = ({
  quote,
  onClick,
}: {
  quote: IQuotes
  onClick: (quote: IQuotes) => void
}) => {
  return (
    <div
      className="inline-block w-64 cursor-pointer rounded-lg bg-white p-4 shadow hover:bg-gray-50"
      onClick={() => onClick(quote)}
    >
      <h3 className="mb-2 break-all text-lg font-bold">
        {quote.original_text}
      </h3>
      <p className="whitespace-pre-line break-all text-sm text-gray-600">
        {quote.korean_text}
      </p>
    </div>
  )
}
