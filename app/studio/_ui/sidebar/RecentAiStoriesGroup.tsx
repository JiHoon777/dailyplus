import type { IAiStoryListRequest } from '@/shared/types'

import { BookText } from 'lucide-react'
import Link from 'next/link'

import { ApiClient, DpQueryKeys } from '@/shared/api'
import { DPLinks } from '@/shared/config'
import { PagedListableQueryLoader } from '@/shared/lib/loader'
import { useStore } from '@/shared/store'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui'

export const RecentAiStoriesGroup = () => {
  const meId = useStore('auth', (s) => s.me?.id)
  const loadList = (input: IAiStoryListRequest) =>
    ApiClient.aiStories.getListWithIdTitle(input)

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Recents</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <PagedListableQueryLoader
            fetchData={loadList}
            queryKey={DpQueryKeys.studio.recentAiStoryList}
            params={{ size: 10, userId: meId }}
          >
            {({ list }) =>
              list.map((item) => {
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
                      <Link href={DPLinks.studio.aiStories.detail(item.id)}>
                        <BookText />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })
            }
          </PagedListableQueryLoader>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
