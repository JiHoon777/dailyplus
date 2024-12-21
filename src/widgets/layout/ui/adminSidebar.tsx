import {
  BookHeartIcon,
  BookIcon,
  NewspaperIcon,
  QuoteIcon,
  TextQuoteIcon,
  UserIcon,
} from 'lucide-react'
import Link from 'next/link'

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
    url: '/admin/users',
  },
  {
    icon: NewspaperIcon,
    title: 'Articles',
    url: '/admin/articles',
  },
  {
    icon: BookHeartIcon,
    title: 'Quote People',
    url: '/admin/quote-people',
  },
  {
    icon: QuoteIcon,
    title: 'Quotes',
    url: '/admin/quotes',
  },
  {
    icon: TextQuoteIcon,
    title: 'Quote Ai Interpretations',
    url: '/admin/quote-ai-interpretations',
  },
  {
    icon: BookIcon,
    title: 'Quote Ai Stories',
    url: '/admin/quote-ai-stories',
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
