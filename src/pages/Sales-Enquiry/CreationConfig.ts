import * as Yup from 'yup'
import { FieldConfig } from '../Master/ItemsConfig'

export const CreationMasterConfig: FieldConfig[] = [
  {
    id: 'TransactionType',
    label: 'Transaction Type',
    type: 'text',
    required: true,
    initialValue: 'Enquiry',
    validation: Yup.string(),
    readOnly: true,
  },
  {
    id: 'TransactionNumber',
    label: 'Enquiry Number',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Enquiry Number is required'),
  },
  {
    id: 'TransactionDate',
    label: 'Transaction Date',
    type: 'date',
    required: true,
    initialValue: '',
    validation: Yup.date().required('Transaction Date is required'),
  },
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: ['Open', 'Approved', 'Close', 'other'],
    initialValue: 'Open',
    validation: Yup.string(),
  },
  {
    id: 'Remarks',
    label: 'Remarks',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Remarks is required'),
  },
]

export const CreationDetailsConfig: FieldConfig[] = [
  {
    id: 'TransactionType',
    label: 'Transaction Type',
    type: 'text',
    required: true,
    initialValue: 'Enquiry',
    validation: Yup.string(),
    readOnly: true,
  },
  {
    id: 'TransactionNumber',
    label: 'Enquiry Number',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Enquiry Number is required'),
  },
  {
    id: 'TransactionDate',
    label: 'Transaction Date',
    type: 'date',
    required: true,
    initialValue: '',
    validation: Yup.date().required('Transaction Date is required'),
  },
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: ['Open', 'Approved', 'Close', 'other'],
    initialValue: 'Open',
    validation: Yup.string(),
  },
  {
    id: 'Remarks',
    label: 'Remarks',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Remarks is required'),
  },
]
