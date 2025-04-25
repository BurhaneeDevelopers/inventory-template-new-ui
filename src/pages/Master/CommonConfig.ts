import * as Yup from 'yup'
import { FieldConfig } from './ItemsConfig'

const commonFieldsConfig: FieldConfig[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Name is required'),
  },
  {
    id: 'shortCode',
    label: 'Short Code',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Short Code is required'),
  },
  {
    id: 'masterType',
    label: 'Master Type',
    type: 'select',
    required: true,
    options: [],
    initialValue: '',
    validation: Yup.string().required('Master Type is required'),
  },
]

export default commonFieldsConfig
