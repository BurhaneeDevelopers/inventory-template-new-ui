import Page from '@/components/constants/layout/Page'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

const Items = () => {
  // Categorized array for form fields
  const categorizedArray = [
    ['itemType', 'Item Type'],
    ['itemCode', 'Item Code'],
    ['itemName', 'Item Name'],
    ['description', 'Description'],
    ['brand', 'Brand'],
    ['category', 'Category'],
    ['subCategory', 'Sub Category'],
    ['color', 'Color'],
    ['size', 'Size'],
    ['itemGroup', 'Item Group'],
    ['unitOfMeasurement', 'Unit of Measurement'],
    ['basePrice', 'Base Price'],
    ['hsnSacCode', 'HSN/SAC Code'],
    ['minimumQuoteQty', 'Minimum Quote Qty'],
    ['minimumStockLevel', 'Minimum Stock Level'],
    ['maximumStockLevel', 'Maximum Stock Level'],
    ['shelfLife', 'Shelf Life'],
    ['qualityParameters', 'Quality Parameters'],
    ['barcodeQrCode', 'Barcode/QR Code'],
    ['storageRequirements', 'Storage Requirements'],
    ['packagingRequirements', 'Packaging Requirements'],
  ]

  // Formik setup with initialValues and validationSchema
  const formik = useFormik({
    initialValues: {
      id: '',
      itemType: '',
      itemCode: '',
      itemName: '',
      description: '',
      brand: '',
      category: '',
      subCategory: '',
      color: '',
      size: '',
      itemGroup: '',
      unitOfMeasurement: '',
      basePrice: '',
      hsnSacCode: '',
      minimumQuoteQty: '',
      minimumStockLevel: '',
      maximumStockLevel: '',
      shelfLife: '',
      qualityParameters: '',
      barcodeQrCode: '',
      storageRequirements: '',
      packagingRequirements: '',
    },
    validationSchema: Yup.object({
      itemType: Yup.string().required('Required'),
      itemCode: Yup.string().required('Required'),
      itemName: Yup.string().required('Required'),
      description: Yup.string(),
      brand: Yup.string(),
      category: Yup.string().required('Required'),
      subCategory: Yup.string(),
      color: Yup.string(),
      size: Yup.string(),
      itemGroup: Yup.string(),
      unitOfMeasurement: Yup.string().required('Required'),
      basePrice: Yup.number().positive('Must be positive').required('Required'),
      hsnSacCode: Yup.string().required('Required'),
      minimumQuoteQty: Yup.number().min(0, 'Must be non-negative'),
      minimumStockLevel: Yup.number().min(0, 'Must be non-negative'),
      maximumStockLevel: Yup.number().min(0, 'Must be non-negative'),
      shelfLife: Yup.string(),
      qualityParameters: Yup.string(),
      barcodeQrCode: Yup.string(),
      storageRequirements: Yup.string(),
      packagingRequirements: Yup.string(),
    }),
    onSubmit: values => {
      console.log('Item Data:', values)
      alert('Item Submitted')
    },
  })
  return <Page title="Items" formik={formik} categorizedArray={categorizedArray} />
}

export default Items
