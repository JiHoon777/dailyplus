'use client'
import type { VariantProps } from 'class-variance-authority'
import type { JSX, PropsWithChildren } from 'react'

import { cva } from 'class-variance-authority'
import { AnimatePresence, motion as m } from 'framer-motion'
import { useRef } from 'react'

import { useOutsideClick } from '@/shared/hooks'
import { Portal } from '@/shared/ui'
import { cn } from '@/shared/lib/utils'

const modalVariants = cva('w-full rounded-xl bg-background shadow-lg', {
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '7xl': 'max-w-7xl',
      lg: 'max-w-lg',
      md: 'max-w-md',
      sm: 'max-w-sm',
      xl: 'max-w-xl',
    },
  },
})

export interface ModalOverlayProps
  extends VariantProps<typeof modalVariants>,
    PropsWithChildren {
  isOpen: boolean
  onClose: () => void
  closeOnClickOutside?: boolean
  className?: string
}

export function ModalOverlay({
  isOpen,
  onClose,
  closeOnClickOutside = false,
  size,
  children,
  className,
}: ModalOverlayProps): JSX.Element {
  const modalRef = useRef<HTMLDivElement | null>(null)
  useOutsideClick(modalRef, () => onClose(), closeOnClickOutside)

  return (
    <Portal>
      <AnimatePresence mode="wait">
        {isOpen && (
          <m.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <m.div
              animate={{ opacity: 1, scale: 1 }}
              className={cn(modalVariants({ size }), className)}
              exit={{ opacity: 0, scale: 0.1 }}
              initial={{ opacity: 0, scale: 0.1 }}
              transition={{ duration: 0.2 }}
              ref={modalRef}
            >
              {children}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </Portal>
  )
}
