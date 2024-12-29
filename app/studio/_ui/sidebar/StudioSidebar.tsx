'use client'

import Link from 'next/link'

import { AuthButton } from '@/features/auth'
import { cn } from '@/shared/lib/utils'
import {
  DPLogoText,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from '@/shared/ui'

import { RecentAiStoriesGroup } from './RecentAiStoriesGroup'

export const StudioSidebar = () => {
  const { open, toggleSidebar } = useSidebar()
  return (
    <>
      {/* For Mobile */}
      <header className="sticky top-0 z-10 flex shrink-0 flex-col gap-2 border-b px-4 py-2 backdrop-blur-lg md:hidden">
        <SidebarTrigger />
      </header>
      {/* For Desktop, Mobile */}
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
          <RecentAiStoriesGroup />
        </SidebarContent>
        <SidebarFooter>
          <AuthButton />
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
