import PageWapper from '@/components/constants/layout/PageWapper'
import { DataTable } from '@/components/constants/DataTable'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import SubTabs from '@/components/constants/SubTabs'
import { useEffect, useState } from 'react'
import bomFieldsConfig, { bomDetailFieldsConfig } from './BOMConfig'
import { apiService } from '@/apiService/apiService'
import { fetchDesignFromDB, fetchItemsFromDB } from '@/apiService/services'
import CreateBox from '@/components/constants/Masters/CreateBox'
import EditBox from '@/components/constants/Masters/EditBox'

interface Section {
  title: string
  key: string
}

type Item = {
  [key: string]: string | number | undefined
  ItemType: string
  ItemDescription: string
  Quantity: number
  UnitOfMeasure: string
  UnitPrice: number
  DiscountPercentage?: number
  TaxPercentage?: number
  TotalPrice?: number
  DeliveryDate?: string
  LotNumber?: string
}

type BOMRow = {
  [K in (typeof bomFieldsConfig)[number]as K['id']]: string
}

const columns: ColumnDef<BOMRow>[] = bomFieldsConfig.map(field => ({
  accessorKey: field.id,
  header: ({ column }) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {field.label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => <div>{row.getValue(field.id)}</div>,
}))

const Creation = () => {
  const sections: Section[] = [
    { title: 'BOM Listing', key: 'listing' },
    { title: 'BOM Creation', key: 'creation' },
  ]

  const [activeTab, setActiveTab] = useState<string>('listing')
  const [items, setItems] = useState<Item[]>([])
  const [data, setData] = useState([])

  const fetchDataFromDB = async () => {
    try {
      const response = await apiService.post('/bom-master/get-all', {})

      if (response) {
        setData(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createBOMInDb = async (
    values: { [key: string]: string | number | boolean } & { detail: Item[] },
  ) => {
    try {
      const payload = {
        ...values,
        detail: items,
      }
      const response = await apiService.post('/bom-master/save', payload)
      setActiveTab('listing')
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAndSetItemsInDropdown = async () => {
    try {
      const data = await fetchItemsFromDB()
      const designs = await fetchDesignFromDB()

      bomFieldsConfig.forEach((bom, i) => {
        if (bom.id == 'itemId') {
          bomFieldsConfig[i].options = data.map((item: { itemName: string, id: number }) => ({ label: item.itemName, value: item.id }))
        }
        if (bom.id == 'designId') {
          bomFieldsConfig[i].options = designs.map((item: { designName: string, id: number }) => ({ label: item.designName, value: item.id }))
        }
      })
      bomDetailFieldsConfig.forEach((bom, i) => {
        if (bom.id == 'itemId') {
          bomDetailFieldsConfig[i].options = data.map((item: { itemName: string, id: number }) => ({ label: item.itemName, value: item.id }))
        }
      })

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDataFromDB()
    fetchAndSetItemsInDropdown()
  }, [])
  return (
    <PageWapper className="!bg-transparent !shadow-none">
      <SubTabs sections={sections} activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'listing' && (
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg h-fit">
          <h1 className="text-2xl font-medium text-zinc-700 uppercase">BOM Creation</h1>

          <DataTable data={data} columns={columns} />
        </div>
      )}

      {activeTab === 'creation' && (
        <CreateBox
          title={"BOM Creation"}
          masterConfig={bomFieldsConfig}
          detailConfig={bomDetailFieldsConfig}
          onPress={createBOMInDb}
          items={items}
          setItems={setItems}
          fetchData={fetchDataFromDB}
        />
      )}

      {activeTab === 'edit' && (
        <EditBox
          title={"Edit BOM"}
          masterConfig={bomFieldsConfig}
          detailConfig={bomDetailFieldsConfig}
          onPress={createBOMInDb}
          items={items}
          setItems={setItems}
          fetchData={fetchDataFromDB}
        />
      )}
    </PageWapper>
  )
}

export default Creation
