import type {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from 'react'

import { cn } from '@/shared/lib/utils'

export const DPage = ({
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

export const DPStudioPage = ({
  className,
  ...props
}: PropsWithChildren &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn('flex w-full max-w-screen-md flex-col p-7', className)}
    />
  )
}
