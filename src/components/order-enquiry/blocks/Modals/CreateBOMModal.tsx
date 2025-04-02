import { DatePickerDemo } from '@/components/constants/custom/DatePicker'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Formik, Form, Field } from 'formik'

interface FormValues {
  buyer: string
  styleRef: string
  season: string
  composition: string
  color: string
  size: string
  count: string
  gauge: string
  grossWeight: string
  construction: string
  comments: string
  protoDevelopment: boolean
  salesman: boolean
  pps: boolean
  fitting: boolean
  sizeSet: boolean
  topShipping: boolean
}

const initialValues: FormValues = {
  buyer: '',
  styleRef: '',
  season: '',
  composition: '',
  color: '',
  size: '',
  count: '',
  gauge: '',
  grossWeight: '',
  construction: '',
  comments: '',
  protoDevelopment: false,
  salesman: false,
  pps: false,
  fitting: false,
  sizeSet: false,
  topShipping: false,
}

export function CreateBOMModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create new BOM</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen-xl">
        <DialogHeader>
          <DialogTitle>Create Order Receipt</DialogTitle>
          <DialogDescription>Fill in all the details below.</DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            console.log('Form Data:', values)
          }}
        >
          {({ values, handleChange }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="flex flex-col gap-4">
                  <Label htmlFor="date">Date:</Label>
                  <DatePickerDemo />
                </div>
                {[
                  'buyer',
                  'styleRef',
                  'season',
                  'composition',
                  'color',
                  'size',
                  'count',
                  'gauge',
                  'grossWeight',
                  'construction',
                  'comments',
                ].map(field => (
                  <div key={field} className="flex flex-col gap-4">
                    <Label htmlFor={field} className="capitalize">
                      {field.replace(/([A-Z])/g, ' $1')}
                    </Label>
                    <Field
                      as={Input}
                      id={field}
                      name={field}
                      value={values[field as keyof FormValues]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {['protoDevelopment', 'salesman', 'pps', 'fitting', 'sizeSet', 'topShipping'].map(
                  field => (
                    <div key={field} className="flex items-center space-x-2">
                      <Field
                        as={Checkbox}
                        type="checkbox"
                        id={field}
                        name={field}
                        checked={values[field as keyof FormValues] as boolean}
                        onChange={handleChange}
                      />
                      <Label htmlFor={field} className="text-sm font-medium capitalize">
                        {field.replace(/([A-Z])/g, ' $1')}
                      </Label>
                    </div>
                  ),
                )}
              </div>
              <DialogFooter>
                <Button type="submit">Save Receipt</Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
