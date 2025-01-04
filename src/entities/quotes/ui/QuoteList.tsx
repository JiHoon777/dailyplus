import type { IQuote, IQuoteListRequest } from '@/shared/types'
import type { QueryKey } from '@tanstack/react-query'

import { ApiClient } from '@/shared/api'
import {
  InfiniteListableQueryLoader,
  IntersectionTrigger,
} from '@/shared/lib/loader'
import { cn } from '@/shared/lib/utils'
import { ScrollArea, ScrollBar } from '@/shared/ui'

export type IQuoteListProps = {
  onSelectQuote: (quote: IQuote) => void
  getQuoteListQueryKey: (
    input: Omit<IQuoteListRequest, 'page' | 'size'>,
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
  const getQuoteList = (input: IQuoteListRequest) =>
    ApiClient.quotes.getList(input)

  return (
    <InfiniteListableQueryLoader
      fetchData={getQuoteList}
      params={{
        size: 10,
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
            <IntersectionTrigger
              onIntersect={fetchNextPage}
              hasNextPage={hasNextPage}
              isLoading={isFetchingNextPage || isLoading}
            />
          </div>
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
  quote: IQuote
  onClick: (quote: IQuote) => void
}) => {
  return (
    <div
      className="w-full shrink-0 cursor-pointer rounded-lg bg-white p-4 shadow hover:bg-gray-50"
      onClick={() => onClick(quote)}
    >
      <h3 className="mb-2 whitespace-pre-line break-all text-lg font-bold">
        {quote.originalText}
      </h3>
      <p className="whitespace-pre-line break-all text-sm text-gray-600">
        {quote.koreanText}
      </p>
    </div>
  )
}
