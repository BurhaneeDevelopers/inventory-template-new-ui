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
import { Link } from 'react-router'

// Menu items.
const items = [
  {
    menu: 'Order Enquiry',
    url: '/order-enquiry',
    icon: Home,
    isActive: true,
    items: [
      {
        title: 'Order Receipt',
        url: '/order-enquiry/order-receipt',
      },
      {
        title: 'BOM Preparation',
        url: '/order-enquiry/bom-preparation',
      },
      {
        title: 'Costing',
        url: '/order-enquiry/costing',
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
                          <Link to={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
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
