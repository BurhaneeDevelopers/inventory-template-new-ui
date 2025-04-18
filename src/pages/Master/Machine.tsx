import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'
import machineFieldsConfig from './MachineConfig'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'

type MachineRow = {
  [K in (typeof machineFieldsConfig)[number] as K['id']]: string
}

const columns: ColumnDef<MachineRow>[] = machineFieldsConfig.map(field => ({
  accessorKey: field.id,
  header: ({ column }) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {field.label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => <div>{row.getValue(field.id)}</div>,
}))

const Machine = () => {
  // Categorized array for form fields

  return (
    <PageWapper>
      <PageTitileBar title="Machines">
        <FormModal
          title="Add New Machine"
          description="Fill in all the details to add a new machine"
          triggerButtonText="Add New Machine"
          // onSubmit={handleSubmit}
        >
          <DynamicForm
            title="Machine Details"
            fieldConfig={machineFieldsConfig}
            // onSubmit={handleSubmit}
            submitButtonText="Save Machine"
          />
        </FormModal>
      </PageTitileBar>
      <DataTable data={[]} columns={columns} />
    </PageWapper>
  )
}

export default Machine
