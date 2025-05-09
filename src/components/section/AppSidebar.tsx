import {
  Building,
  Building2,
  Bus,
  ChevronRight,
  Database,
  Factory,
  GitGraphIcon,
  Menu,
  TrendingUp,
  Truck,
  User,
  Users,
  Warehouse,
  WarehouseIcon,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { Link, useLocation } from 'react-router'
import { useSetAtom } from 'jotai'
import { isEditingAtom, selectedDetailsAtom } from '../../../jotai/jotaiStore'

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
      {
        title: 'Common Masters',
        url: '/master/commons',
      },
    ],
  },
  {
    menu: 'Order Management',
    url: '/sales-enquiry',
    icon: Building2,
    items: [
      {
        title: 'Sales Enquiry',
        url: '/sales-enquiry/creation',
      },
      // {
      //   title: 'Design Creation',
      //   url: '/sales-enquiry/design-creation',
      // },
      {
        title: 'Quotation',
        url: '/sales-enquiry/quotation',
      },
      {
        title: 'Order Creation',
        url: '/sales-enquiry/sales-order-generation',
      },
    ],
  },
  {
    menu: 'Procurement',
    url: '/procurement',
    icon: Users,
    items: [
      {
        title: 'PO Creation',
        url: '/procurement/po-generation',
      },
      // {
      //   title: 'Check Inventory',
      //   url: '/procurement/check-inventory',
      // },
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
    menu: 'Material Management',
    url: '/material-management',
    icon: Bus,
    items: [
      {
        title: 'Material Requisition',
        url: '/material-management/material-requisition',
      },
      {
        title: 'Material Issue from Store',
        url: '/material-management/material-issue',
      },
      {
        title: 'Material Received',
        url: '/material-management/material-received',
      },
      {
        title: 'Job Card',
        url: '/material-management/job-card',
      },
      {
        title: 'Production Slip',
        url: '/material-management/production-slip',
      },
    ],
  },
  {
    menu: 'Inventory',
    url: '/inventory',
    icon: Warehouse,
    items: [
      {
        title: 'Opening Stock',
        url: '/inventory/opening-stock',
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

function AppSidebar() {
  const setIsEditing = useSetAtom(isEditingAtom)
  const setSelectedDetails = useSetAtom(selectedDetailsAtom)
  const location = useLocation();
  const isDashboardActive = location.pathname === '/';
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
                <span className={isDashboardActive ? "text-primary font-semibold bg-gray-200 w-full rounded p-1" : "text-muted-foreground"}>Dashboard</span>
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
                    {item.items?.map(subItem => {
                      const isActive = location.pathname === subItem.url;

                      return <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild onClick={() => { setIsEditing(false); setSelectedDetails([]); }}>
                          <Link to={subItem.url}>
                            <span className={isActive ? "text-primary font-semibold bg-gray-200 w-full rounded p-1" : "text-muted-foreground"}>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {/* <SidebarFooter className="">
        <Button
          className="border border-[#ff0000] bg-transparent text-[#ff0000]"
          onClick={() => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            navigate('/signin')
          }}
        >
          Log Out
        </Button>
      </SidebarFooter> */}
    </Sidebar>
  )
}

export default AppSidebar
