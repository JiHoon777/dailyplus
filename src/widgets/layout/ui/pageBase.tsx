import type {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from 'react'

import { cn } from '@/shared/utils'

export const PageBase = ({
  className,
  ...props
}: PropsWithChildren &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn('flex w-full max-w-screen-xl flex-col p-7', className)}
    />
  )
}
