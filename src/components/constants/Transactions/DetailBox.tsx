import React from 'react'
import { DynamicForm } from '../custom/DynamicForm'

interface DetailBoxProps {
    detailConfig: any // Replace 'any' with a more specific type if available
    onPress: (formData: any) => void
}

const DetailBox: React.FC<DetailBoxProps> = ({ detailConfig, onPress }) => {
    return (
        <div className="flex flex-col justify-between gap-4 bg-white p-4 rounded-lg flex-grow">
            <h1 className="text-2xl font-medium text-zinc-700 uppercase">
                Details
            </h1>

            <DynamicForm
                title=""
                fieldConfig={detailConfig}
                onSubmit={onPress}
                submitButtonText="Add Item"
                isTransaction={true}
            />
        </div>
    )
}

export default DetailBox
