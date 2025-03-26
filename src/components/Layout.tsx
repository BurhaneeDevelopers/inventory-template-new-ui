import { Outlet } from 'react-router'
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar'
import AppSidebar from './section/AppSidebar'
import { Separator } from './ui/separator'

function Layout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main>
            <header>
              <SidebarTrigger />
              header
            </header>
            <Separator />
            <Outlet />
            <Separator />
            <footer>footer</footer>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

export default Layout
