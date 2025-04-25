import * as Yup from 'yup'

export type FieldType =
  | 'text'
  | 'number'
  | 'textarea'
  | 'select'
  | 'date'
  | 'checkbox'
  | 'file'
  | 'object'

export interface FieldConfig {
  id: string
  label: string
  type: FieldType
  required: boolean
  options?: { value: string | number | null, label: string | number | null }[] | string[]
  initialValue: string | number | boolean | object | null
  validation?: Yup.AnySchema
  readOnly?: boolean
  hidden?: boolean
}

// FOR FORMS
const itemFieldsConfig: FieldConfig[] = [
  {
    id: 'itemType',
    label: 'Item Type',
    type: 'select',
    required: true,
    options: ['Yarn', 'Trim', 'Raw Material', 'Finished Good', 'Semi Finished Good'],
    initialValue: '',
    validation: Yup.string().required('Item Type is required'),
  },
  {
    id: 'itemCode',
    label: 'Item Code',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Item Code is required'),
  },
  {
    id: 'itemName',
    label: 'Item Name',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Item Name is required'),
  },
  {
    id: 'description',
    label: 'Description',
    type: 'textarea',
    required: false,
    initialValue: '',
    validation: Yup.string(),
  },
  {
    id: 'unitOfMeasurement',
    label: 'Unit of Measurement',
    type: 'select',
    required: true,
    options: ['Piece', 'Kg', 'Meter', 'Liter', 'Box', 'Pair'],
    initialValue: '',
    validation: Yup.string().required('Unit of Measurement is required'),
  },
  {
    id: 'basePrice',
    label: 'Base Price',
    type: 'number',
    required: false,
    initialValue: '',
    validation: Yup.number()
      .positive('Base Price must be positive')
  },
  {
    id: 'hsn_sac_code',
    label: 'HSN/SAC Code',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('HSN/SAC Code is required'),
  },
]

export default itemFieldsConfig
