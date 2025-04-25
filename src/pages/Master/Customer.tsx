import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'
import customerFieldsConfig from './CustomerConfig'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { apiService } from '../../apiService/apiService'
import { pathAtom } from '../../../jotai/jotaiStore'
import { useSetAtom } from 'jotai'

type CustomerRow = {
  [K in (typeof customerFieldsConfig)[number]as K['id']]: string
}

const columns: ColumnDef<CustomerRow>[] = customerFieldsConfig.map(field => ({
  accessorKey: field.id,
  header: ({ column }) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {field.label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => <div>{row.getValue(field.id)}</div>,
}))

const Customer = () => {
  const [data, setData] = useState([])
  const setEditPath = useSetAtom(pathAtom)

  const fetchDataFromDB = async () => {
    try {
      const response = await apiService.post(apiService.v1 + '/customer-master/get-all', {})
      console.log(response)

      if (response) {
        setData(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createCsutomerInDb = async (values: { [key: string]: string | number | boolean }) => {
    try {
      const response = await apiService.post(apiService.v1 + '/customer-master/save', values)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDataFromDB()
    setEditPath("/customer-master")

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            handleSubmit={createCsutomerInDb}
            fetchDataAfterSubmit={fetchDataFromDB}
            submitButtonText="Save Customer"
          />
        </FormModal>
      </PageTitileBar>
      <DataTable data={data} columns={columns} fieldConfig={customerFieldsConfig} />
    </PageWapper>
  )
}

export default Customer
