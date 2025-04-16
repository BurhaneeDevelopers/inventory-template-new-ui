import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'

import machineFieldsConfig from './MachineConfig'

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
      <DataTable />
    </PageWapper>
  )
}

export default Machine
