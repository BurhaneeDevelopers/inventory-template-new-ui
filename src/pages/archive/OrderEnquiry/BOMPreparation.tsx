import { DataTable } from '@/components/constants/DataTable'
import Container from '@/components/constants/layout/Container'
import { CreateBOMModal } from '@/components/order-enquiry/blocks/Modals/CreateBOMModal'
import Tabs from '@/components/order-enquiry/constants/Tabs'

function BOMPreparation() {
  return (
    <Container className="">
      <Tabs />

      <div className="bg-white shadow-md mt-7 flex flex-col gap-4 p-3 px-5">
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-2xl font-medium text-zinc-700 uppercase">Bill of Material</h1>
          <CreateBOMModal />
        </div>

        <DataTable />
      </div>
    </Container>
  )
}

export default BOMPreparation
