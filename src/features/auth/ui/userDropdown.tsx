'use client'

import { useQueryClient } from '@tanstack/react-query'
import { Home, LogOut, Settings } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { useAppMutations, useAppQueries } from '@/shared/api'
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
  const me = useStore((state) => state.auth.me)
  const router = useRouter()
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const logout = useAppMutations.logout()
  const queryKeys = useAppQueries.queryKeys

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.getAuthUser(),
        })
      },
    })
  }
  const handlePushAdmin = () => router.push('/admin/articles')
  const handlePushHome = () => router.push('/')

  const isAdminPage = pathname?.startsWith('/admin')
  if (!me) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
          {me.name ?? getUsernameFromEmail(me.email)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {me.role === 'admin' && (
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
