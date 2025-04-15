import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function CreatePoModal() {
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

  const totalPrice = Number(formik.values.quantity || 0) * Number(formik.values.unitPrice || 0)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Purchase Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen-xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Purchase Order</DialogTitle>
            <DialogDescription>Fill in all the details below.</DialogDescription>
          </DialogHeader>

          {/* --- 1. Purchase Order Details --- */}
          <div className="my-4 mb-7 font-semibold text-lg">Purchase Order Details</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500 !font-medium !text-sm mb-2">PO Number</Label>
              <Input
                name="poNumber"
                onChange={formik.handleChange}
                value={formik.values.poNumber}
              />
              <p className="text-red-500 text-sm">{formik.errors.poNumber}</p>
            </div>
            <div>
              <Label className="text-gray-500 !font-medium !text-sm mb-2">PO Date</Label>
              <Input
                type="date"
                name="poDate"
                onChange={formik.handleChange}
                value={formik.values.poDate}
              />
              <p className="text-red-500 text-sm">{formik.errors.poDate}</p>
            </div>
            <div>
              <Label className="text-gray-500 !font-medium !text-sm mb-2">Buyer</Label>
              <Input name="buyer" onChange={formik.handleChange} value={formik.values.buyer} />
              <p className="text-red-500 text-sm">{formik.errors.buyer}</p>
            </div>
            <div>
              <Label className="text-gray-500 !font-medium !text-sm mb-2">Vendor</Label>
              <Input name="vendor" onChange={formik.handleChange} value={formik.values.vendor} />
              <p className="text-red-500 text-sm">{formik.errors.vendor}</p>
            </div>
          </div>

          {/* --- 2. Product Details --- */}
          <div className="my-6 mb-7 font-semibold text-lg">Product Details</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              ['itemDescription', 'Item Description'],
              ['styleNumber', 'Style Number'],
              ['sizeBreakdown', 'Size Breakdown (S, M, L)'],
              ['color', 'Color'],
              ['fabric', 'Fabric Composition'],
              ['quantity', 'Quantity'],
              ['unitPrice', 'Unit Price'],
            ].map(([name, label]) => (
              <div key={name}>
                <Label className="text-gray-500 !font-medium !text-sm mb-2">{label}</Label>
                <Input
                  name={name}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  type={['quantity', 'unitPrice'].includes(name) ? 'number' : 'text'}
                />
                <p className="text-red-500 text-sm">{formik.errors[name]}</p>
              </div>
            ))}
          </div>

          {/* --- 3. Order Summary --- */}
          <div className="my-6 mb-7 font-semibold text-lg">Order Summary</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500 !font-medium !text-sm mb-2">Total Price</Label>
              <Input value={totalPrice.toFixed(2)} readOnly />
            </div>
          </div>

          {/* --- 4. Delivery & Shipping --- */}
          <div className="my-6 mb-7 font-semibold text-lg">Delivery & Shipping</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500 !font-medium !text-sm mb-2">Delivery Address</Label>
              <Input
                name="deliveryAddress"
                onChange={formik.handleChange}
                value={formik.values.deliveryAddress}
              />
              <p className="text-red-500 text-sm">{formik.errors.deliveryAddress}</p>
            </div>
            <div>
              <Label className="text-gray-500 !font-medium !text-sm mb-2">Delivery Date</Label>
              <Input
                type="date"
                name="deliveryDate"
                onChange={formik.handleChange}
                value={formik.values.deliveryDate}
              />
              <p className="text-red-500 text-sm">{formik.errors.deliveryDate}</p>
            </div>
            <div>
              <Label className="text-gray-500 !font-medium !text-sm mb-2">Shipping Terms</Label>
              <Input
                name="shippingTerms"
                onChange={formik.handleChange}
                value={formik.values.shippingTerms}
              />
              <p className="text-red-500 text-sm">{formik.errors.shippingTerms}</p>
            </div>
          </div>

          {/* --- 5. Payment Terms --- */}
          <div className="my-6 mb-7 font-semibold text-lg">Payment Terms</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-500 !font-medium !text-sm mb-2">Payment Terms</Label>
              <Input
                name="paymentTerms"
                onChange={formik.handleChange}
                value={formik.values.paymentTerms}
              />
              <p className="text-red-500 text-sm">{formik.errors.paymentTerms}</p>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="submit">Save Purchase Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
