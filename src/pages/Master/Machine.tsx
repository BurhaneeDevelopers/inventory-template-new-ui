import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'
import machineFieldsConfig from './MachineConfig'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { apiService } from '../../apiService/apiService'
import { useSetAtom } from 'jotai'
import { pathAtom } from '../../../jotai/jotaiStore'

type MachineRow = {
  [K in (typeof machineFieldsConfig)[number]as K['id']]: string
}

const columns: ColumnDef<MachineRow>[] = machineFieldsConfig.map(field => ({
  accessorKey: field.id,
  header: ({ column }) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {field.label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
  cell: ({ row }) => <div>{row.getValue(field.id)}</div>,
}))

const Machine = () => {
  const [data, setData] = useState([])
  const setEditPath = useSetAtom(pathAtom)

  const fetchDataFromDB = async () => {
    try {
      const response = await apiService.post('/machine-master/get-all', {})

      if (response) {
        setData(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createMachineInDb = async (values: { [key: string]: string | number | boolean }) => {
    try {
      const response = await apiService.post('/machine-master/save', values)

      return response
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDataFromDB()
    setEditPath("/machine-master")

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageWapper>
      <PageTitileBar title="Machines">
        <FormModal
          title="Add New Machine"
          description="Fill in all the details to add a new machine"
          triggerButtonText="Add New Machine"
        // onSubmit={handleSubmit}
        >
          <DynamicForm
            title="Machine Details"
            fieldConfig={machineFieldsConfig}
            handleSubmit={createMachineInDb}
            fetchDataAfterSubmit={fetchDataFromDB}
            submitButtonText="Save Machine"
          />
        </FormModal>
      </PageTitileBar>
      <DataTable data={data} columns={columns} fieldConfig={machineFieldsConfig} setData={setData} />
    </PageWapper>
  )
}

export default Machine
