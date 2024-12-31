'use client'

import { redirect } from 'next/navigation'

import { useStore } from '@/shared/store'
import { SidebarInset } from '@/shared/ui'

import { AdminHeader, AdminSidebar } from './_ui'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const me = useStore('auth', (s) => s.me)

  if (!me || me.role !== 'admin') {
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
