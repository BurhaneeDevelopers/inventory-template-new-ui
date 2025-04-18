import {
  Building2,
  ChevronRight,
  Database,
  GitGraphIcon,
  TrendingUp,
  User,
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
    url: '/master',
    icon: Database,
    items: [
      {
        title: 'Items',
        url: '/master/items',
      },
      {
        title: 'Machine',
        url: '/master/machine',
      },
      {
        title: 'Process',
        url: '/master/process',
      },
      // {
      //   title: 'Users/Roles/Right',
      //   url: '/master/users-roles',
      // },
      {
        title: 'Design Master',
        url: '/master/design-master',
      },
      {
        title: 'BOM',
        url: '/master/bom',
      },
      {
        title: 'Customer',
        url: '/master/customer',
      },
      {
        title: 'Supplier',
        url: '/master/supplier',
      },
    ],
  },
  {
    menu: 'Sales Enquiry',
    url: '/sales-enquiry',
    icon: WarehouseIcon,
    items: [
      {
        title: 'Creation',
        url: '/sales-enquiry/creation',
      },
      {
        title: 'Design Creation',
        url: '/sales-enquiry/design-creation',
      },
      {
        title: 'Quotation',
        url: '/sales-enquiry/quotation',
      },
    ],
  },
  {
    menu: 'Procurement',
    url: '/procurement',
    icon: Users,
    items: [
      {
        title: 'Purchase Order Generation',
        url: '/procurement/po-generation',
      },
      {
        title: 'Sales Order Generation',
        url: '/procurement/sales-order-generation',
      },
      {
        title: 'Check Inventory',
        url: '/procurement/check-inventory',
      },
      {
        title: 'GRN',
        url: '/procurement/grn',
      },
      {
        title: 'Purchase Invoice',
        url: '/procurement/purchase-invoice',
      },
    ],
  },
  {
    menu: 'In House Production',
    url: '/in-house-production',
    icon: Building2,
    items: [
      {
        title: 'Internal Order Generation',
        url: '/in-house-production/internal-order',
      },
      {
        title: 'Material Issue from store',
        url: '/in-house-production/material-issue',
      },
      {
        title: 'Material Requisition by Production',
        url: '/in-house-production/material-requisition',
      },
      {
        title: 'Job Card',
        url: '/in-house-production/job-card',
      },
      {
        title: 'Production Slip',
        url: '/in-house-production/production-slip',
      },
    ],
  },
  {
    menu: 'External Production',
    url: '/external-production',
    icon: GitGraphIcon,
    items: [
      {
        title: 'Create Job Work',
        url: '/external-production/create-job-work',
      },
      {
        title: 'Raw Materials',
        url: '/external-production/raw-materials',
      },
      {
        title: 'Finished Goods',
        url: '/external-production/finished-goods',
      },
      {
        title: 'Job Work Invoice',
        url: '/external-production/job-work-invoice',
      },
    ],
  },
  {
    menu: 'Sales',
    url: '/sales',
    icon: TrendingUp,
    items: [
      {
        title: 'Packing Slip',
        url: '/sales/packing-slip',
      },
      {
        title: 'Sales Challan',
        url: '/sales/sales-challan',
      },
      {
        title: 'Sales Invoice',
        url: '/sales/sales-invoice',
      },
      {
        title: 'Sales Return',
        url: '/sales/sales-return',
      },
    ],
  },
  {
    menu: 'Administration',
    url: '/master',
    icon: User,
    items: [
      {
        title: 'User Management',
        url: '/master/users-roles',
      },
      {
        title: 'Settings',
        url: '/',
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
          <img src="/logo.png" alt="Apparel Kingdom" className="w-36 h-24" />
        </SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to={'/'}>
              <SidebarMenuButton asChild>
                {/* <MenuIcon size={24} color="#000" /> */}
                <span className="text-base font-semibold">Dashboard</span>
              </SidebarMenuButton>
            </Link>
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
