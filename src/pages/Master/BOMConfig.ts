import * as Yup from 'yup'
import { FieldConfig } from './ItemsConfig'

const bomFieldsConfig: FieldConfig[] = [
  {
    id: 'bomName',
    label: 'BOM Name',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('BOM Name is required'),
  },
  {
    id: 'itemId',
    label: 'Finished Good Item',
    type: 'select',
    required: true,
    options: [], // Should be populated from API with FG items
    initialValue: '',
    validation: Yup.string().required('Finished Good Item is required'),
  },
  {
    id: 'designId',
    label: 'Design',
    type: 'select',
    required: true,
    options: [], // Should be populated from API with designs
    initialValue: '',
    validation: Yup.string().required('Design is required'),
  },
  {
    id: 'sizes',
    label: 'Sizes',
    type: 'select',
    required: true,
    options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom'],
    initialValue: '',
    validation: Yup.string().required('Size is required'),
  },
  {
    id: 'category',
    label: 'Category',
    type: 'select',
    required: true,
    options: [], // Should be populated from API
    initialValue: '',
    validation: Yup.string().required('Category is required'),
  },
  {
    id: 'season',
    label: 'Season',
    type: 'select',
    required: true,
    options: ['Spring/Summer', 'Fall/Winter', 'All Season', 'Holiday', 'Custom'],
    initialValue: '',
    validation: Yup.string().required('Season is required'),
  },
  {
    id: 'artName',
    label: 'Art Name',
    type: 'text',
    required: false,
    initialValue: '',
    validation: Yup.string(),
  },
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: ['Active', 'Inactive'],
    initialValue: 'Active',
    validation: Yup.string().required('Status is required'),
  },
  {
    id: 'approvalStatus',
    label: 'Approval Status',
    type: 'select',
    required: true,
    options: ['Draft', 'Pending Approval', 'Approved', 'Rejected', 'Revised'],
    initialValue: 'Draft',
    validation: Yup.string().required('Approval Status is required'),
  },
  {
    id: 'approver',
    label: 'Approver',
    type: 'select',
    required: true,
    options: [], // Should be populated from API with users who can approve
    initialValue: '',
    validation: Yup.string().required('Approver is required'),
  },
]

// Configuration for BOM Detail items that would be used in a nested form
const bomDetailFieldsConfig: FieldConfig[] = [
  {
    id: 'itemId',
    label: 'Material Item',
    type: 'select',
    required: true,
    options: [], // Should be populated from API with RM, Yarn, Trim, SFG items
    initialValue: '',
    validation: Yup.string().required('Material Item is required'),
  },
  {
    id: 'inputQty',
    label: 'Input Qty (Cons)',
    type: 'number',
    required: true,
    initialValue: '',
    validation: Yup.number()
      .positive('Input Qty must be positive')
      .required('Input Qty is required'),
  },
  {
    id: 'inputQtyUOM',
    label: 'Unit of Measurement',
    type: 'select',
    required: true,
    options: ['Piece', 'Kg', 'Meter', 'Liter', 'Box', 'Pair', 'Yard'],
    initialValue: '',
    validation: Yup.string().required('Unit of Measurement is required'),
  },
  {
    id: 'rejectionPercentage',
    label: 'Rejection Percentage',
    type: 'number',
    required: false,
    initialValue: 0,
    validation: Yup.number()
      .min(0, 'Rejection % must be non-negative')
      .max(100, 'Rejection % cannot exceed 100'),
  },
  {
    id: 'wastagePercentage',
    label: 'Wastage Percentage',
    type: 'number',
    required: false,
    initialValue: 0,
    validation: Yup.number()
      .min(0, 'Wastage % must be non-negative')
      .max(100, 'Wastage % cannot exceed 100'),
  },
  {
    id: 'itemPosition',
    label: 'Position',
    type: 'text',
    required: false,
    initialValue: '',
    validation: Yup.string(),
  },
  {
    id: 'remarks',
    label: 'Remarks',
    type: 'text',
    required: false,
    initialValue: '',
    validation: Yup.string(),
  },
]

export { bomFieldsConfig, bomDetailFieldsConfig }
export default bomFieldsConfig
