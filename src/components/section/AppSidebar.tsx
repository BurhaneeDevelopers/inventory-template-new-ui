import { ChevronRight, ListCheck, Users, WarehouseIcon } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { Link } from 'react-router'
import { Button } from '../ui/button'

// Menu items.
const items = [
  {
    menu: 'Inventory',
    url: '/inventory',
    icon: WarehouseIcon,
    isActive: true,
    items: [
      {
        title: 'Reports',
        url: '/inventory/reports',
      },
      {
        title: 'Goods Issue Return',
        url: '/order-enquiry/inventory',
      },
      {
        title: 'Good Issue',
        url: '/order-enquiry/inventory',
      },
    ],
  },
  {
    menu: 'Order Enquiry',
    url: '/order-enquiry',
    icon: ListCheck,
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
        title: 'Costing/Quotations',
        url: '/order-enquiry/costing',
      },
      {
        title: 'Material Requisition',
        url: '/order-enquiry/mrip',
      },
    ],
  },
  {
    menu: 'Procurement',
    url: '/order-enquiry',
    icon: Users,
    isActive: true,
    items: [
      {
        title: 'Purchase Order Generation',
        url: '/order-enquiry/order-receipt',
      },
      {
        title: 'Goods Receipt Note',
        url: '/order-enquiry/bom-preparation',
      },
      {
        title: 'Goods Receipt Return',
        url: '/order-enquiry/costing',
      },
    ],
  },
]

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="p-2 flex flex-col gap-4 border-r border-gray-300">
        <SidebarHeader className="flex justify-center items-center">
          <img src="/image.png" alt="Apparel Kingdom" className="w-36 h-28" />
        </SidebarHeader>
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
                    {item.icon && <item.icon size={24} color="#000" />}
                    <span className="text-base font-semibold">{item.menu}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map(subItem => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link to={subItem.url}>
                            <span className="">{subItem.title}</span>
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
      <SidebarFooter className="">
        <Button className="border border-[#ff0000] bg-transparent text-[#ff0000]">Log Out</Button>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
