import type { IQuotes, IQuotesListableInput } from '@/shared/types'
import type { QueryKey } from '@tanstack/react-query'

import {
  InfiniteListableQueryLoader,
  IntersectionTrigger,
} from '@/shared/lib/loader'
import { ApiClientCSR } from '@/shared/lib/supabase-csr'
import { cn } from '@/shared/lib/utils'
import { ScrollArea, ScrollBar } from '@/shared/ui'

export type IQuoteListProps = {
  onSelectQuote: (quote: IQuotes) => void
  getQuoteListQueryKey: (
    input: Omit<IQuotesListableInput, 'page' | 'limit'>,
  ) => QueryKey
  quotePeopleName?: string
  direction?: 'row' | 'col'
}

export const QuoteList = ({
  onSelectQuote,
  getQuoteListQueryKey,
  quotePeopleName,
  direction = 'row',
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
        <ScrollArea className={cn(direction === 'col' && 'h-full')}>
          <div
            className={cn(
              'flex w-full gap-4 whitespace-nowrap p-4',
              direction === 'row' && 'flex-row',
              direction === 'col' && 'h-full flex-col pb-[10rem]',
            )}
          >
            {list.map((quote) => (
              <div
                key={quote.id}
                className={cn(
                  'w-full shrink-0',
                  direction === 'row' && 'max-w-[15rem]',
                )}
              >
                <QuoteListCard quote={quote} onClick={onSelectQuote} />
              </div>
            ))}
          </div>
          <IntersectionTrigger
            onIntersect={fetchNextPage}
            hasNextPage={hasNextPage}
            isLoading={isFetchingNextPage || isLoading}
          />
          <ScrollBar
            orientation={direction === 'row' ? 'horizontal' : 'vertical'}
          />
        </ScrollArea>
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
      className="w-full shrink-0 cursor-pointer rounded-lg bg-white p-4 shadow hover:bg-gray-50"
      onClick={() => onClick(quote)}
    >
      <h3 className="mb-2 whitespace-pre-line break-all text-lg font-bold">
        {quote.original_text}
      </h3>
      <p className="whitespace-pre-line break-all text-sm text-gray-600">
        {quote.korean_text}
      </p>
    </div>
  )
}
