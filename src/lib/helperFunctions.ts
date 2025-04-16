import { FieldConfig } from '@/pages/Master/ItemsConfig'
import * as Yup from 'yup'

// Helper functions to generate initialValues and validationSchema
export const generateInitialValues = (fieldConfig: FieldConfig[] = []) => {
  const initialValues: Record<string, string | number | boolean> = { id: '' }
  fieldConfig.forEach(field => {
    initialValues[field.id] = field.initialValue
  })
  return initialValues
}

export const generateValidationSchema = (fieldConfig: FieldConfig[] = []) => {
  const schemaObj: Record<string, Yup.AnySchema> = {}
  fieldConfig.forEach(field => {
    schemaObj[field.id] = field.validation
  })
  return Yup.object(schemaObj)
}
