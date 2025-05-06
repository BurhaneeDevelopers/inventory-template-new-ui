import PageWapper from '@/components/constants/layout/PageWapper'
import { DataTable } from '@/components/constants/DataTable'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import SubTabs from '@/components/constants/SubTabs'
import { useEffect, useState } from 'react'
import { fetchSingleTransactionForEdit, fetchTransactionsFromDB, handleManipulateDropdown } from '@/apiService/services'
import { TransactionMasterConfig } from '../Global/TransactionConfig'
import { Item, Row, Section } from '../Sales-Enquiry/Creation'
import { editRowAtom, isEditingAtom } from '../../../jotai/jotaiStore'
import { useAtom } from 'jotai'
import EditBox from '@/components/constants/Transactions/EditBox'
import CreateBox from '@/components/constants/Transactions/CreateBox'

// const excludedFields = ['transactionType'];

const columns: ColumnDef<Row>[] = TransactionMasterConfig
    // .filter(field => !excludedFields.includes(field.id))
    .filter(field => !field.notToBeShown)
    .map(field => ({
        accessorKey: field.id,
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                {field.label}
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue(field.id)}</div>,
    }));

const JobCard = () => {
    const [isEditing, setIsEditing] = useAtom(isEditingAtom)
    const [editRow] = useAtom(editRowAtom)
    const [activeTab, setActiveTab] = useState<string>('listing')
    const [items, setItems] = useState<Item[]>([])
    const [data, setData] = useState([])
    const [transaction, setTransaction] = useState(null)

    const sections: Section[] = [
        { title: 'Job Card Listing', key: 'listing' },
        { title: 'Job Card Creation', key: 'creation' },
        ...(isEditing ? [{ title: `Edit Job Card - ${transaction?.transactionNumber}`, key: 'edit' }] : []),
    ]

    useEffect(() => {
        handleManipulateDropdown(14, true, false)
        fetchTransactionsFromDB(14, setData)
    }, [])

    useEffect(() => {
        if (isEditing) {
            fetchSingleTransactionForEdit(editRow.id, setTransaction, setActiveTab)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditing])

    return (
        <PageWapper className="!bg-transparent !shadow-none">
            <SubTabs sections={sections} activeTab={activeTab} onTabChange={setActiveTab} />
            {activeTab === 'listing' && (
                <div className="flex flex-col gap-4 bg-white p-4 rounded-lg h-fit">
                    <h1 className="text-2xl font-medium text-zinc-1400 uppercase">Job Card</h1>

                    <DataTable data={data} columns={columns} />
                </div>
            )}

            {activeTab === 'creation' && (
                <CreateBox
                    title={"Job Card Creation"}
                    setActiveTab={setActiveTab}
                    items={items}
                    setItems={setItems}
                    type={14}
                    fetchData={() => fetchTransactionsFromDB(14, setData)}
                />
            )}

            {activeTab === 'edit' && (
                <EditBox
                    title={`Edit Job Card - ${transaction?.transactionNumber}`}
                    setActiveTab={setActiveTab}
                    transaction={transaction}
                    setTransaction={setTransaction}
                    setIsEditing={setIsEditing}
                    fetchData={() => fetchTransactionsFromDB(14, setData)}
                />
            )}
        </PageWapper>
    )
}

export default JobCard
