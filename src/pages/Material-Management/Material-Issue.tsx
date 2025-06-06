import PageWapper from '@/components/constants/layout/PageWapper'
import { DataTable } from '@/components/constants/DataTable'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import SubTabs from '@/components/constants/SubTabs'
import { useEffect, useState } from 'react'
import { fetchSingleTransactionForEdit, fetchTransactionsFromDB, handleManipulateDropdown } from '@/apiService/services'
import { TransactionMasterConfig } from '../Global/TransactionConfig'
import { Item, Row, Section } from '../Sales-Enquiry/Creation'
import { editRowAtom, isEditingAtom } from '../../../jotai/jotaiStore'
import { useAtom } from 'jotai'
import EditBox from '@/components/constants/Transactions/EditBox'
import CreateBox from '@/components/constants/Transactions/CreateBox'
import PrintButton from '@/components/blocks/PrintButton'

// const excludedFields = ['transactionType'];

const columns: ColumnDef<Row>[] = TransactionMasterConfig
  // .filter(field => !excludedFields.includes(field.id))
  .filter(field => !field.notToBeShown)
  .map(field => ({
    accessorKey: field.id,
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        {field.label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue(field.id)}</div>,
  }));

const MaterialIssued = () => {
  const [isEditing, setIsEditing] = useAtom(isEditingAtom)
  const [editRow] = useAtom(editRowAtom)
  const [activeTab, setActiveTab] = useState<string>('listing')
  const [items, setItems] = useState<Item[]>([])
  const [data, setData] = useState([])
  const [transaction, setTransaction] = useState(null)

  const sections: Section[] = [
    { title: 'Material Issued Listing', key: 'listing' },
    { title: 'Material Issued Creation', key: 'creation' },
    ...(isEditing ? [{ title: `Edit Material Issued - ${transaction?.transactionNumber}`, key: 'edit' }] : []),
  ]

  useEffect(() => {
    handleManipulateDropdown(12, true, false)
    fetchTransactionsFromDB(12, setData)
  }, [])

  useEffect(() => {
    if (isEditing) {
      fetchSingleTransactionForEdit(editRow.id, setTransaction, setActiveTab)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing])

  return (
    <PageWapper className="!bg-transparent !shadow-none">
      <SubTabs sections={sections} activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'edit' &&
        <PrintButton />
      }
      {activeTab === 'listing' && (
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg h-fit">
          <h1 className="text-2xl font-medium text-zinc-1200 uppercase">Material Issued</h1>

          <DataTable data={data} columns={columns} />
        </div>
      )}

      {activeTab === 'creation' && (
        <CreateBox
          title={"Material Issued Creation"}
          setActiveTab={setActiveTab}
          items={items}
          setItems={setItems}
          type={12}
          fetchData={() => fetchTransactionsFromDB(12, setData)}
        />
      )}

      {activeTab === 'edit' && (
        <EditBox
          title={`Edit Material Issued - ${transaction?.transactionNumber}`}
          setActiveTab={setActiveTab}
          transaction={transaction}
          setTransaction={setTransaction}
          setIsEditing={setIsEditing}
          fetchData={() => fetchTransactionsFromDB(12, setData)}
        />
      )}
    </PageWapper>
  )
}

export default MaterialIssued
