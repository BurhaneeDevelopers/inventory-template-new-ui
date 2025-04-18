import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'
import itemFieldsConfig from './ItemsConfig'
import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'

type ItemRow = {
  [K in (typeof itemFieldsConfig)[number] as K['id']]: string
}

const columns: ColumnDef<ItemRow>[] = itemFieldsConfig.map(field => ({
  accessorKey: field.id,
  header: ({ column }) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {field.label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => <div>{row.getValue(field.id)}</div>,
}))

const Items = () => {
  // Categorized array for form fields

  return (
    <PageWapper>
      <PageTitileBar title="Items">
        <FormModal
          title="Create New Item"
          description="Fill in all the details to create a new inventory item"
          triggerButtonText="Add New Item"
          // onSubmit={handleSubmit}
        >
          <DynamicForm
            title="Item Details"
            fieldConfig={itemFieldsConfig}
            // onSubmit={handleSubmit}
            submitButtonText="Save Item"
          />
        </FormModal>
      </PageTitileBar>

      <DataTable data={[]} columns={columns} />
    </PageWapper>
  )
}

export default Items
