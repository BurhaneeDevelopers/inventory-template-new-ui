import * as Yup from 'yup'
import { FieldConfig } from './ItemsConfig'

const processFieldsConfig: FieldConfig[] = [
  {
    id: 'processName',
    label: 'Process Name',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Process Name is required'),
  },
  {
    id: 'processDescription',
    label: 'Process Description',
    type: 'textarea',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Process Description is required'),
  },
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: ['Active', 'InActive'],
    initialValue: 'Active',
    validation: Yup.string().required('Status is required'),
  },
]

export default processFieldsConfig
