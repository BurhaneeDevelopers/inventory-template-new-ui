import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'
import processFieldsConfig from './ProcessConfig'

const Process = () => {
  // Categorized array for form fields
  return (
    <PageWapper>
      <PageTitileBar title="Process">
        <FormModal
          title="Add New Process"
          description="Fill in all the details to add a new process"
          triggerButtonText="Add New Process"
          // onSubmit={handleSubmit}
        >
          <DynamicForm
            title="Process Details"
            fieldConfig={processFieldsConfig}
            // onSubmit={handleSubmit}
            submitButtonText="Save Process"
          />
        </FormModal>
      </PageTitileBar>
      <DataTable />
    </PageWapper>
  )
}

export default Process
