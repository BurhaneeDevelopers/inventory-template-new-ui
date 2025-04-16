import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'

import supplierFieldsConfig from './SupplierConfig'

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
      <DataTable />
    </PageWapper>
  )
}

export default Supplier
