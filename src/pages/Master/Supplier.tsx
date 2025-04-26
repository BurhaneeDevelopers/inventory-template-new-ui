import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'
import supplierFieldsConfig from './SupplierConfig'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { apiService } from '@/apiService/apiService'
import { useEffect, useState } from 'react'
import { useSetAtom } from 'jotai'
import { pathAtom } from '../../../jotai/jotaiStore'

type SupplierRow = {
  [K in (typeof supplierFieldsConfig)[number]as K['id']]: string
}

const columns: ColumnDef<SupplierRow>[] = supplierFieldsConfig.map(field => ({
  accessorKey: field.id,
  header: ({ column }) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {field.label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => <div>{row.getValue(field.id)}</div>,
}))

const Supplier = () => {
  const [data, setData] = useState([])
  const setEditPath = useSetAtom(pathAtom)

  const fetchDataFromDB = async () => {
    try {
      const response = await apiService.post(apiService.v1 + '/supplier-master/get-all', {})

      if (response) {
        setData(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createSupplierInDb = async (values: { [key: string]: string | number | boolean }) => {
    try {
      const response = await apiService.post(apiService.v1 + '/supplier-master/save', values)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDataFromDB()
    setEditPath("/supplier-master")

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            handleSubmit={createSupplierInDb}
            fetchDataAfterSubmit={fetchDataFromDB}
            submitButtonText="Save Supplier"
          />
        </FormModal>
      </PageTitileBar>
      <DataTable data={data} columns={columns} fieldConfig={supplierFieldsConfig} setData={setData} />
    </PageWapper>
  )
}

export default Supplier
