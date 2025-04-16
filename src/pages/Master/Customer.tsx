import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'

import customerFieldsConfig from './CustomerConfig'

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
      <DataTable />
    </PageWapper>
  )
}

export default Customer
