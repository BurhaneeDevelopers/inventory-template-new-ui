import SubTabs from '@/components/constants/SubTabs'
interface Section {
  title: string
  redirectTo: string
  params: string
}

const Tabs = () => {
  const sections: Section[] = [
    {
      title: 'Order Receipt',
      params: '/order-receipt',
      redirectTo: '/order-enquiry/order-receipt',
    },
    {
      title: 'BOM - Bill of material',
      params: '/bom-preparation',
      redirectTo: '/order-enquiry/bom-preparation',
    },
    {
      title: 'Costing / Quotation',
      params: '/quotations',
      redirectTo: '/order-enquiry/quotations',
    },
    {
      title: 'Material Requisition Indent Preparation',
      params: '/material-requisition',
      redirectTo: '/order-enquiry/mrip',
    },
  ]
  return <SubTabs sections={sections} />
}

export default Tabs
