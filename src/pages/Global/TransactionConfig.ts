import { FieldConfig } from '@/pages/Master/ItemsConfig'
import * as Yup from 'yup'

export const TransactionMasterConfig: FieldConfig[] = [
  {
    id: 'transactionType',
    label: 'Transaction Type',
    type: 'text',
    required: false,
    initialValue: '',
    validation: Yup.string(),
    readOnly: true,
    hidden: true,
    notToBeShown: true
  },
  {
    id: 'transactionNumber',
    label: 'Transaction Number',
    type: 'text',
    required: false,
    initialValue: '',
    validation: Yup.string(),
    notToBeSent: true
  },
  {
    id: 'customerID',
    label: 'Customer',
    type: 'select',
    required: false,
    options: [],
    initialValue: null,
    notToBeShown: true
  },
  {
    id: 'customerName',
    label: 'Customer Name',
    type: 'select',
    required: false,
    options: [],
    initialValue: null,
    notToBeSent: true
  },
  {
    id: 'supplierID',
    label: 'Supplier',
    type: 'select',
    required: false,
    options: [],
    initialValue: null,
    notToBeShown: true
  },
  {
    id: 'supplierName',
    label: 'Supplier Name',
    type: 'select',
    required: false,
    options: [],
    initialValue: null,
    notToBeSent: true
  },
  {
    id: 'referenceID',
    label: 'Reference',
    type: 'select',
    required: false,
    initialValue: '',
    validation: Yup.string(),
    options: [],
    notToBeShown: true
  },
  {
    id: 'transactionDate',
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
    validation: Yup.string().required('Status is required'),
  },
  {
    id: 'madeBy',
    label: 'Made By',
    type: 'select',
    required: false,
    options: [],
    initialValue: '',
    validation: Yup.string(),
    notToBeShown: true
  },
  {
    id: 'madeByName',
    label: 'Made By',
    type: 'select',
    required: false,
    options: [],
    initialValue: '',
    validation: Yup.string(),
    notToBeSent: true
  },
  {
    id: 'approvedBy',
    label: 'Approved By',
    type: 'select',
    required: false,
    options: [],
    initialValue: null,
    notToBeShown: true
  },
  {
    id: 'approvedByName',
    label: 'Approved By',
    type: 'select',
    required: false,
    options: [],
    initialValue: null,
    notToBeSent: true
  },
  {
    id: 'remarks',
    label: 'Remarks',
    type: 'textarea',
    required: false,
    initialValue: '',
    validation: Yup.string()
  },
]

export const TransactionDetailsConfig: FieldConfig[] = [
  {
    id: 'itemId',
    label: 'Item',
    type: 'select',
    required: true,
    options: [],
    initialValue: '',
    validation: Yup.string().required('Item is required'),
  },
  {
    id: 'itemDescription',
    label: 'Item Description',
    type: 'textarea',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Item Description is required'),
  },
  {
    id: 'quantity',
    label: 'Quantity',
    type: 'number',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Quantity is required'),
  },
  {
    id: 'unitOfMeasure',
    label: 'UOM',
    type: 'select',
    required: false,
    options: ['KG', 'Box'],
    initialValue: 'KG',
    validation: Yup.string(),
  },
  {
    id: 'unitPrice',
    label: 'Unit Price',
    type: 'number',
    required: false,
    initialValue: '',
    validation: Yup.string(),
  },
  {
    id: 'discountPercentage',
    label: 'Discount Percentage',
    type: 'text',
    required: false,
    initialValue: '0',
    validation: Yup.string(),
  },
  {
    id: 'taxPercentage',
    label: 'Tax Percentage',
    type: 'select',
    required: false,
    options: ['10', '12', '18', '22'],
    initialValue: '18',
    validation: Yup.string(),
  },
  {
    id: 'taxAmount',
    label: 'Tax Amount',
    type: 'number',
    required: false,
    initialValue: 0,
    readOnly: true
  },
  {
    id: 'totalPrice',
    label: 'Amount',
    type: 'number',
    required: false,
    initialValue: 0,
    readOnly: true
  },
  {
    id: 'deliveryDate',
    label: 'Delivery Date',
    type: 'date',
    required: false,
    initialValue: '',
    validation: Yup.date(),
  },
  {
    id: 'lotNumber',
    label: 'Lot Number',
    type: 'text',
    required: false,
    initialValue: '',
    validation: Yup.string(),
  },
  // {
  //   id: 'sourceReferenceID',
  //   label: 'Source Reference',
  //   type: 'text',
  //   required: false,
  //   initialValue: '',
  //   validation: Yup.string(),
  // },
]
