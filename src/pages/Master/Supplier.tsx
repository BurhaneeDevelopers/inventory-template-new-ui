import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'
import supplierFieldsConfig from './SupplierConfig'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

type SupplierRow = {
  [K in (typeof supplierFieldsConfig)[number] as K['id']]: string
}

const columns: ColumnDef<SupplierRow>[] = supplierFieldsConfig.map(field => ({
  accessorKey: field.id,
  header: ({ column }) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {field.label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => <div>{row.getValue(field.id)}</div>,
}))

const Supplier = () => {
  // Categorized array for form fields

  return (
    <PageWapper>
      <PageTitileBar title="Suppliers">
        <FormModal
          title="Add New Supplier"
          description="Fill in all the details to add a new supplier"
          triggerButtonText="Add New Supplier"
          // onSubmit={handleSubmit}
        >
          <DynamicForm
            title="Supplier Details"
            fieldConfig={supplierFieldsConfig}
            // onSubmit={handleSubmit}
            submitButtonText="Save Supplier"
          />
        </FormModal>
      </PageTitileBar>
      <DataTable data={[]} columns={columns} />
    </PageWapper>
  )
}

export default Supplier
