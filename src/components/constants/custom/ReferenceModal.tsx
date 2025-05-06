import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { PendingTable } from './Table/PendingTable'
import { fetchPendingFromDB } from '@/apiService/services'
import { useAtomValue } from 'jotai'
import { selectedSupplierAtom } from '../../../../jotai/jotaiStore'
import { selectedCustomerAtom } from '../../../../jotai/jotaiStore';

interface ReferenceModalProps {
    title: string
    description: string
    Trigger?: any
    open: boolean
    setOpen: (values: boolean) => void
    referenceId: string | number | null
}

export function ReferenceModal({ title, description, Trigger, open, setOpen, referenceId }: ReferenceModalProps) {
    const selectedSupplier = useAtomValue(selectedSupplierAtom)
    const selectedCustomer = useAtomValue(selectedCustomerAtom)
    const [pendingTransactions, setPendingTransactions] = useState([])

    const FetchPendingTransactionDetail = async () => {
        try {
            console.log(referenceId, selectedCustomer, selectedSupplier)
            const res = await fetchPendingFromDB(referenceId, selectedCustomer, selectedSupplier)
            if (res) {
                setPendingTransactions(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        FetchPendingTransactionDetail()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCustomer, selectedSupplier, referenceId])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {Trigger && React.cloneElement(Trigger, { onClick: () => setOpen(true) })}
            </DialogTrigger>
            <DialogContent className="sm:max-w-screen-xl max-h-[90vh] overflow-y-auto">
                <div>
                    <DialogHeader>
                        <DialogTitle className='text-center'>{title}</DialogTitle>
                        <DialogDescription className='text-center'>{description}</DialogDescription>
                    </DialogHeader>

                    <PendingTable data={pendingTransactions} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
