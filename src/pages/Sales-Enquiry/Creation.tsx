import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import PageWapper from '@/components/constants/layout/PageWapper'
import { DataTable } from '@/components/constants/DataTable'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import SubTabs from '@/components/constants/SubTabs'
import { useState } from 'react'
import { CreationDetailsConfig, CreationMasterConfig } from './CreationConfig'

interface Section {
  title: string
  key: string
}

type CreationRow = {
  [K in (typeof CreationMasterConfig)[number] as K['id']]: string
}

const columns: ColumnDef<CreationRow>[] = CreationMasterConfig.map(field => ({
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
    { title: 'Enquiry Listing', key: 'listing' },
    { title: 'Enquiry Creation', key: 'creation' },
  ]

  const [activeTab, setActiveTab] = useState<string>('listing')

  return (
    <PageWapper className="!bg-transparent !shadow-none">
      <SubTabs sections={sections} activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'listing' && (
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg h-fit">
          <h1 className="text-2xl font-medium text-zinc-700 uppercase">Enquiries</h1>

          <DataTable data={[]} columns={columns} />
        </div>
      )}

      {activeTab === 'creation' && (
        <div className="flex flex-col gap-7">
          <div className="flex flex-col justify-between items-center gap-4 bg-white p-4 rounded-lg flex-grow">
            <h1 className="text-2xl font-medium text-zinc-700 uppercase">Transaction Master</h1>

            <DynamicForm
              title="Enquiry Creation"
              fieldConfig={CreationMasterConfig}
              // onSubmit={handleSubmit}
              submitButtonText="Save Process"
            />
          </div>

          <div className="flex flex-col justify-between items-center gap-4 bg-white p-4 rounded-lg flex-grow">
            <h1 className="text-2xl font-medium text-zinc-700 uppercase">Transaction Details</h1>

            <DynamicForm
              title="Process Details"
              fieldConfig={CreationDetailsConfig}
              // onSubmit={handleSubmit}
              submitButtonText="Save Process"
            />
          </div>
        </div>
      )}
    </PageWapper>
  )
}

export default Creation
