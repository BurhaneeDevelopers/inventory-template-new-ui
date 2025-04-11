import { ChartAreaInteractive } from '@/components/blocks/ChartAreaInteractive'
import { SectionCards } from '@/components/blocks/SectionCards'
import { DataTable } from '@/components/constants/DataTable'
import Container from '@/components/constants/layout/Container'
import data from '../../../../data.json'

const Reports = () => {
  return (
    <Container className="">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6 flex flex-col gap-4">
            <ChartAreaInteractive />

            <div className="bg-white p-4 rounded-xl shadow-xl">
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Reports
