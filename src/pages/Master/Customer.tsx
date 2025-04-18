import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'
import customerFieldsConfig from './CustomerConfig'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'

type CustomerRow = {
  [K in (typeof customerFieldsConfig)[number] as K['id']]: string
}

const columns: ColumnDef<CustomerRow>[] = customerFieldsConfig.map(field => ({
  accessorKey: field.id,
  header: ({ column }) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {field.label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => <div>{row.getValue(field.id)}</div>,
}))

const Customer = () => {
  // Categorized array for form fields

  return (
    <PageWapper>
      <PageTitileBar title="Customers">
        <FormModal
          title="Add New Customer"
          description="Fill in all the details to add a new customer"
          triggerButtonText="Add New Customer"
          // onSubmit={handleSubmit}
        >
          <DynamicForm
            title="Customer Details"
            fieldConfig={customerFieldsConfig}
            // onSubmit={handleSubmit}
            submitButtonText="Save Customer"
          />
        </FormModal>
      </PageTitileBar>
      <DataTable data={[]} columns={columns} />
    </PageWapper>
  )
}

export default Customer
