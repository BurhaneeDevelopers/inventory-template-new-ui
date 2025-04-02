import { Outlet } from 'react-router'
import { SidebarInset, SidebarProvider } from './ui/sidebar'
import AppSidebar from './section/AppSidebar'
import { Separator } from './ui/separator'
import { Header } from './constants/layout/Header'

function Layout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className="bg-gray-200 h-full">
            <Header />
            <Separator />
            <Outlet />
            <Separator />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

export default Layout
