import SubTabs from '@/components/constants/SubTabs'
interface Section {
  title: string
  redirectTo: string
  params: string
}

const Tabs = () => {
  const sections: Section[] = [
    {
      title: 'Goods issue return',
      params: '/goods-issue-return',
      redirectTo: '/inventory/goods-issue-return',
    },
    {
      title: 'Good Issue',
      params: '/good-issue',
      redirectTo: '/inventory/good-issue',
    },
  ]
  return <SubTabs sections={sections} />
}

export default Tabs
