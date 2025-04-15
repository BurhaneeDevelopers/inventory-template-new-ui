import React from 'react'
import Container from './Container'
import { DataTable } from '../DataTable'
import { FormModal } from '../custom/FormModal'

const Page = ({ title, formik, categorizedArray }: { title: string }) => {
    return (
        <Container className="">
            {/* <Tabs /> */}

            <div className="bg-white shadow-md mt-7 flex flex-col gap-4 p-3 px-5">
                <div className="flex justify-between items-center gap-4">
                    <h1 className="text-2xl font-medium text-zinc-700 uppercase">
                        {title}
                    </h1>
                    <FormModal formik={formik} categorizedArray={categorizedArray} />
                </div>

                <DataTable />
            </div>
        </Container>
    )
}

export default Page