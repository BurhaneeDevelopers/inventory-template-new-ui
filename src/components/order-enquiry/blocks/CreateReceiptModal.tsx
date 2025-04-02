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
import { useState } from 'react'

export function CreateReceiptModal() {
  const [formData, setFormData] = useState({
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
  })

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create new receipt</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen-xl">
        <DialogHeader>
          <DialogTitle>Create Order Receipt</DialogTitle>
          <DialogDescription>Fill in all the details below.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor={'date'} className="capitalize">
              Date:
            </Label>

            <DatePickerDemo />
          </div>
          {[
            'buyer',
            'style/Ref',
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
              <Input
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className=""
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {['protoDevelopment', 'salesman', 'pps', 'fitting', 'sizeSet', 'topShipping'].map(
            field => (
              <div key={field} className="flex items-center space-x-2">
                <Checkbox
                  id={field}
                  name={field}
                  checked={formData[field]}
                  onChange={handleChange}
                />
                <label htmlFor={field} className="text-sm font-medium capitalize">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
              </div>
            ),
          )}
        </div>
        <DialogFooter>
          <Button type="submit">Save Receipt</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
