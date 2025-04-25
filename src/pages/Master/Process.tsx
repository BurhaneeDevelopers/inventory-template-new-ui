import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'
import processFieldsConfig from './ProcessConfig'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { apiService } from '../../apiService/apiService'
import { pathAtom } from '../../../jotai/jotaiStore'
import { useSetAtom } from 'jotai'

type ProcessRow = {
  [K in (typeof processFieldsConfig)[number]as K['id']]: string
}

const columns: ColumnDef<ProcessRow>[] = processFieldsConfig.map(field => ({
  accessorKey: field.id,
  header: ({ column }) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {field.label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => <div>{row.getValue(field.id)}</div>,
}))

const Process = () => {
  const [data, setData] = useState([])
  const setEditPath = useSetAtom(pathAtom)

  const fetchDataFromDB = async () => {
    try {
      const response = await apiService.post(apiService.v1 + '/process-master/get-all', {})

      if (response) {
        setData(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createProcessInDb = async (values: { [key: string]: string | number | boolean }) => {
    try {
      const response = await apiService.post(apiService.v1 + '/process-master/save', values)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDataFromDB()
    setEditPath("/process-master")
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <PageWapper>
      <PageTitileBar title="Process">
        <FormModal
          title="Add New Process"
          description="Fill in all the details to add a new process"
          triggerButtonText="Add New Process"
        >
          <DynamicForm
            title="Process Details"
            fieldConfig={processFieldsConfig}
            handleSubmit={createProcessInDb}
            fetchDataAfterSubmit={fetchDataFromDB}
            submitButtonText="Save Process"
          />
        </FormModal>
      </PageTitileBar>
      <DataTable data={data} columns={columns} fieldConfig={processFieldsConfig} />
    </PageWapper>
  )
}

export default Process
