import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TransactionDetailsConfig } from '@/pages/Global/TransactionConfig'
import { Edit, Trash2, Check } from 'lucide-react'

const CreateBoxTable = ({ items, setItems, handleDeleteItem, totalTax, totalPrice, grandTotal }) => {
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [editedValues, setEditedValues] = useState({ quantity: '', unitPrice: '' })

    const handleEditClick = (index: number) => {
        setEditIndex(index)
        setEditedValues({
            quantity: items[index]?.quantity ?? '',
            unitPrice: items[index]?.unitPrice ?? '',
        })
    }

    const handleInputChange = (field: string, value: string) => {
        setEditedValues(prev => ({ ...prev, [field]: value }))
    }

    const handleSave = () => {
        if (editIndex === null) return;

        const updatedItems = [...items];
        const currentItem = updatedItems[editIndex];

        const quantity = Number(editedValues.quantity);
        const unitPrice = Number(editedValues.unitPrice);
        const discountPercentage = Number(currentItem.discountPercentage || 0);
        const taxPercentage = Number(currentItem.taxPercentage || 0);

        // Step 1: Calculate base price
        const price = quantity * unitPrice;

        // Step 2: Calculate discount amount
        const discountAmount = (discountPercentage / 100) * price;

        // Step 3: Price after discount
        const priceAfterDiscount = price - discountAmount;

        // Step 4: Calculate tax
        const taxAmount = discountPercentage
            ? (priceAfterDiscount * (taxPercentage / 100)).toFixed(2)
            : (price * (taxPercentage / 100)).toFixed(2);

        // Step 5: Calculate total price
        const totalPrice = Number(priceAfterDiscount).toFixed(0);

        updatedItems[editIndex] = {
            ...currentItem,
            quantity: quantity,
            unitPrice: unitPrice,
            price,
            discountAmount,
            priceAfterDiscount,
            taxAmount: Number(taxAmount),
            totalPrice: Number(totalPrice),
        };

        setItems(updatedItems);
        setEditIndex(null);
    };


    return (
        <div>
            {items.length > 0 && (
                <div className="bg-white p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Added Items</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {TransactionDetailsConfig.filter(field => field.id !== 'itemId').map(field => (
                                    <TableHead key={field.id}>{field.label}</TableHead>
                                ))}
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow key={index}>
                                    {TransactionDetailsConfig.filter(field => field.id !== 'itemId').map(field => {
                                        const isEditing = index === editIndex
                                        const value = item[field.id]

                                        if (isEditing && (field.id === 'quantity' || field.id === 'unitPrice')) {
                                            return (
                                                <TableCell key={field.id}>
                                                    <Input
                                                        value={editedValues[field.id] ?? ''}
                                                        onChange={(e) =>
                                                            handleInputChange(field.id, e.target.value)
                                                        }
                                                        className="w-24"
                                                    />
                                                </TableCell>
                                            )
                                        } else {
                                            return <TableCell key={field.id}>{value}</TableCell>
                                        }
                                    })}
                                    <TableCell className="space-x-2">
                                        {editIndex === index ? (
                                            <Button size="icon" className="bg-green-600" onClick={handleSave}>
                                                <Check className="w-4 h-4" />
                                            </Button>
                                        ) : (
                                            <Button
                                                size="icon"
                                                className="bg-indigo-500"
                                                onClick={() => handleEditClick(index)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                        )}
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
                    <h4 className="text-base">Total Tax Amount</h4>
                    <h3 className="text-2xl font-medium">{totalTax}</h3>
                </div>
                <div className="flex items-end gap-2">
                    <h4 className="text-base">Total Price:</h4>
                    <h3 className="text-2xl font-medium">{totalPrice}</h3>
                </div>
                <div className="flex items-end gap-2">
                    <h4 className="text-base">Grand Total:</h4>
                    <h3 className="text-2xl font-medium">{grandTotal}</h3>
                </div>
            </div>
        </div>
    )
}

export default CreateBoxTable
