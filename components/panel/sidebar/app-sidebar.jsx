'use client'

import * as React from 'react'
import { IconBodyScan, IconDashboard } from '@tabler/icons-react'
import { NavMain } from '@/components/panel/sidebar/nav-main'
import { NavUser } from '@/components/panel/sidebar/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { useAppContext } from '@/hooks/useAppContext'
import Image from 'next/image'

export function AppSidebar ({ ...props }) {
  const { session } = useAppContext()

  const userData = {
    name: session?.full_name ?? 'James Dev',
    email: session?.email ?? 'jamesdev@gmail.com',
    avatar: `https://ohl6h4pfccuxujvz.public.blob.vercel-storage.com/hero/supawork-photo-20250730T045550996Z-QsPvjejsOE6dadyRmikqGO2qhzUBMs.png`
  }

  const navMain = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: IconDashboard
    },
    {
      title: 'My Biodata',
      url: '/biodata',
      icon: IconBodyScan
    }
    // {
    //   title: 'My Portofolio',
    //   url: '/project',
    //   icon: IconDeviceProjector
    // }
  ]

  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <a href='/dashboard'>
                <Image
                  src='https://ohl6h4pfccuxujvz.public.blob.vercel-storage.com/assets/jd_logo_1024-55NCd59VtjrIiVx4yHYL4Qa3gCdoak.jpg'
                  alt='James Dev Logo'
                  width={36}
                  height={36}
                  className='rounded-full object-cover shadow-sm border border-border'
                  priority
                />
                <span className='text-base font-semibold'>James Dev</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
