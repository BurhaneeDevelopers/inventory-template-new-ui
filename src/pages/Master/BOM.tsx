import { useQuery } from '@tanstack/react-query'

import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
// import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'

import bomFieldsConfig from './BOMConfig'

const BOM = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['bomData'],
    queryFn: async () => {
      const response = await fetch('https://erpakapi.bay53.com/api/1/item/get-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwibmJmIjoxNzQ1MjM3MjI1LCJleHAiOjE3NDUzMjM2MjUsImlhdCI6MTc0NTIzNzIyNX0.nVSkA9dX2MAOAP4GDRKp2QyCsnBg2pNxLvvjNJ7KRpk`, // Assuming token is stored in localStorage
        },
        body: JSON.stringify({}),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch BOM data')
      }

      const data = await response.json()
      return data
    },
    staleTime: Infinity,
  })
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (data) {
    bomFieldsConfig.forEach((bom, i) => {
      if (bom.label == 'Finished Good Item') {
        bomFieldsConfig[i].options = data.map(item => item.itemName)
      }
    })
  }
  // Categorized array for form fields

  return (
    <PageWapper>
      <PageTitileBar title="BOMs">
        <FormModal
          title="Add New BOM"
          description="Fill in all the details to add a new BOM"
          triggerButtonText="Add New BOM"
          // onSubmit={handleSubmit}
        >
          <DynamicForm
            title="BOM Details"
            fieldConfig={bomFieldsConfig}
            // onSubmit={handleSubmit}
            submitButtonText="Save BOM"
          />
        </FormModal>
      </PageTitileBar>
      {/* <DataTable /> */}
    </PageWapper>
  )
}

export default BOM
