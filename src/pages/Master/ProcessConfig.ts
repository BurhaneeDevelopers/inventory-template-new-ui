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
    id: 'inputQty',
    label: 'Input Quantity',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Input Quantity is required'),
  },
  {
    id: 'inputUOM',
    label: 'Input UOM',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Input UOM is required'),
  },
  {
    id: 'outputQty',
    label: 'Output Quantity',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Output Quantity is required'),
  },
  {
    id: 'outputUOM',
    label: 'Output UOM',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Output UOM is required'),
  },
  {
    id: 'cycleTimePerUnit',
    label: 'Cycle Time Per Unit (in Mins)',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Cycle Time Per Unit is required'),
  },
  {
    id: 'processWastage',
    label: 'Process Wastage (%)',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('This Field is required'),
  },
  {
    id: 'machineId',
    label: 'Machine Id',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Machine Id is required'),
  },
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    required: false,
    options: ['Active', 'InActive'],
    initialValue: 'Active',
    validation: Yup.string().required('Status is required'),
  },
]

export default processFieldsConfig
