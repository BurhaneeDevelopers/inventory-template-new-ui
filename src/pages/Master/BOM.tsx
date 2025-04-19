import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'

import bomFieldsConfig from './BOMConfig'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

type BOMRow = {
  [K in (typeof bomFieldsConfig)[number] as K['id']]: string
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

const BOM = () => {
  // Categorized array for form fields

  return (
    <PageWapper>
      <PageTitileBar title="BOMs">
        <FormModal
          title="Add New BOM"
          description="Fill in all the details to add a new BOM"
          triggerButtonText="Add New BOM"
          // onSubmit={handleSubmit}
        >
          <DynamicForm
            title="BOM Details"
            fieldConfig={bomFieldsConfig}
            // onSubmit={handleSubmit}
            submitButtonText="Save BOM"
          />
        </FormModal>
      </PageTitileBar>
      <DataTable data={[]} columns={columns} />
    </PageWapper>
  )
}

export default BOM
