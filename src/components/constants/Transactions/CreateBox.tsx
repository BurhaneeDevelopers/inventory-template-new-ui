import React, { useEffect } from 'react'
import { createTransactionInDb } from '@/apiService/services';
import DetailBox from '../Global/DetailBox';
import { TransactionDetailsConfig, TransactionMasterConfig } from '@/pages/Global/TransactionConfig';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Item } from '@/pages/Sales-Enquiry/Creation';
import MasterBox from '../Global/MasterBox';

const CreateBox = ({ setActiveTab, items, setItems, fetchData, type, title }) => {

    const handleAddItem = (newItem: Item) => {
        setItems(prev => [...prev, { ...newItem, sourceReferenceID: null }])
    }

    const handleDeleteItem = (index: number) => {
        setItems(prev => prev.filter((_, i) => i !== index))
    }

    const totalTaxAmount = items.reduce((sum, item) => sum + Number(item.taxAmount || 0), 0)
    const totalPrice = items.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0)

    const manipulateTotalPrices = () => {
        TransactionMasterConfig.forEach((field, i) => {
            switch (field.id) {
                case 'itemSubTotal':
                    TransactionMasterConfig[i].initialValue = totalPrice
                    break;

                case 'totalTaxAmount':
                    TransactionMasterConfig[i].initialValue = totalTaxAmount
                    break;

                case 'grandTotal':
                    TransactionMasterConfig[i].initialValue = totalPrice + totalTaxAmount
                    break;

                default:
                    // Do nothing
                    break;
            }
        }
        )
        // TransactionMasterConfig["itemSubTotal"].initialValue = totalPrice
        // TransactionMasterConfig["totalTaxAmount"].initialValue = totalPrice
        // TransactionMasterConfig["grandTotal"].initialValue = totalPrice + totalTaxAmount
    }

    useEffect(() => {
        manipulateTotalPrices()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalPrice, totalTaxAmount])

    return (
        <div className="flex flex-col gap-7">
            <MasterBox
                title={title}
                masterConfig={TransactionMasterConfig}
                onPress={(values) => {
                    const payload = {
                        ...values,
                        transactionType: type
                    }

                    createTransactionInDb(payload, items, setActiveTab, fetchData);
                }}
                fetchData={fetchData}
                disabled={items.length === 0}
            />
            <DetailBox detailConfig={TransactionDetailsConfig} onPress={handleAddItem} />

            <div className="">
                {items.length > 0 && (
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
                                {items.map((item, index) => (
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
            </div>
        </div>
    )
}

export default CreateBox