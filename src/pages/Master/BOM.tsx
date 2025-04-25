import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import PageWapper from '@/components/constants/layout/PageWapper'
import { DataTable } from '@/components/constants/DataTable'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react'
import SubTabs from '@/components/constants/SubTabs'
import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import bomFieldsConfig, { bomDetailFieldsConfig } from './BOMConfig'
import { apiService } from '@/apiService/apiService'
import { fetchDesignFromDB, fetchItemsFromDB } from '@/apiService/services'

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

  const handleAddItem = (newItem: Item) => {
    setItems(prev => [...prev, newItem])
  }

  const handleDeleteItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  const totalQuantity = items.reduce((sum, item) => sum + Number(item.inputQty || 0), 0)

  const [data, setData] = useState([])

  const fetchDataFromDB = async () => {
    try {
      const response = await apiService.post(apiService.v1 + '/bom-master/get-all', {})

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
      const response = await apiService.post(apiService.v1 + '/bom-master/save', payload)
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
          <h1 className="text-2xl font-medium text-zinc-700 uppercase">BOM</h1>

          <DataTable data={data} columns={columns} />
        </div>
      )}

      {activeTab === 'creation' && (
        <div className="flex flex-col gap-7">
          <div className="flex flex-col justify-between gap-4 bg-white p-4 rounded-lg flex-grow">
            <h1 className="text-2xl font-medium text-zinc-700 uppercase text-center">
              Add new BOM
            </h1>

            <DynamicForm
              title="BOM Creation"
              fieldConfig={bomFieldsConfig}
              handleSubmit={createBOMInDb}
              fetchDataAfterSubmit={fetchDataFromDB}
              submitButtonText="Save BOM"
            />
          </div>

          <div className="flex flex-col justify-between gap-4 bg-white p-4 rounded-lg flex-grow">
            <h1 className="text-2xl font-medium text-zinc-700 uppercase text-center">
              BOM Details
            </h1>

            <DynamicForm
              title="Process Details"
              fieldConfig={bomDetailFieldsConfig}
              onSubmit={handleAddItem}
              submitButtonText="Add Item"
            />
          </div>

          <div className="">
            {items.length > 0 && (
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Added Items</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {bomDetailFieldsConfig.map(field => (
                        <TableHead key={field.id}>{field.label}</TableHead>
                      ))}
                      {/* <TableHead>Edit</TableHead> */}
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item, index) => (
                      <TableRow key={index}>
                        {bomDetailFieldsConfig.map(field => (
                          <TableCell key={field.id}>{item[field.id]}</TableCell>
                        ))}
                        <TableCell className="space-x-4">
                          <Button size="icon" className="bg-indigo-500">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDeleteItem(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="flex flex-row ml-auto p-4 gap-4 bg-white mt-4 w-fit rounded-lg">
              <div className="flex items-end gap-2">
                <h4 className="text-base">Total QTY:</h4>
                <h3 className="text-2xl font-medium">{totalQuantity}</h3>
              </div>
              {/* <div className="flex items-end gap-2">
                <h4 className="text-base">Total Price:</h4>
                <h3 className="text-2xl font-medium">{totalPrice}</h3>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </PageWapper>
  )
}

export default Creation
