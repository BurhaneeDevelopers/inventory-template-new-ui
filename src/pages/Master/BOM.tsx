import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'

import bomFieldsConfig from './BOMConfig'

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
      <DataTable />
    </PageWapper>
  )
}

export default BOM
