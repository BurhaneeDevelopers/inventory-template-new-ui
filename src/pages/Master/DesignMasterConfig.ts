import * as Yup from 'yup'
import { FieldConfig } from './ItemsConfig'

const designMasterFieldsConfig: FieldConfig[] = [
  {
    id: 'designName',
    label: 'Design Name',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Design Name is required'),
  },
  {
    id: 'designType',
    label: 'Design Type',
    type: 'select',
    required: true,
    options: ['Sticker', 'Printed'],
    initialValue: 'Sticker',
    validation: Yup.string().required('Please choose the design type'),
  },
  {
    id: 'creationDate',
    label: 'Creation Date',
    type: 'date',
    required: false,
    initialValue: '',
    validation: Yup.string()
  },
  {
    id: 'designOwner',
    label: 'Design Owner (Self/Customer)',
    type: 'select',
    required: true,
    options: ['Self', 'Customer'],
    initialValue: 'Self',
    validation: Yup.string().required('Please choose a option'),
  },
  {
    id: 'technicalSpecifications',
    label: 'Technical Specifications',
    type: 'textarea',
    required: false,
    initialValue: '',
    validation: Yup.string(),
  },
  {
    id: 'designFiles',
    label: 'Design Files',
    type: 'file',
    required: false,
    initialValue: '',
    validation: Yup.string()
  },
  {
    id: 'customerID',
    label: 'Customer Id',
    type: 'select',
    required: true,
    initialValue: '',
    options: [],
    validation: Yup.string().required('customer Id is required'),
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
  {
    id: 'artName',
    label: 'Art Name',
    type: 'text',
    required: false,
    initialValue: '',
    validation: Yup.string()
  },
]

export default designMasterFieldsConfig
