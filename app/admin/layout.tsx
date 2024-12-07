'use client'

import { redirect } from 'next/navigation'

import { useUserStore } from '@/entities/user'
import { AdminSidebar } from '@/pages/admin/ui/adminSidebar'
import { SidebarInset, SidebarTrigger } from '@/shared/ui'
import { AdminHeaderBase } from '@/widgets/layout/ui/\badminHeaderBase'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useUserStore((state) => state.user)

  if (!user || user.role !== 'admin') {
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
