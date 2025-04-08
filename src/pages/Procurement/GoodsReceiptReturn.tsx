import { DataTable } from '@/components/constants/DataTable'
import Container from '@/components/constants/layout/Container'
import { CreateReceiptModal } from '@/components/order-enquiry/blocks/CreateReceiptModal'
import Tabs from '@/components/procurement/blocks/modals/Tabs'

function GoodsReceiptReturn() {
  return (
    <Container className="">
      <Tabs />

      <div className="bg-white shadow-md mt-7 flex flex-col gap-4 p-3 px-5">
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-2xl font-medium text-zinc-700 uppercase">Goods Receipt Return</h1>
          <CreateReceiptModal />
        </div>

        <DataTable />
      </div>
    </Container>
  )
}

export default GoodsReceiptReturn
