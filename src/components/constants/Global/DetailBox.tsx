import React from 'react'
import { DynamicForm } from '../custom/DynamicForm'

interface DetailBoxProps {
    detailConfig: any // Replace 'any' with a more specific type if available
    onPress: (formData: any) => void
    totalTax?: string | number | null
    totalPrice?: string | number | null
    grandTotal?: string | number | null
}

const DetailBox: React.FC<DetailBoxProps> = ({
    totalTax,
    totalPrice,
    grandTotal,
    detailConfig, onPress
}) => {

    return (
        <div className="flex flex-col justify-between gap-4 bg-white p-4 rounded-lg flex-grow">
            {/* <h1 className="text-2xl font-medium text-zinc-700 uppercase">
                Details
            </h1> */}

            <DynamicForm
                title={"Details"}
                fieldConfig={detailConfig}
                onSubmit={onPress}
                submitButtonText="Add Item"
                isTransaction={true}
                isSaveBottom={true}
                totalTax={totalTax}
                totalPrice={totalPrice}
                grandTotal={grandTotal}
            />
        </div>
    )
}

export default DetailBox
