'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Home, LogOut, Settings, Sparkles } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { DpQueryKeys } from '@/shared/api'
import { ApiClientCSR } from '@/shared/lib/supabase-csr'
import { getUsernameFromEmail } from '@/shared/lib/utils'
import { useDPStore } from '@/shared/store'
import { Button } from '@/shared/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const me = useDPStore((state) => state.auth.me)
  const router = useRouter()
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const logout = useMutation({
    mutationFn: async () => {
      const { error } = await ApiClientCSR.auth.logout()

      if (error) {
        throw error
      }
    },
  })

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: DpQueryKeys.auth.getAuthUser(),
        })
      },
    })
  }
  const handlePushAdmin = () => router.push('/admin/articles')
  const handlePushHome = () => router.push('/')
  const handlePushStudio = () => router.push('/studio')

  const isAdminPage = pathname?.startsWith('/admin')
  const isStudioPage = pathname?.startsWith('/studio')
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
          </>
        )}
        {isStudioPage ? (
          <DropdownMenuItem onClick={handlePushHome}>
            <Home />
            <span>홈</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={handlePushStudio}>
            <Sparkles />
            <span>스튜디오</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          <span>로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
