import { Providers } from '@/lib/theme'
import { SiteHeader } from '@/components/panel/navbar/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { getSession } from '@/lib/session'
import { AppSidebar } from '@/components/panel/sidebar/app-sidebar'

export default async function PanelLayout ({ children }) {
  const session = await getSession()

  console.log(session)
  return (
    <Providers>
      <SidebarProvider
        style={{
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)'
        }}
      >
        <AppSidebar variant='inset' />
        <SidebarInset>
          <SiteHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </Providers>
  )
}
