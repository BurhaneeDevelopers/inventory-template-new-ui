import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'
import itemFieldsConfig from './ItemsConfig'
import { DynamicForm } from '@/components/constants/custom/DynamicForm'

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
      <DataTable />
    </PageWapper>
  )
}

export default Items
