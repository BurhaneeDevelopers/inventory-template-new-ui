import * as Yup from 'yup'
import { FieldConfig } from './ItemsConfig'

const machineFieldsConfig: FieldConfig[] = [
  {
    id: 'machineName',
    label: 'Machine Name',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Machine Type is required'),
  },
  {
    id: 'machineType',
    label: 'Machine Type',
    type: 'select',
    required: true,
    options: ['Production', 'Packaging', 'Testing', 'Utility', 'Other'],
    initialValue: '',
    validation: Yup.string().required('Machine Type is required'),
  },
  {
    id: 'location',
    label: 'Location',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Location is required'),
  },
  {
    id: 'purchaseDate',
    label: 'Purchase Date',
    type: 'date',
    required: true,
    initialValue: '',
    validation: Yup.date().required('Purchase Date is required'),
  },
  {
    id: 'installationDate',
    label: 'Installation Date',
    type: 'date',
    required: true,
    initialValue: '',
    validation: Yup.date().required('Installation Date is required'),
  },
  {
    id: 'modelNumber',
    label: 'Model Number',
    type: 'text',
    required: false,
    initialValue: '',
    validation: Yup.string()
  },
  {
    id: 'serialNumber',
    label: 'Serial Number',
    type: 'text',
    required: false,
    initialValue: '',
    validation: Yup.string()
  },
  {
    id: 'manufacturer',
    label: 'Manufacturer',
    type: 'text',
    required: false,
    initialValue: '',
    validation: Yup.string()
  },
  {
    id: 'dimensionSpecifications',
    label: 'Dimension Specifications',
    type: 'textarea',
    required: false,
    initialValue: '',
    validation: Yup.string(),
  },
  {
    id: 'technicalParameters',
    label: 'Technical Parameters',
    type: 'textarea',
    required: false,
    initialValue: '',
    validation: Yup.string(),
  },
  {
    id: 'currentStatus',
    label: 'Current Status',
    type: 'select',
    required: true,
    options: ['Active', 'Inactive', 'Under Maintenance', 'Decommissioned'],
    initialValue: 'Active',
    validation: Yup.string().required('Current Status is required'),
  },
]

export default machineFieldsConfig
