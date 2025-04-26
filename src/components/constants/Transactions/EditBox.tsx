import React from 'react'
import { updateTransactionInDb } from '@/apiService/services';
import DetailBox from './DetailBox';
import { TransactionDetailsConfig, TransactionMasterConfig } from '@/pages/Global/TransactionConfig';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Item } from '@/pages/Sales-Enquiry/Creation';
import MasterBox from './MasterBox';
import { useAtom } from 'jotai';
import { editRowAtom } from '../../../../jotai/jotaiStore';

const EditBox = ({ setActiveTab, transaction, setTransaction, setIsEditing, fetchData }) => {
    const [editRow] = useAtom(editRowAtom)

    const handleAddItem = (newItem: Item) => {
        setTransaction(prev => [...prev, { ...newItem, sourceReferenceID: null }])
    }

    const handleDeleteItem = (index: number) => {
        setTransaction(prev => prev.filter((_, i) => i !== index))
    }

    const totalQuantity = transaction.detail.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
    const totalPrice = transaction.detail.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0)
    return (
        <div className="flex flex-col gap-7">
            <MasterBox title='Edit Purchase Order'
                masterConfig={TransactionMasterConfig}
                onPress={(values) => {
                    const payload = {
                        ...values,
                        id: editRow.id,
                        referenceID: editRow.referenceID
                    }
                    updateTransactionInDb(payload, transaction.detail, setActiveTab, setIsEditing, fetchData);
                }}
                fetchData={fetchData}
                disabled={transaction?.detail.length === 0}
                initialFields={transaction}
            />
            <DetailBox detailConfig={TransactionDetailsConfig} onPress={handleAddItem} />

            <div className="">
                {transaction?.detail.length > 0 && (
                    <div className="bg-white p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Added Items</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {TransactionDetailsConfig.filter(field => field.id !== 'itemId').map(field => (
                                        <TableHead key={field.id}>{field.label}</TableHead>
                                    ))}
                                    {/* <TableHead>Edit</TableHead> */}
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transaction.detail.map((item, index) => (
                                    <TableRow key={index}>
                                        {TransactionDetailsConfig.filter(field => field.id !== 'itemId').map(field => (
                                            <TableCell key={field.id}>{item[field.id]}</TableCell>
                                        ))}
                                        <TableCell className="space-x-4">
                                            <Button size="icon" className="bg-indigo-500">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => handleDeleteItem(index)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}

                <div className="flex flex-row ml-auto p-4 gap-4 bg-white mt-4 w-fit rounded-lg">
                    <div className="flex items-end gap-2">
                        <h4 className="text-base">Total QTY:</h4>
                        <h3 className="text-2xl font-medium">{totalQuantity}</h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <h4 className="text-base">Total Price:</h4>
                        <h3 className="text-2xl font-medium">{totalPrice}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditBox