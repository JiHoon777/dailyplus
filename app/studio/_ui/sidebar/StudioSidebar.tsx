'use client'

import { Sidebar, SidebarContent } from '@/shared/ui'

import { MoStudioSidebarHeader } from './MoStudioSidebarHeader'
import { RecentAiStoriesGroup } from './RecentAiStoriesGroup'
import { StudioSidebarFooter } from './StudioSidebarFooter'
import { StudioSidebarHeader } from './StudioSideBarHeader'

export const StudioSidebar = () => {
  return (
    <>
      {/* For Mobile */}
      <MoStudioSidebarHeader />
      {/* For Desktop, Mobile */}
      <Sidebar>
        <StudioSidebarHeader />
        <SidebarContent>
          <RecentAiStoriesGroup />
        </SidebarContent>
        <StudioSidebarFooter />
      </Sidebar>
    </>
  )
}
