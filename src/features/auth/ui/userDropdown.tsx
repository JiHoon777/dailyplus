'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChevronDown, Home, LogOut, Settings, Sparkles } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { DpQueryKeys } from '@/shared/api'
import { ApiClientCSR } from '@/shared/lib/supabase-csr'
import { getUsernameFromEmail } from '@/shared/lib/utils'
import { useStore } from '@/shared/store'
import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui'

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const me = useStore('auth', (state) => state.me)
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

  const name = me?.name?.slice(0, 2) ?? me?.email?.slice(0, 2) ?? '??'
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'sm'} variant="ghost" onClick={() => setIsOpen(!isOpen)}>
          <Avatar className="h-6 w-6">
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          {me.name ?? getUsernameFromEmail(me.email)}
          <ChevronDown />
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
