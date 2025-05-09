import React, { useEffect } from 'react'
import { createTransactionInDb, fetchDesignFromDB, fetchSeasonsFromDB } from '@/apiService/services';
import DetailBox from '../Global/DetailBox';
import { TransactionDetailsConfig, TransactionMasterConfig } from '@/pages/Global/TransactionConfig';
import { Item } from '@/pages/Sales-Enquiry/Creation';
import MasterBox from '../Global/MasterBox';
import { useAtomValue } from 'jotai';
import { selectedDetailsAtom } from '../../../../jotai/jotaiStore';
import CreateBoxTable from './CreateBoxTable';

const CreateBox = ({ setActiveTab, items, setItems, fetchData, type, title, additionalMasterConfig, unnecessaryMasterConfig }) => {

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

    const handleAddItem = (newItem: Item) => {
        setItems(prev => [...prev, { ...newItem, sourceReferenceID: null }])
    }

    const handleDeleteItem = (index: number) => {
        setItems(prev => prev.filter((_, i) => i !== index))
    }

    const totalTax = items.reduce((sum, item) => sum + Number(item.taxAmount || 0), 0)
    const totalPrice = items.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0)
    const grandTotal = totalPrice + totalTax

    useEffect(() => {
        updatedMasterConfig.forEach(async (field, i) => {

            if (updatedMasterConfig["designId"].options.length === 0) {
                var designs = await fetchDesignFromDB()
            }
            if (updatedMasterConfig["seasonId"].options.length === 0) {
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
            setItems(selectedDetails)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDetails])
    return (
        <div className="flex flex-col gap-7">
            <MasterBox
                title={title}
                masterConfig={updatedMasterConfig}
                onPress={(values) => {
                    const payload = {
                        ...values,
                        transactionType: type
                    }

                    createTransactionInDb(payload, items, setActiveTab, fetchData);
                }}
                fetchData={fetchData}
                disabled={items.length === 0}
                totalPrice={totalPrice} grandTotal={grandTotal} totalTax={totalTax}
            />
            <DetailBox detailConfig={TransactionDetailsConfig} onPress={handleAddItem} />

            <CreateBoxTable items={items} setItems={setItems} handleDeleteItem={handleDeleteItem} totalPrice={totalPrice} totalTax={totalTax} grandTotal={grandTotal} />
        </div>
    )
}

export default CreateBox