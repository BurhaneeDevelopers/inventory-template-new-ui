import PageWapper from '@/components/constants/layout/PageWapper'
import { DataTable } from '@/components/constants/DataTable'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Import, } from 'lucide-react'
import SubTabs from '@/components/constants/SubTabs'
import { useEffect, useState } from 'react'
import { fetchSingleTransactionForEdit, fetchTransactionsFromDB, handleManipulateDropdown } from '@/apiService/services'
import { TransactionMasterConfig } from '../Global/TransactionConfig'
import { useAtom } from 'jotai'
import { editRowAtom, isEditingAtom } from '../../../jotai/jotaiStore'
import EditBox from '@/components/constants/Transactions/EditBox'
import CreateBox from '@/components/constants/Transactions/CreateBox'
import PrintButton from '@/components/blocks/PrintButton'
import { printService } from '@/apiService/printService.api'
import QuotationPreview from '@/components/reports/quotation/QuotationPreview'
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import * as Yup from 'yup'


export interface Section {
  title: string
  key: string
}

export type Item = {
  [key: string]: string | number | undefined | null
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
  sourceReferenceID?: null
}

export type Row = {
  [K in (typeof TransactionMasterConfig)[number]as K['id']]: string
}

const excludedFields = ['supplierName'];

const columns: ColumnDef<Row>[] = TransactionMasterConfig
  // .filter(field => !excludedFields.includes(field.id))
  .filter(field => !excludedFields.includes(field.id) && !field.notToBeShown)
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

const additionalMasterConfig = [
  {
    id: 'designId',
    label: 'Design',
    type: 'select',
    required: false,
    options: [],
    initialValue: '',
    validation: Yup.string(),
    notToBeShown: true
  },
  {
    id: 'seasonId',
    label: 'Season',
    type: 'select',
    required: false,
    options: [],
    initialValue: '',
    validation: Yup.string(),
    notToBeShown: true
  },
]

const unnecessaryMasterConfig = [{ id: "referenceID" }]

const Quotation = () => {
  const [isEditing, setIsEditing] = useAtom(isEditingAtom)
  const [editRow] = useAtom(editRowAtom)
  const [activeTab, setActiveTab] = useState<string>('listing')
  const [items, setItems] = useState<Item[]>([])
  const [data, setData] = useState([])
  const [transaction, setTransaction] = useState(null)

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef })
  const [printResult, setPrintResult] = useState<any>(null);

  const printQuotation = (e : any) => {
    const printArea = document.getElementById("printArea");
    if (printArea) {
      printArea.style.display = "block";
    }
    reactToPrintFn(e)
    printArea.style.display = "none";
  }

  const sections: Section[] = [
    { title: 'Quotation Listing', key: 'listing' },
    { title: 'Quotation Creation ', key: 'creation' },
    ...(isEditing ? [{ title: `Edit Quotation - ${transaction?.transactionNumber}`, key: 'edit' }] : []),
  ]

  useEffect(() => {
    handleManipulateDropdown(2, false, true)
    fetchTransactionsFromDB(2, setData)
  }, [])

  useEffect(() => {
    if (isEditing) {
      fetchSingleTransactionForEdit(editRow.id, setTransaction, setActiveTab)
      printService.GetTransactionById(editRow.id).then((result: any) => {
        console.log("Result", result)
        setPrintResult(result);
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing])
  
  return (
    <PageWapper className="!bg-transparent !shadow-none">
      <SubTabs sections={sections} activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'edit' &&
        <PrintButton onClick={printQuotation} />
      }
      {activeTab === 'listing' && (
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg h-fit">
          <h2 className="text-2xl font-medium text-zinc-700 uppercase">Quotation Creation</h2>

          <DataTable data={data} columns={columns} />
        </div>
      )}

      {activeTab === 'creation' && (
        <CreateBox
          additionalMasterConfig={additionalMasterConfig}
          title={"Quotation Creation"}
          setActiveTab={setActiveTab}
          unnecessaryMasterConfig={unnecessaryMasterConfig}
          items={items}
          setItems={setItems}
          type={2}
          fetchData={() => fetchTransactionsFromDB(2, setData)}
        />
      )}

      {activeTab === 'edit' && (
        <EditBox
          title={`Edit Quotation - ${transaction?.transactionNumber}`}
          setActiveTab={setActiveTab}
          transaction={transaction}
          setTransaction={setTransaction}
          setIsEditing={setIsEditing}
          fetchData={() => fetchTransactionsFromDB(2, setData)}
        />
      )}

      <div id="printArea" ref={contentRef} style={{ display: "none" }}>
        {printResult && 
          <QuotationPreview
            customer={printResult.customer}
            details={printResult.details}
            transactionDate={printResult.transactionDate}
            transactionNumber={printResult.transactionNumber}
          />
      }
      </div>
    </PageWapper>
  )
}

export default Quotation
