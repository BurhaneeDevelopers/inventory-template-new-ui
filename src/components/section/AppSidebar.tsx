import { Home, ChevronRight } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'

// Menu items.
const items = [
  {
    menu: 'Menu',
    url: '#',
    icon: Home,
    isActive: true,
    items: [
      {
        title: 'Sub-Menu',
        url: '#',
      },
    ],
  },
  {
    menu: 'Menu',
    url: '#',
    icon: Home,
    items: [
      {
        title: 'Sub-Menu',
        url: '#',
      },
    ],
  },
  {
    menu: 'Menu',
    url: '#',
    icon: Home,
    items: [
      {
        title: 'Sub-Menu',
        url: '#',
      },
    ],
  },
  {
    menu: 'Menu',
    url: '#',
    icon: Home,
    items: [
      {
        title: 'Sub-Menu',
        url: '#',
      },
    ],
  },
]

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarMenu>
          {items.map(item => (
            <Collapsible
              key={item.menu}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.menu}>
                    {item.icon && <item.icon />}
                    <span>{item.menu}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map(subItem => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
