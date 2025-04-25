import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'
import usersFieldsConfig from './UsersConfig'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { apiService } from '@/apiService/apiService'

type CustomerRow = {
  [K in (typeof usersFieldsConfig)[number]as K['id']]: string
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

const userTypes = [
  {
    label: "Admin",
    value: 1
  },
  {
    label: "Super Admin",
    value: 2
  },
  {
    label: "Manager",
    value: 3
  },
]

const Users = () => {
  const [data, setData] = useState([])

  const fetchDataFromDB = async () => {
    try {
      const response = await apiService.post(apiService.v1 + '/user-master/get-all', {})

      if (response) {
        setData(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createUserInDb = async (values: { [key: string]: string | number | boolean }) => {
    try {
      const response = await apiService.post(apiService.v1 + '/user-master/save', values)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  const handleManipulateDropdown = async () => {
    try {
      usersFieldsConfig.forEach((field, i) => {
        if (field.id == 'role') {
          usersFieldsConfig[i].options = userTypes.map(item => ({ label: item.label, value: item.value }))
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDataFromDB()
    handleManipulateDropdown()
  }, [])
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
            handleSubmit={createUserInDb}
            fetchDataAfterSubmit={fetchDataFromDB}
            submitButtonText="Save User"
          />
        </FormModal>
      </PageTitileBar>
      <DataTable data={data} columns={columns} />
    </PageWapper>
  )
}

export default Users
