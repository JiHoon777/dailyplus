'use client'

import { redirect } from 'next/navigation'

import { Logger } from '@/shared/lib/utils'
import { useStore } from '@/shared/store'
import { UserRole } from '@/shared/types'
import { SidebarInset } from '@/shared/ui'

import { AdminHeader, AdminSidebar } from './_ui'

const logger = new Logger('AdminLayout')
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const me = useStore('auth', (s) => s.me)

  logger.debug(`me: ${me}`)

  if (!me || me.role < UserRole.ADMIN) {
    redirect('/')
    return null
  }

  return (
    <div className="flex w-full">
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader />
        {children}
      </SidebarInset>
    </div>
  )
}
