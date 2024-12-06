'use client'
import { Brain, MessageSquare, Settings } from 'lucide-react'
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
} from '@/shared/ui/sidebar'

const items = [
  {
    href: '/aiPlayGround/text',
    icon: MessageSquare,
    title: 'Text Generator',
  },
  {
    href: '/aiPlayGround/image',
    icon: Brain,
    title: 'Image Generator',
  },
  {
    href: '/aiPlayGround/settings',
    icon: Settings,
    title: 'Settings',
  },
]

export function AiSentenceGeneratorSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>AI Text Generator</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
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
