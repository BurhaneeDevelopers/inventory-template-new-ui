import SubTabs from '@/components/constants/SubTabs'
interface Section {
  title: string
  redirectTo: string
  params: string
}

const Tabs = () => {
  const sections: Section[] = [
    {
      title: 'Purchase Order',
      params: '/po-generation',
      redirectTo: '/procurement/po-generation',
    },
    {
      title: 'Goods Receipt Note',
      params: 'goods-receipt-note',
      redirectTo: '/procurement/goods-receipt-note',
    },
    {
      title: 'Goods Receipt Return',
      params: '/goods-receipt-return',
      redirectTo: '/procurement/goods-receipt-return',
    },
  ]
  return <SubTabs sections={sections} />
}

export default Tabs
