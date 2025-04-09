import {
  Building2,
  ChevronRight,
  Database,
  GitGraphIcon,
  TrendingUp,
  Users,
  WarehouseIcon,
} from 'lucide-react'
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
    menu: 'Master',
    url: '/',
    icon: Database,
    items: [
      {
        title: 'Items',
        url: '/',
      },
      {
        title: 'Machine',
        url: '/',
      },
      {
        title: 'Process',
        url: '/',
      },
      {
        title: 'Users/Roles/Right',
        url: '/',
      },
      {
        title: 'Design Master',
        url: '/',
      },
      {
        title: 'BOM',
        url: '/',
      },
      {
        title: 'Customer',
        url: '/',
      },
      {
        title: 'Supplier',
        url: '/',
      },
    ],
  },
  {
    menu: 'Sales Enquiry',
    url: '/inventory',
    icon: WarehouseIcon,
    items: [
      {
        title: 'Creation',
        url: '/inventory/reports',
      },
      {
        title: 'Design Creation',
        url: '/inventory/good-issue',
      },
      {
        title: 'Quotation',
        url: '/inventory/goods-issue-return',
      },
    ],
  },
  {
    menu: 'Procurement',
    url: '/order-enquiry',
    icon: Users,
    items: [
      {
        title: 'Purchase Order Generation',
        url: '/procurement/po-generation',
      },
      {
        title: 'Sales Order Generation',
        url: '/procurement/goods-receipt-note',
      },
      {
        title: 'Check Inventory',
        url: '/procurement/goods-receipt-return',
      },
      {
        title: 'GRN',
        url: '/procurement/goods-receipt-note',
      },
      {
        title: 'Purchase Invoice',
        url: '/procurement/goods-receipt-note',
      },
    ],
  },
  {
    menu: 'In House Production',
    url: '/order-enquiry',
    icon: Building2,
    items: [
      {
        title: 'Internal Order Generation',
        url: '/order-enquiry/order-receipt',
      },
      {
        title: 'Material Issue from store',
        url: '/order-enquiry/quotations',
      },
      {
        title: 'Material Requisition by Production',
        url: '/order-enquiry/bom-preparation',
      },
      {
        title: 'Job Card',
        url: '/order-enquiry/material-requisition',
      },
      {
        title: 'Production Slip',
        url: '/order-enquiry/material-requisition',
      },
    ],
  },
  {
    menu: 'External Production',
    url: '/order-enquiry',
    icon: GitGraphIcon,
    items: [
      {
        title: 'Create Job Work',
        url: '/order-enquiry/order-receipt',
      },
      {
        title: 'Raw Materials',
        url: '/order-enquiry/quotations',
      },
      {
        title: 'Finished Goods',
        url: '/order-enquiry/bom-preparation',
      },
      {
        title: 'Job Work Invoice',
        url: '/order-enquiry/material-requisition',
      },
    ],
  },
  {
    menu: 'Sales',
    url: '/order-enquiry',
    icon: TrendingUp,
    items: [
      {
        title: 'Packing Slip',
        url: '/order-enquiry/order-receipt',
      },
      {
        title: 'Sales Challan',
        url: '/order-enquiry/quotations',
      },
      {
        title: 'Sales Invoice',
        url: '/order-enquiry/bom-preparation',
      },
      {
        title: 'Sales Return',
        url: '/order-enquiry/material-requisition',
      },
    ],
  },
]

// const location = useLocation()

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="p-2 flex flex-col gap-4 border-r border-gray-300">
        <SidebarHeader className="flex justify-center items-center">
          <img src="/image.png" alt="Apparel Kingdom" className="w-36 h-28" />
        </SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              {/* <MenuIcon size={24} color="#000" /> */}
              <span className="text-base font-semibold">Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {items.map(item => (
            <Collapsible key={item.menu} asChild defaultOpen={false} className="group/collapsible">
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
