'use client'

import Link from 'next/link'

import { useStore } from '@/shared/store'
import { Button } from '@/shared/ui'

import { UserDropdown } from './userDropdown'

export function AuthButton() {
  const me = useStore('auth', (state) => state.me)

  if (me) {
    return <UserDropdown />
  }

  return (
    <Link href={'/auth/signin'}>
      <Button variant={'ghost'}>Sign In</Button>
    </Link>
  )
}
