import * as Yup from 'yup'

export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'date' | 'checkbox' | 'file'

export interface FieldConfig {
  id: string
  label: string
  type: FieldType
  required: boolean
  options?: string[]
  initialValue: string | number | boolean
  validation: Yup.AnySchema
  readOnly?: boolean
}

// FOR FORMS
const itemFieldsConfig: FieldConfig[] = [
  {
    id: 'itemType',
    label: 'Item Type',
    type: 'select',
    required: true,
    options: ['Raw Material', 'Finished Good', 'Consumable', 'Service'],
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
    id: 'brand',
    label: 'Brand',
    type: 'text',
    required: false,
    initialValue: '',
    validation: Yup.string(),
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
    id: 'subCategory',
    label: 'Sub Category',
    type: 'select',
    required: false,
    options: [], // Should be populated based on selected category
    initialValue: '',
    validation: Yup.string(),
  },
  {
    id: 'color',
    label: 'Color',
    type: 'text',
    required: false,
    initialValue: '',
    validation: Yup.string(),
  },
  {
    id: 'size',
    label: 'Size',
    type: 'text',
    required: false,
    initialValue: '',
    validation: Yup.string(),
  },
  {
    id: 'itemGroup',
    label: 'Item Group',
    type: 'select',
    required: false,
    options: [], // Should be populated from API
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
    required: true,
    initialValue: '',
    validation: Yup.number()
      .positive('Base Price must be positive')
      .required('Base Price is required'),
  },
  {
    id: 'hsnSacCode',
    label: 'HSN/SAC Code',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('HSN/SAC Code is required'),
  },
  {
    id: 'minimumQuoteQty',
    label: 'Minimum Quote Qty',
    type: 'number',
    required: false,
    initialValue: '',
    validation: Yup.number().min(0, 'Minimum Quote Qty must be non-negative'),
  },
  {
    id: 'minimumStockLevel',
    label: 'Minimum Stock Level',
    type: 'number',
    required: false,
    initialValue: '',
    validation: Yup.number().min(0, 'Minimum Stock Level must be non-negative'),
  },
  {
    id: 'maximumStockLevel',
    label: 'Maximum Stock Level',
    type: 'number',
    required: false,
    initialValue: '',
    validation: Yup.number().min(0, 'Maximum Stock Level must be non-negative'),
  },
  {
    id: 'shelfLife',
    label: 'Shelf Life',
    type: 'text',
    required: false,
    initialValue: '',
    validation: Yup.string(),
  },
  {
    id: 'qualityParameters',
    label: 'Quality Parameters',
    type: 'textarea',
    required: false,
    initialValue: '',
    validation: Yup.string(),
  },
  {
    id: 'barcodeQrCode',
    label: 'Barcode/QR Code',
    type: 'text',
    required: false,
    initialValue: '',
    validation: Yup.string(),
  },
  {
    id: 'storageRequirements',
    label: 'Storage Requirements',
    type: 'textarea',
    required: false,
    initialValue: '',
    validation: Yup.string(),
  },
  {
    id: 'packagingRequirements',
    label: 'Packaging Requirements',
    type: 'textarea',
    required: false,
    initialValue: '',
    validation: Yup.string(),
  },
]

export default itemFieldsConfig
