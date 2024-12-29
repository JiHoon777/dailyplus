'use client'

import { redirect } from 'next/navigation'

import { useDPStore } from '@/shared/store'
import { SidebarInset } from '@/shared/ui'

import { AdminHeader, AdminSidebar } from './_ui'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const me = useDPStore((state) => state.auth.me)

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
