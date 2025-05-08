import { FieldConfig } from '@/pages/Master/ItemsConfig'
import * as Yup from 'yup'

// Helper functions to generate initialValues and validationSchema
export const generateInitialValues = (
  fieldConfig: FieldConfig[] = [],
  initialFields: any
) => {
  // const initialValues: Record<string, string | number | boolean> = { initialFields }
  const initialValues: Record<string, string | number | boolean> = {}

  // if initialFields is present then insert the values in the initialValues object
  if (initialFields) {
    fieldConfig.forEach(field => {
      initialValues[field.id] = initialFields[field.id].initialValue
    })
  } else {
    fieldConfig.forEach(field => {
      initialValues[field.id] = field.initialValue
    })
  }
  return initialValues
}

export const generateValidationSchema = (fieldConfig: FieldConfig[] = []) => {
  const schemaObj: Record<string, Yup.AnySchema> = {}
  fieldConfig.forEach(field => {
    schemaObj[field.id] = field.validation
  })
  return Yup.object(schemaObj)
}
