import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import PageWapper from '@/components/constants/layout/PageWapper'
import processFieldsConfig from '../Master/ProcessConfig'
import { DataTable } from '@/components/constants/DataTable'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

type ProcessRow = {
  [K in (typeof processFieldsConfig)[number] as K['id']]: string
}

const columns: ColumnDef<ProcessRow>[] = processFieldsConfig.map(field => ({
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
  // Categorized array for form fields
  return (
    <PageWapper className="!bg-transparent !shadow-none">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg h-fit">
          <h1 className="text-2xl font-medium text-zinc-700 uppercase">Enquiries</h1>

          <DataTable data={[]} columns={columns} />
        </div>

        <div className="flex flex-col justify-between items-center gap-4 bg-white p-4 rounded-lg flex-grow">
          <h1 className="text-2xl font-medium text-zinc-700 uppercase">Sales Enquiry Creation</h1>

          <DynamicForm
            title="Process Details"
            fieldConfig={processFieldsConfig}
            // onSubmit={handleSubmit}
            submitButtonText="Save Process"
          />
        </div>
      </div>
    </PageWapper>
  )
}

export default Creation
