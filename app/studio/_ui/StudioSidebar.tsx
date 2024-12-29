'use client'

import { UserIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { AuthButton } from '@/features/auth'
import { DPLinks } from '@/shared/config'
import { cn } from '@/shared/lib/utils'
import {
  DPLogoText,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/shared/ui'

const items = [
  {
    icon: UserIcon,
    title: 'Users',
    url: DPLinks.admin.users.list,
  },
]

export const StudioSidebar = () => {
  const pathname = usePathname()
  const { open, toggleSidebar } = useSidebar()
  return (
    <>
      <header className="sticky top-0 z-10 flex shrink-0 flex-col gap-2 border-b px-4 py-2 backdrop-blur-lg md:hidden">
        <SidebarTrigger />
      </header>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between px-2">
            <Link
              href={'/studio'}
              className={cn(!open && 'fixed left-4 top-2')}
              onMouseOver={() => !open && toggleSidebar()}
            >
              <DPLogoText />
            </Link>
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Recents</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <AuthButton />
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
