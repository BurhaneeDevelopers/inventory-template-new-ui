import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { DataTable } from '@/components/constants/DataTable'
import PageTitileBar from '@/components/constants/layout/PageTitileBar'
import PageWapper from '@/components/constants/layout/PageWapper'
import commonFieldsConfig from './CommonConfig'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { apiService } from '../../apiService/apiService'
import { Row } from '../Sales-Enquiry/Creation'
import { useSetAtom } from 'jotai'
import { pathAtom } from '../../../jotai/jotaiStore'

const columns: ColumnDef<Row>[] = commonFieldsConfig.map(field => ({
    accessorKey: field.id,
    header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            {field.label}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: ({ row }) => <div>{row.getValue(field.id)}</div>,
}))

const commonTypes = [
    {
        label: "Season Master",
        value: 1
    },
    {
        label: "Part Name Master",
        value: 2
    },
    {
        label: "Product Type",
        value: 3
    },
    {
        label: "Color Master",
        value: 4
    },
]

const Common = () => {
    const [data, setData] = useState([])
    const [activeType, setActiveType] = useState(4)
    const setEditPath = useSetAtom(pathAtom)

    const fetchDataFromDB = async () => {
        try {
            const response = await apiService.post(apiService.v1 + '/common-master/get-all', { masterType: activeType })
            console.log(response)

            if (response) {
                setData(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const createCsutomerInDb = async (values: { [key: string]: string | number | boolean }) => {
        try {
            console.log(values)
            const response = await apiService.post(apiService.v1 + '/common-master/save', values)

            return response
        } catch (error) {
            console.log(error)
        }
    }

    const handleManipulateDropdown = async () => {
        try {
            commonFieldsConfig.forEach((field, i) => {
                if (field.id == 'masterType') {
                    commonFieldsConfig[i].options = commonTypes.map(item => ({ label: item.label, value: item.value }))
                }
            })
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchDataFromDB()
    }, [activeType])


    useEffect(() => {
        handleManipulateDropdown()
        setEditPath("/common-master")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <PageWapper>
            <PageTitileBar title="Common Masters">
                <FormModal
                    title="Common Masters"
                    description="Fill in all the details"
                    triggerButtonText="Add"
                // onSubmit={handleSubmit}
                >
                    <DynamicForm
                        title="Common Details"
                        fieldConfig={commonFieldsConfig}
                        handleSubmit={createCsutomerInDb}
                        fetchDataAfterSubmit={fetchDataFromDB}
                        submitButtonText="Save"
                    />
                </FormModal>
            </PageTitileBar>

            <div className='flex justify-between'>
                {commonTypes.map((item) => {
                    return <CommonButtons value={item.value} title={item.label} activeType={activeType} setActiveType={setActiveType} />
                })}
            </div>
            <DataTable data={data} columns={columns} fieldConfig={commonFieldsConfig} setData={setData} />
        </PageWapper>
    )
}

export default Common

const CommonButtons = ({ value, title, activeType, setActiveType }) => {
    return (
        <button
            onClick={() => setActiveType(value)}
            className={`flex-grow text-center capitalize p-2 transition-colors duration-200 cursor-pointer border border-gray-200 ${activeType === value ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-800'
                }`}
        >
            {title}
        </button>
    )
}