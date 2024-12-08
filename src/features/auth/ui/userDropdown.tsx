'use client'

import { Home, LogOut, Settings } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { useMutations } from '@/shared/api'
import { useStore } from '@/shared/store'
import { Button } from '@/shared/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { getUsernameFromEmail } from '@/shared/utils'

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const user = useStore((state) => state.auth.user)
  const { logout } = useMutations()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => logout.mutate()
  const handlePushAdmin = () => router.push('/admin/posts')
  const handlePushHome = () => router.push('/')

  const isAdminPage = pathname?.startsWith('/admin')
  if (!user) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
          {user.name ?? getUsernameFromEmail(user.email)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user.role === 'admin' && (
          <>
            {isAdminPage ? (
              <DropdownMenuItem onClick={handlePushHome}>
                <Home />
                <span>홈</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={handlePushAdmin}>
                <Settings />
                <span>어드민</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          <span>로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
