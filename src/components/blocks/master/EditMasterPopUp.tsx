import { apiService } from '@/apiService/apiService'
import { DynamicForm } from '@/components/constants/custom/DynamicForm'
import { FormModal } from '@/components/constants/custom/FormModal'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import React, { useState } from 'react'
import { pathAtom } from '../../../../jotai/jotaiStore';
import { useAtomValue } from 'jotai'

interface EditMasterPopUpProps {
    data: any
    fieldConfig: any
    setData?: (values: any) => void
}

const EditMasterPopUp: React.FC<EditMasterPopUpProps> = ({ data, fieldConfig, setData }) => {
    const updatePath = useAtomValue(pathAtom)
    const [localOpen, setLocalOpen] = useState(false)

    const updateData = async (values: any) => {
        try {
            const payload = {
                ...values,
                id: data.id
            }

            const response = await apiService.post(apiService.v1 + `${updatePath}/update`, payload)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDataFromDB = async () => {
        try {
            const response = await apiService.post(apiService.v1 + `${updatePath}/get-all`, {})

            if (response) {
                setData(response)
                return response
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <FormModal
            title={`Edit Data`}
            description="Fill in all the details to create a new inventory item"
            triggerButtonText="Add New Item"
            useGlobalAtom={false} // important
            Trigger={
                <Button className="bg-orange-500">
                    <Edit color="#fff" size={18} />
                </Button>
            }
            localOpen={localOpen}
            setLocalOpen={setLocalOpen}
        >
            <DynamicForm
                initialFields={data}
                title="Edit Details"
                fieldConfig={fieldConfig}
                handleSubmit={updateData}
                fetchDataAfterSubmit={fetchDataFromDB}
                submitButtonText="Update"
                setLocalOpen={setLocalOpen}
            />
        </FormModal>
    )
}

export default EditMasterPopUp
