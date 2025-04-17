import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'
import designMasterFieldsConfig from './DesignMasterConfig'

const DesignMaster = () => {
  // Categorized array for form fields
  return (
    <PageWapper>
      <PageTitileBar title="Design Master">
        <FormModal
          title="Add New Design"
          description="Fill in all the details to add a new design"
          triggerButtonText="Add New Design"
          // onSubmit={handleSubmit}
        >
          <DynamicForm
            title="Design Details"
            fieldConfig={designMasterFieldsConfig}
            // onSubmit={handleSubmit}
            submitButtonText="Save Design"
          />
        </FormModal>
      </PageTitileBar>
      <DataTable />
    </PageWapper>
  )
}

export default DesignMaster
