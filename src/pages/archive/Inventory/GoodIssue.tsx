import { DataTable } from '@/components/constants/DataTable'
import Container from '@/components/constants/layout/Container'
import Tabs from '@/components/Inventory/Tabs'
import { CreateReceiptModal } from '@/components/order-enquiry/blocks/CreateReceiptModal'

function GoodsIssue() {
  return (
    <Container className="">
      <Tabs />

      <div className="bg-white shadow-md mt-7 flex flex-col gap-4 p-3 px-5">
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-2xl font-medium text-zinc-700 uppercase">Good Issue</h1>
          <CreateReceiptModal />
        </div>

        <DataTable />
      </div>
    </Container>
  )
}

export default GoodsIssue
