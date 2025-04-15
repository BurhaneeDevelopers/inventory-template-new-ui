import Page from '@/components/constants/layout/Page'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup"

const Items = () => {
    const categorizedArray = [
        ['itemDescription', 'Item Description'],
        ['styleNumber', 'Style Number'],
        ['sizeBreakdown', 'Size Breakdown (S, M, L)'],
        ['color', 'Color'],
        ['fabric', 'Fabric Composition'],
        ['quantity', 'Quantity'],
        ['unitPrice', 'Unit Price'],
    ]

    const formik = useFormik({
        initialValues: {
            poNumber: '',
            poDate: '',
            buyer: '',
            vendor: '',
            itemDescription: '',
            styleNumber: '',
            sizeBreakdown: '',
            color: '',
            fabric: '',
            quantity: '',
            unitPrice: '',
            deliveryAddress: '',
            deliveryDate: '',
            shippingTerms: '',
            paymentTerms: '',
        },
        validationSchema: Yup.object({
            poNumber: Yup.string().required('Required'),
            poDate: Yup.date().required('Required'),
            buyer: Yup.string().required('Required'),
            vendor: Yup.string().required('Required'),
            itemDescription: Yup.string().required('Required'),
            styleNumber: Yup.string().required('Required'),
            sizeBreakdown: Yup.string().required('Required'),
            color: Yup.string().required('Required'),
            fabric: Yup.string().required('Required'),
            quantity: Yup.number().required('Required').positive(),
            unitPrice: Yup.number().required('Required').positive(),
            deliveryAddress: Yup.string().required('Required'),
            deliveryDate: Yup.date().required('Required'),
            shippingTerms: Yup.string().required('Required'),
            paymentTerms: Yup.string().required('Required'),
        }),
        onSubmit: values => {
            console.log('PO Data:', values)
            alert('Purchase Order Submitted')
        },
    })

    return (
        <Page title='Items' formik={formik} categorizedArray={categorizedArray} />
    )
}

export default Items