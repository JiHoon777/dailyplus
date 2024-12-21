import {
  BookHeartIcon,
  BookIcon,
  NewspaperIcon,
  QuoteIcon,
  TextQuoteIcon,
  UserIcon,
} from 'lucide-react'
import Link from 'next/link'

import { DPLinks } from '@/shared/config'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui'

const items = [
  {
    icon: UserIcon,
    title: 'Users',
    url: DPLinks.admin.users.list,
  },
  {
    icon: NewspaperIcon,
    title: 'Articles',
    url: DPLinks.admin.articles.list,
  },
  {
    icon: BookHeartIcon,
    title: 'Quote People',
    url: DPLinks.admin.quotePeople.list,
  },
  {
    icon: QuoteIcon,
    title: 'Quotes',
    url: DPLinks.admin.quotes.list,
  },
  {
    icon: TextQuoteIcon,
    title: 'Quote Ai Interpretations',
    url: DPLinks.admin.quoteAiInterpretations.list,
  },
  {
    icon: BookIcon,
    title: 'Quote Ai Stories',
    url: DPLinks.admin.quoteAiStories.list,
  },
]

export const AdminSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>관리</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
    </Sidebar>
  )
}
