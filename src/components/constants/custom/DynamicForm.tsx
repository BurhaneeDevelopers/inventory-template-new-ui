import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { type FieldConfig } from '@/pages/Master/ItemsConfig'
import { generateInitialValues, generateValidationSchema } from '@/lib/helperFunctions'
import { toast } from 'sonner'
import { formModalAtom, selectedCustomerAtom, selectedSupplierAtom } from '../../../../jotai/jotaiStore'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { ReferenceModal } from './ReferenceModal'

interface DynamicFormProps {
  title: string
  fieldConfig: FieldConfig[]
  onSubmit?: (values: any) => Promise<unknown>
  handleSubmit?: (values: { [key: string]: string | number | boolean }) => Promise<unknown>
  fetchDataAfterSubmit?: () => void
  initialFields?: { [key: string]: string | number | boolean | undefined }
  submitButtonText?: string
  isTransaction?: boolean
  disabled?: boolean
  setLocalOpen?: (values: boolean) => void
}

export function DynamicForm({
  title,
  fieldConfig,
  onSubmit,
  handleSubmit,
  fetchDataAfterSubmit,
  initialFields,
  submitButtonText = 'Submit',
  isTransaction,
  disabled,
  setLocalOpen,
}: DynamicFormProps) {
  // Formik setup with initialValues and validationSchema
  const [, setOpen] = useAtom(formModalAtom)
  const [openReferenceModal, setOpenReferenceModal] = useState(false)
  const [referenceId, setReferenceId] = useState(null)
  const setSelectedCustomer = useSetAtom(selectedCustomerAtom)
  const setSelectedSupplier = useSetAtom(selectedSupplierAtom)

  const formik = useFormik({
    initialValues: generateInitialValues(fieldConfig, initialFields),
    validationSchema: generateValidationSchema(fieldConfig),
    onSubmit: async values => {
      if (onSubmit) {
        onSubmit(values)
      } else if (handleSubmit) {
        // IF VALUE IS YES THEN IT SHOULD PASS TRUE BOOLEAN VICE VERCA
        const res = await handleSubmit(
          Object.fromEntries(
            Object.entries(values).map(([k, v]) => [
              k,
              v === 'Yes' ? true : v === 'No' ? false : v,
            ]),
          ),
        )

        if (res) {
          if (fetchDataAfterSubmit) {
            fetchDataAfterSubmit()
          }
          setOpen(false)
          setLocalOpen(false)
          toast.success('Task Done Successfully')
        }
      }
    },
  })

  useEffect(() => {
    if (isTransaction) {
      const quantity = Number(formik.values.quantity)
      const unitPrice = Number(formik.values.unitPrice)
      const discountPercentage = Number(formik.values.discountPercentage)
      const taxPercentage = Number(formik.values.taxPercentage)

      if (formik.values.quantity) {
        // Step 1: Calculate total price before discount
        const price = quantity * unitPrice;

        // Step 2: Calculate discount amount
        const discountAmount = (discountPercentage / 100) * price;

        // Step 3: Price after discount
        const priceAfterDiscount = price - discountAmount;
        const taxAmount = (priceAfterDiscount * (taxPercentage / 100)).toFixed(2)
        const totalPrice = (Number(priceAfterDiscount) - Number(taxAmount)).toFixed(0)

        formik.setFieldValue("taxAmount", taxAmount)
        formik.setFieldValue("totalPrice", totalPrice)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values])


  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      {/* <ReferenceModal
        title=''
        description=''
        open={openReferenceModal}
        setOpen={setOpenReferenceModal}
      /> */}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="flex flex-wrap gap-4">
          {fieldConfig.map(field => (
            <div key={field.id} className={`flex flex-col gap-2 ${field.hidden ? 'hidden' : ''}`}>
              <Label htmlFor={field.id} className="flex gap-1">
                <span>{field.label}</span>
                <span>{field.required && <span className="text-red-500">*</span>}</span>
              </Label>

              {field.type === 'text' && (
                <Input
                  id={field.id}
                  name={field.id}
                  value={formik.values[field.id]?.toString() || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`!border-gray-300 min-w-72 ${field.readOnly ? 'bg-gray-200' : ''}`}
                  disabled={field.readOnly}
                />
              )}

              {field.type === 'number' && (
                <Input
                  id={field.id}
                  name={field.id}
                  type="number"
                  value={formik.values[field.id]?.toString() || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`!border-gray-300 min-w-72 ${field.readOnly ? 'bg-gray-200' : ''}`}
                  disabled={field.readOnly}
                />
              )}

              {field.type === 'textarea' && (
                <Textarea
                  id={field.id}
                  name={field.id}
                  value={formik.values[field.id]?.toString() || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="!border-gray-300 min-w-72"
                />
              )}

              {field.type === 'date' && (
                <Input
                  id={field.id}
                  name={field.id}
                  type="date"
                  value={formik.values[field.id]?.toString() || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="!border-gray-300 min-w-72"
                />
              )}

              {field.type === 'file' && (
                <Input
                  id={field.id}
                  name={field.id}
                  type="file"
                  value={formik.values[field.id]?.toString() || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="!border-gray-300 min-w-72"
                />
              )}

              {field.type === 'select' && field.options && (
                field.id === 'referenceID' ? (
                  <div>
                    {/* Render the reference modal content here */}
                    <ReferenceModal
                      title="Pending Transactions Details"
                      description="Check the checkboxes for the details you want to add"
                      open={openReferenceModal}
                      setOpen={setOpenReferenceModal}
                      referenceId={referenceId}
                      Trigger={
                        <Select
                          onValueChange={(value) => {
                            const parsedValue = isNaN(Number(value)) ? value : Number(value);
                            setReferenceId(parsedValue)
                            setOpenReferenceModal(true); // not strictly needed since DialogTrigger handles it
                          }}
                          defaultValue={formik.values[field.id]?.toString()}
                        >
                          <SelectTrigger className="w-full !border-gray-300 min-w-72">
                            <SelectValue placeholder={`Select ${field.label}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options.map(option => {
                              const val = typeof option === 'string' ? option : (option?.value ?? '').toString();
                              const label = typeof option === 'string' ? option : (option.label ?? '');
                              return (
                                <SelectItem key={val} value={val}>
                                  {label}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      }
                    />
                  </div>
                ) : (
                  <Select
                    onValueChange={(value) => {
                      const parsedValue = isNaN(Number(value)) ? value : Number(value);
                      formik.setFieldValue(field.id, parsedValue);

                      if (field.id === "customerID") {
                        setSelectedCustomer(parsedValue)
                      } else if (field.id === "supplierID") {
                        setSelectedSupplier(parsedValue)
                      }
                    }}
                    defaultValue={formik.values[field.id]?.toString()}
                  >
                    <SelectTrigger className="w-full !border-gray-300 min-w-72">
                      <SelectValue placeholder={`Select ${field.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map(option => {
                        const val = typeof option === 'string' ? option : (option?.value ?? '').toString();
                        const label = typeof option === 'string' ? option : (option.label ?? '');
                        return (
                          <SelectItem key={val} value={val}>
                            {label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )
              )}


              {formik.touched[field.id] && formik.errors[field.id] ? (
                <div className="text-red-500 text-sm">{formik.errors[field.id]}</div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="flex">
          <Button type="submit" disabled={disabled}>{submitButtonText}</Button>
        </div>
      </form>
    </div>
  )
}
