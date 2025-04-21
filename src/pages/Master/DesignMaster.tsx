import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'
import designMasterFieldsConfig from './DesignMasterConfig'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { apiService } from '@/apiService/apiService'
import { useEffect, useState } from 'react'

type DesignRow = {
  [K in (typeof designMasterFieldsConfig)[number] as K['id']]: string
}

const columns: ColumnDef<DesignRow>[] = designMasterFieldsConfig.map(field => ({
  accessorKey: field.id,
  header: ({ column }) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {field.label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => <div>{row.getValue(field.id)}</div>,
}))

const DesignMaster = () => {
  const [data, setData] = useState([])

  const fetchDataFromDB = async () => {
    try {
      const response = await apiService.post(apiService.v1 + '/design-master/get-all', {})

      if (response) {
        setData(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createDesignInDb = async (values: { [key: string]: string | number | boolean }) => {
    try {
      const response = await apiService.post(apiService.v1 + '/design-master/save', values)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDataFromDB()
  }, [])
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
            handleSubmit={createDesignInDb}
            fetchDataAfterSubmit={fetchDataFromDB}
            submitButtonText="Save Design"
          />
        </FormModal>
      </PageTitileBar>
      <DataTable data={data} columns={columns} />
    </PageWapper>
  )
}

export default DesignMaster
