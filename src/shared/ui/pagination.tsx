import type { ButtonProps } from '@shared/ui/button'

import { buttonVariants } from '@shared/ui/button'
import { cn } from '@shared/utils'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import * as React from 'react'

const _Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
)
_Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
))
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        size,
        variant: isActive ? 'outline' : 'ghost',
      }),
      className,
    )}
    {...props}
  />
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn('gap-1 pl-2.5', className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}) => {
  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const delta = 2 // 현재 페이지 양쪽에 보여줄 페이지 수
    const rangeWithDots = []

    // 시작 페이지와 끝 페이지 계산
    let start = Math.max(2, currentPage - delta)
    let end = Math.min(totalPages - 1, currentPage + delta)

    // 현재 페이지가 끝에 가까울 때 조정
    if (currentPage > totalPages - delta) {
      start = Math.max(2, totalPages - 2 * delta)
    }
    // 현재 페이지가 시작에 가까울 때 조정
    if (currentPage < delta + 1) {
      end = Math.min(totalPages - 1, 2 * delta + 1)
    }

    // 항상 첫 페이지는 표시
    rangeWithDots.push(1)

    // 첫 페이지와 시작 페이지 사이에 간격이 있으면 ... 추가
    if (start > 2) {
      rangeWithDots.push('...')
    }

    // 중간 페이지들 추가
    for (let i = start; i <= end; i++) {
      rangeWithDots.push(i)
    }

    // 끝 페이지와 마지막으로 표시된 페이지 사이에 간격이 있으면 ... 추가
    if (end < totalPages - 1) {
      rangeWithDots.push('...')
    }

    // 항상 마지막 페이지는 표시
    if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  return (
    <nav className={cn('mx-auto flex w-full justify-center', className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={cn(
              'cursor-pointer',
              currentPage <= 1 && 'pointer-events-none opacity-50',
            )}
          />
        </PaginationItem>

        {getVisiblePages().map((pageNum, idx) => (
          <PaginationItem key={idx}>
            {pageNum === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => onPageChange(pageNum as number)}
                isActive={pageNum === currentPage}
                className={'cursor-pointer'}
              >
                {pageNum}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            className={cn(
              'cursor-pointer',
              currentPage >= totalPages && 'pointer-events-none opacity-50',
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </nav>
  )
}
Pagination.displayName = 'Pagination'

export { Pagination }
