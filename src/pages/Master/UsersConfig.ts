import * as Yup from 'yup'
import { FieldConfig } from './ItemsConfig'

const usersFieldsConfig: FieldConfig[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Name is required'),
  },
  {
    id: 'role',
    label: 'Role',
    type: 'select',
    required: true,
    initialValue: 1,
    options: [],
    validation: Yup.string().required('Role is required'),
  },
  {
    id: 'department',
    label: 'Department',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Department Field is required'),
  },
  {
    id: 'designation',
    label: 'Designation',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Designation is required'),
  },
  {
    id: 'contactPhoneNumber',
    label: 'Contact Phone Number',
    type: 'text',
    required: false,
    initialValue: '',
    validation: Yup.string()
  },
  {
    id: 'contactEmail',
    label: 'Contact Email',
    type: 'text',
    required: true,
    initialValue: '',
    validation: Yup.string().required('Email is required'),
  },
  {
    id: 'address',
    label: 'Address',
    type: 'text',
    required: false,
    initialValue: '',
    validation: Yup.string()
  },
  {
    id: 'dateOfBirth',
    label: 'DOB',
    type: 'date',
    required: false,
    initialValue: '',
    validation: Yup.date()
  },
  {
    id: 'dateOfJoining',
    label: 'Date of Joining',
    type: 'date',
    required: false,
    initialValue: '',
    validation: Yup.date()
  },
  // {
  //   id: 'userId',
  //   label: 'User Id',
  //   type: 'text',
  //   required: true,
  //   initialValue: '',
  //   validation: Yup.string().required("User's Id is required"),
  // },
  {
    id: 'emergencyContact',
    label: 'Emergency Contact',
    type: 'text',
    required: false,
    initialValue: '',
    validation: Yup.string(),
  },
  {
    id: 'dateOfLeaving',
    label: 'Date of Leaving',
    type: 'date',
    required: false,
    initialValue: '',
    validation: Yup.date()
  },
]

export default usersFieldsConfig
