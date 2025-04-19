import { Outlet } from 'react-router'
import { SidebarInset, SidebarProvider } from './ui/sidebar'
import AppSidebar from './section/AppSidebar'
import { Separator } from './ui/separator'
import { Header } from './constants/layout/Header'
import { Toaster } from './ui/sonner'

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
            <Toaster />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

export default Layout
