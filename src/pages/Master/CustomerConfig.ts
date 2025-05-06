import * as Yup from 'yup'
import { FieldConfig } from './ItemsConfig'

const customerFieldsConfig: FieldConfig[] = [
  {
    id: 'customer_Name',
    label: 'Customer Name',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Customer Name is required'),
  },
  {
    id: 'contactPerson',
    label: 'Contact Person',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Contact Person is required'),
  },
  {
    id: 'contactPhoneNumber',
    label: 'Contact Phone Number',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Contact Phone Number is required'),
  },
  {
    id: 'contactEmail',
    label: 'Contact Email Address',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().email('Invalid email address').required('Email is required'),
  },
  {
    id: 'billingAddress',
    label: 'Billing Address',
    type: 'textarea',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Billing Address is required'),
  },
  {
    id: 'shippingAddress',
    label: 'Shipping Address(es)',
    type: 'textarea',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Shipping Address is required'),
  },
  {
    id: 'customerCategory',
    label: 'Customer Category',
    type: 'select',
    required: false,
    options: ['Retail', 'Wholesale', 'Corporate', 'Government', 'Other'],
    initialValue: '',
    validation: Yup.string()
  },
  {
    id: 'currency',
    label: 'Currency',
    type: 'select',
    required: false,
    options: [],
    initialValue: '',
    validation: Yup.string()
  },
  {
    id: 'taxInformation',
    label: 'Tax Information (GST/VAT)',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Tax Information is required'),
  },
  {
    id: 'customerSince',
    label: 'Customer Since',
    type: 'date',
    required: true,
    initialValue: '',
    validation: Yup.date().required('Customer Since date is required'),
  },
  {
    id: 'shortCode',
    label: 'Short Code',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Banking Details is required'),
  },
  {
    id: 'bankingDetails',
    label: 'Banking Details',
    type: 'textarea',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Banking Details is required'),
  },
]

export default customerFieldsConfig
