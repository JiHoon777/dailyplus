'use client'

import { useOverlay } from '@/shared/lib/overlay'
import { useStore } from '@/shared/store'
import { Button } from '@/shared/ui'

import { LoginModal } from './loginModal'
import { UserDropdown } from './userDropdown'

export function AuthButton() {
  const me = useStore((state) => state.auth.me)
  const { open } = useOverlay()

  const handleLogin = () => {
    open(({ isOpen, close }) => <LoginModal isOpen={isOpen} onClose={close} />)
  }

  if (me) {
    return <UserDropdown />
  }

  return (
    <Button variant="ghost" onClick={handleLogin}>
      로그인
    </Button>
  )
}
