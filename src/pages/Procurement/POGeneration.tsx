import PageWapper from '@/components/constants/layout/PageWapper'
import { DataTable } from '@/components/constants/DataTable'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import SubTabs from '@/components/constants/SubTabs'
import { useEffect, useState } from 'react'
import {
  fetchSingleTransactionForEdit,
  fetchTransactionsFromDB,
  handleManipulateDropdown,
} from '@/apiService/services'
import { TransactionMasterConfig } from '../Global/TransactionConfig'
import { Item, Row, Section } from '../Sales-Enquiry/Creation'
import { editRowAtom, isEditingAtom } from '../../../jotai/jotaiStore'
import { useAtom } from 'jotai'
import EditBox from '@/components/constants/Transactions/EditBox'
import CreateBox from '@/components/constants/Transactions/CreateBox'

const excludedFields = ['transactionType', 'customerID']

const columns: ColumnDef<Row>[] = TransactionMasterConfig.filter(
  field => !excludedFields.includes(field.id),
).map(field => ({
  accessorKey: field.id,
  header: ({ column }) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {field.label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => <div>{row.getValue(field.id)}</div>,
}))

const POGeneration = () => {
  const [isEditing, setIsEditing] = useAtom(isEditingAtom)
  const [editRow] = useAtom(editRowAtom)
  const [activeTab, setActiveTab] = useState<string>('listing')
  const [items, setItems] = useState<Item[]>([])
  const [data, setData] = useState([])
  const [transaction, setTransaction] = useState(null)

  const sections: Section[] = [
    { title: 'Purchase Order Listing', key: 'listing' },
    { title: 'Purchase Order Creation', key: 'creation' },
    ...(isEditing ? [{ title: `Edit PO - ${transaction?.transactionNumber}`, key: 'edit' }] : []),
  ]

  useEffect(() => {
    handleManipulateDropdown(7, true)
    fetchTransactionsFromDB(7, setData)
  }, [])

  useEffect(() => {
    if (isEditing) {
      fetchSingleTransactionForEdit(editRow.id, setTransaction, setActiveTab)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing])

  const handleCreatePDF = () => {
    // Implement PDF creation logic here
  }

  return (
    <PageWapper className="!bg-transparent !shadow-none">
      <div className="flex justify-end">
        <Button onClick={handleCreatePDF} className="mb-4">
          Create PDF
        </Button>
      </div>
      <SubTabs sections={sections} activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'listing' && (
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg h-fit">
          <h1 className="text-2xl font-medium text-zinc-700 uppercase">Purchase Order</h1>

          <DataTable data={data} columns={columns} />
        </div>
      )}
      {activeTab === 'creation' && (
        <CreateBox
          title={'Purchase Order Creation'}
          setActiveTab={setActiveTab}
          items={items}
          setItems={setItems}
          type={7}
          fetchData={() => fetchTransactionsFromDB(7, setData)}
        />
      )}
      {activeTab === 'edit' && (
        <EditBox
          setActiveTab={setActiveTab}
          transaction={transaction}
          setTransaction={setTransaction}
          setIsEditing={setIsEditing}
          fetchData={() => fetchTransactionsFromDB(7, setData)}
        />
      )}
    </PageWapper>
  )
}

export default POGeneration
