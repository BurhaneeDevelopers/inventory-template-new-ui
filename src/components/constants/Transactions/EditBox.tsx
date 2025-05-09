import React, { useEffect } from 'react'
import { fetchSeasonsFromDB, fetchDesignFromDB, updateTransactionInDb } from '@/apiService/services';
import DetailBox from '../Global/DetailBox';
import { TransactionDetailsConfig, TransactionMasterConfig } from '@/pages/Global/TransactionConfig';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Item } from '@/pages/Sales-Enquiry/Creation';
import MasterBox from '../Global/MasterBox';
import { useAtom, useAtomValue } from 'jotai';
import { editRowAtom, selectedDetailsAtom } from '../../../../jotai/jotaiStore';
import EditBoxTable from './EditBoxTable';
import moment from 'moment';

type EditBoxProps = {
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    transaction: any[]; // Ideally replace `any` with a specific type if you know the item shape
    setTransaction: React.Dispatch<React.SetStateAction<any[]>>; // Also update if items are more specifically typed
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>; // Also update if items are more specifically typed
    fetchData: () => void | Promise<void>;
    title: string;
    additionalMasterConfig?: Record<string, any>; // Optional, replace with proper type if known
    unnecessaryMasterConfig?: Record<string, any>; // Optional, replace with proper type if known
};

const EditBox: React.FC<EditBoxProps> = ({
    setActiveTab,
    transaction,
    setTransaction,
    setIsEditing,
    fetchData, title,
    additionalMasterConfig,
    unnecessaryMasterConfig
}) => {
    // to remove particular extra config, and to add additional new config 
    const updatedMasterConfig = [
        // Remove unnecessary fields by matching their `id`
        ...TransactionMasterConfig.filter(
            field =>
                !(
                    Array.isArray(unnecessaryMasterConfig) &&
                    unnecessaryMasterConfig.some(cfg => cfg.id === field.id)
                )
        ),

        // Add additional fields if their `id` doesn't already exist in the original config
        ...(Array.isArray(additionalMasterConfig)
            ? additionalMasterConfig.filter(
                newField =>
                    !TransactionMasterConfig.some(field => field.id === newField.id)
            )
            : []),
    ];

    const selectedDetails = useAtomValue(selectedDetailsAtom)

    const [editRow] = useAtom(editRowAtom)

    const handleAddItem = (newItem: Item) => {
        setTransaction(prev => ({
            ...prev,
            detail: [...prev.detail, { ...newItem, sourceReferenceID: null }],
        }));
    };

    const handleDeleteItem = (index: number) => {
        setTransaction(prev => ({
            ...prev,
            detail: prev.detail.filter((_, i) => i !== index),
        }));
    };

    const totalTax = transaction.detail.reduce((sum, item) => sum + Number(item.taxAmount || 0), 0)
    const totalPrice = transaction.detail.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0)
    const grandTotal = totalPrice + totalTax

    useEffect(() => {
        updatedMasterConfig.forEach(async (field, i) => {
            if (
                field.id === "designId" &&
                field.options.length === 0
            ) {
                var designs = await fetchDesignFromDB()
            }
            if (
                field.id === "seasonId" &&
                field.options.length === 0
            ) {
                var seasons = await fetchSeasonsFromDB()
            }

            switch (field.id) {

                case 'seasonId':
                    if (seasons) {
                        updatedMasterConfig[i].options = seasons.map((item: { name: string, id: number }) => ({
                            label: item.name,
                            value: item.id,
                        }));
                    }
                    break;

                case 'designId':
                    if (designs) {
                        updatedMasterConfig[i].options = designs.map((item: { designName: string, id: number }) => ({
                            label: item.designName,
                            value: item.id,
                        }));
                    }
                    break;

                default:
                    // Do nothing
                    break;
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        if (selectedDetails.length !== 0) {
            setTransaction(selectedDetails)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDetails])
    return (
        <div className="flex flex-col gap-7">
            <MasterBox title={title ? title : 'Edit'}
                masterConfig={updatedMasterConfig}
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
                totalPrice={totalPrice}
                totalTax={totalTax}
                grandTotal={grandTotal}
            />
            <DetailBox detailConfig={TransactionDetailsConfig} onPress={handleAddItem} />

            <EditBoxTable
                transaction={transaction}
                setTransaction={setTransaction}
                handleDeleteItem={handleDeleteItem}
                totalPrice={totalPrice}
                totalTax={totalTax}
                grandTotal={grandTotal}
            />
        </div>
    )
}

export default EditBox