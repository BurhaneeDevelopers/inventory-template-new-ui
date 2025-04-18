import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'
import usersFieldsConfig from './UsersConfig'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'

type CustomerRow = {
  [K in (typeof usersFieldsConfig)[number] as K['id']]: string
}

const columns: ColumnDef<CustomerRow>[] = usersFieldsConfig.map(field => ({
  accessorKey: field.id,
  header: ({ column }) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {field.label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => <div>{row.getValue(field.id)}</div>,
}))

const Users = () => {
  // Categorized array for form fields
  return (
    <PageWapper>
      <PageTitileBar title="Users">
        <FormModal
          title="Add New User"
          description="Fill in all the details to add a new machine"
          triggerButtonText="Add New User"
          // onSubmit={handleSubmit}
        >
          <DynamicForm
            title="User Details"
            fieldConfig={usersFieldsConfig}
            // onSubmit={handleSubmit}
            submitButtonText="Save User"
          />
        </FormModal>
      </PageTitileBar>
      <DataTable data={[]} columns={columns} />
    </PageWapper>
  )
}

export default Users
