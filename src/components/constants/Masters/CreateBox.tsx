import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Item } from '@/pages/Sales-Enquiry/Creation';
import MasterBox from '../Global/MasterBox';
import DetailBox from '../Global/DetailBox';

const CreateBox = ({ detailConfig, masterConfig, onPress, items, setItems, fetchData, title }) => {

    const handleAddItem = (newItem: Item) => {
        setItems(prev => [...prev, newItem])
    }

    const handleDeleteItem = (index: number) => {
        setItems(prev => prev.filter((_, i) => i !== index))
    }

    const totalQuantity = items.reduce((sum, item) => sum + Number(item.inputQty || 0), 0)
    return (
        <div className="flex flex-col gap-7">
            <MasterBox
                title={title}
                masterConfig={masterConfig}
                onPress={onPress}
                fetchData={fetchData}
                disabled={items.length === 0}
            />
            <DetailBox detailConfig={detailConfig} onPress={handleAddItem} />

            <div className="">
                {items.length > 0 && (
                    <div className="bg-white p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Added Items</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {detailConfig.filter(field => field.id !== 'itemId').map(field => (
                                        <TableHead key={field.id}>{field.label}</TableHead>
                                    ))}
                                    {/* <TableHead>Edit</TableHead> */}
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map((item, index) => (
                                    <TableRow key={index}>
                                        {detailConfig.filter(field => field.id !== 'itemId').map(field => (
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
                    {/* <div className="flex items-end gap-2">
                        <h4 className="text-base">Total Price:</h4>
                        <h3 className="text-2xl font-medium">{totalPrice}</h3>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default CreateBox