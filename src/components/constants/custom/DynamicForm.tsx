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
import { formModalAtom, selectedCustomerAtom, selectedDetailsAtom, selectedSupplierAtom } from '../../../../jotai/jotaiStore'
import { useAtom, useSetAtom } from 'jotai'
import { ReferenceModal } from './Modal/ReferenceModal'
import moment from 'moment'
import { fetchItemsFromDB, fetchSingleItemFromDB } from '@/apiService/services'

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
  isSaveBottom?: boolean
  totalTax?: string | number | null
  totalPrice?: string | number | null
  grandTotal?: string | number | null
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
  isSaveBottom = true,
  totalTax,
  totalPrice,
  grandTotal,
}: DynamicFormProps) {
  // Formik setup with initialValues and validationSchema
  const [, setOpen] = useAtom(formModalAtom)
  const [openReferenceModal, setOpenReferenceModal] = useState(false)
  const [referenceId, setReferenceId] = useState(null)
  const setSelectedDetails = useSetAtom(selectedDetailsAtom)
  const setSelectedCustomer = useSetAtom(selectedCustomerAtom)
  const setSelectedSupplier = useSetAtom(selectedSupplierAtom)
  const selectedValue = ''


  const formik = useFormik({
    initialValues: generateInitialValues(fieldConfig, initialFields),
    validationSchema: generateValidationSchema(fieldConfig),
    onSubmit: async values => {
      if (onSubmit) {
        onSubmit(values)
        formik.resetForm()
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
          formik.resetForm()
          setSelectedDetails([])
          toast.success('Task Done Successfully')
        }
      }
    },
  })


  // TO CALCULATE TOTAL COSTING
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
        if (discountPercentage) {
          var taxAmount = (priceAfterDiscount * (taxPercentage / 100)).toFixed(2)
        } else {
          var taxAmount = (price * (taxPercentage / 100)).toFixed(2)
        }
        const totalPrice = Number(priceAfterDiscount).toFixed(0)

        formik.setFieldValue("taxAmount", taxAmount)
        formik.setFieldValue("totalPrice", totalPrice)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values])


  // TO AUTO POPUATE DETAIL VALUES WHEN A NEW ITEM IS ADDED 
  useEffect(() => {
    if (formik.values.itemId) {

      fieldConfig.forEach(async (field, i) => {
        const items = await fetchSingleItemFromDB(formik.values.itemId)

        switch (field.id) {

          case 'itemDescription':
            if (items) {
              formik.setFieldValue("itemDescription", items.description)
            }
            break;
          case 'unitPrice':
            if (items) {
              formik.setFieldValue("unitPrice", items.basePrice || 0)
            }
            break;
          case 'unitOfMeasure':
            if (items) {
              formik.setFieldValue("unitOfMeasure", items.unitOfMeasurement || "Kg")
            }
            break;

          case 'quantity':
            if (items) {
              formik.setFieldValue("quantity", 1)
            }
            break;

          default:
            // Do nothing
            break;
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.itemId])

  useEffect(() => {
    console.log(totalPrice)
    if (totalTax) {
      formik.setFieldValue("totalTaxAmount", totalTax || '')
    }
    if (totalPrice) {
      formik.setFieldValue("itemSubTotal", totalPrice || '')
    }
    if (grandTotal) {
      formik.setFieldValue("grandTotal", grandTotal || '')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPrice])


  return (
    <div>

      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-medium text-zinc-700 uppercase">{title}</h2>

        {!isSaveBottom &&
          <div className="flex">
            <Button type="submit" disabled={disabled} onClick={formik.handleSubmit}>{submitButtonText}</Button>
          </div>
        }
      </div>

      {/* <ReferenceModal
        title=''
        description=''
        open={openReferenceModal}
        setOpen={setOpenReferenceModal}
      /> */}

      <div className="space-y-6">
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
                  className="!border-gray-300 min-w-72 resize-none focus:resize-y"
                />
              )}

              {field.type === 'date' && (
                <Input
                  id={field.id}
                  name={field.id}
                  type="date"
                  value={moment(formik.values[field.id]).format("YYYY-MM-DD")}
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
                          value={selectedValue}
                          onValueChange={(value) => {
                            // If the value changes, update Formik
                            if (value !== selectedValue) {
                              const parsedValue = isNaN(Number(value)) ? value : Number(value);
                              setReferenceId(parsedValue);
                              formik.setFieldValue(field.id, parsedValue); // Update Formik state
                              setOpenReferenceModal(true); // Open the modal (if necessary)
                            }
                          }}
                        >
                          <SelectTrigger className="w-full !border-gray-300 min-w-72">
                            <SelectValue placeholder={`Select ${field.label}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options.length !== 0 ? field.options.map(option => {
                              const val = typeof option === 'string' ? option : (option?.value ?? '').toString();
                              const label = typeof option === 'string' ? option : (option.label ?? '');
                              return (
                                <SelectItem key={val} value={val}>
                                  {label}
                                </SelectItem>
                              );
                            }) : <p className='text-xs p-2 text-center'>Nothing to show..</p>}
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
                      }
                      if (field.id === "supplierID") {
                        setSelectedSupplier(parsedValue)
                      }
                    }}
                    defaultValue={formik.values[field.id]?.toString()}
                  >
                    <SelectTrigger className="w-full !border-gray-300 min-w-72">
                      <SelectValue placeholder={`Select ${field.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.length !== 0 ? field.options.map(option => {
                        const val = typeof option === 'string' ? option : (option?.value ?? '').toString();
                        const label = typeof option === 'string' ? option : (option.label ?? '');
                        return (
                          <SelectItem key={val} value={val}>
                            {label}
                          </SelectItem>
                        );
                      }) : <p className='text-xs p-2 text-center'>Nothing to show..</p>}
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

        {isSaveBottom &&
          <div className="flex justify-end">
            <Button type="submit" disabled={disabled} onClick={formik.handleSubmit}>{submitButtonText}</Button>
          </div>
        }
      </div>
    </div>
  )
}
