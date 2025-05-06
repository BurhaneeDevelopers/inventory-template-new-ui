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
import { apiService } from '@/apiService/apiService'
import { createTransactionInDb, handleManipulateDropdown } from '@/apiService/services'
import MasterBox from '@/components/constants/Global/MasterBox'
import { TransactionDetailsConfig, TransactionMasterConfig } from '../Global/TransactionConfig'
import DetailBox from '@/components/constants/Global/DetailBox'

interface Section {
  title: string
  key: string
}

type Item = {
  [key: string]: string | number | undefined
  itemId: number
  itemType: string
  itemDescription: string
  quantity: number
  unitOfMeasure: string
  unitPrice: number
  discountPercentage?: number
  taxPercentage?: number
  totalPrice?: number
  deliveryDate?: string
  lotNumber?: string
  sourceReferenceID?: number
}

type CreationRow = {
  [K in (typeof TransactionMasterConfig)[number]as K['id']]: string
}

const columns: ColumnDef<CreationRow>[] = TransactionMasterConfig.map(field => ({
  accessorKey: field.id,
  header: ({ column }) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {field.label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => <div>{row.getValue(field.id)}</div>,
}))

const DesignCreation = () => {
  const sections: Section[] = [
    { title: 'Design Listing', key: 'listing' },
    { title: 'Design Creation', key: 'creation' },
  ]

  const [activeTab, setActiveTab] = useState<string>('listing')
  const [items, setItems] = useState<Item[]>([])
  const [data, setData] = useState([])

  const fetchDataFromDB = async () => {
    try {
      const response = await apiService.post('/transaction-master/get-all', {})

      if (response) {
        setData(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleManipulateDropdown("design")
    fetchDataFromDB()
  }, [])

  const handleAddItem = (newItem: Item) => {
    setItems(prev => [...prev, { ...newItem, sourceReferenceID: newItem.itemId }])
  }

  const handleDeleteItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  const totalQuantity = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
  const totalPrice = items.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0)
  return (
    <PageWapper className="!bg-transparent !shadow-none">
      <SubTabs sections={sections} activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'listing' && (
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg h-fit">
          <h1 className="text-2xl font-medium text-zinc-700 uppercase">Design</h1>

          <DataTable data={data} columns={columns} />
        </div>
      )}

      {activeTab === 'creation' && (
        <div className="flex flex-col gap-7">
          <MasterBox title='Enquiry Creation' masterConfig={TransactionMasterConfig} onPress={(values) => createTransactionInDb(values, items, setActiveTab)} fetchData={fetchDataFromDB} disabled={items.length === 0} />
          <DetailBox detailConfig={TransactionDetailsConfig} onPress={handleAddItem} />

          <div className="">
            {items.length > 0 && (
              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Added Items</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {TransactionDetailsConfig.filter(field => field.id !== 'itemId').map(field => (
                        <TableHead key={field.id}>{field.label}</TableHead>
                      ))}
                      {/* <TableHead>Edit</TableHead> */}
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item, index) => (
                      <TableRow key={index}>
                        {TransactionDetailsConfig.filter(field => field.id !== 'itemId').map(field => (
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
              <div className="flex items-end gap-2">
                <h4 className="text-base">Total Price:</h4>
                <h3 className="text-2xl font-medium">{totalPrice}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageWapper>
  )
}

export default DesignCreation
