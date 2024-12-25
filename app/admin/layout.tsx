'use client'

import { redirect } from 'next/navigation'

import { useDPStore } from '@/shared/store'
import { SidebarInset } from '@/shared/ui'
import { AdminHeaderBase } from '@/widgets/layout/ui/adminHeaderBase'
import { AdminSidebar } from '@/widgets/layout/ui/adminSidebar'

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
        <AdminHeaderBase />
        {children}
      </SidebarInset>
    </div>
  )
}
