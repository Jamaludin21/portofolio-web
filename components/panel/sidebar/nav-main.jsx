'use client'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import clsx from 'clsx'
import { useCurrentPath } from '@/hooks/useCurrentPath'

export function NavMain ({ items }) {
  const { pathname } = useCurrentPath()

  const isActive = itemUrl => {
    // Exact match or prefix match for nested routes
    return pathname === itemUrl || pathname.startsWith(`${itemUrl}/`)
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col gap-2'>
        <SidebarMenu>
          {items.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={clsx(
                  'transition-colors',
                  isActive(item.url)
                    ? 'bg-gray-300 dark:bg-muted text-primary font-semibold'
                    : 'hover:bg-muted/50'
                )}
              >
                <a href={item.url} className='flex items-center gap-2'>
                  {item.icon && <item.icon className='size-5' />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
