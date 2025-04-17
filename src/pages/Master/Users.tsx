import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'
import usersFieldsConfig from './UsersConfig'

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
      <DataTable />
    </PageWapper>
  )
}

export default Users
