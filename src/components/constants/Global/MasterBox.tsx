import React, { useEffect } from 'react'
import { DynamicForm } from '../custom/DynamicForm'

interface MasterBoxProps {
    title: string
    masterConfig: any // Replace 'any' with a more specific type if available
    onPress: (formData: any) => void
    fetchData: () => void
    disabled?: boolean
    initialFields?: any
}

const MasterBox: React.FC<MasterBoxProps> = ({ masterConfig, onPress, fetchData, title, disabled, initialFields }) => {
    const filteredFields = masterConfig.filter(field => !field?.notToBeSent)
    
    return (
        <div className="flex flex-col justify-between gap-4 bg-white p-4 rounded-lg flex-grow">
            <h1 className="text-2xl font-medium text-zinc-700 uppercase">
                {title}
            </h1>

            <DynamicForm
                title=""
                fieldConfig={filteredFields}
                handleSubmit={onPress}
                fetchDataAfterSubmit={fetchData}
                submitButtonText="Save Data"
                isTransaction={true}
                initialFields={initialFields}
                disabled={disabled}
            />
        </div>
    )
}

export default MasterBox
