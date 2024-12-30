'use client'
import type { JSX, PropsWithChildren } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'
import { Portal } from '@/shared/ui'

export interface ISheetOverlayProps extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function SheetOverlay({
  isOpen,
  onClose,
  children,
  className,
}: ISheetOverlayProps): JSX.Element {
  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-50 bg-black/50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ damping: 35, stiffness: 300, type: 'spring' }}
              className={cn(
                'fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col gap-4 overflow-y-auto bg-white p-6',
                className,
              )}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  )
}
