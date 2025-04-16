import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface FormModalProps {
  title: string
  description: string
  triggerButtonText: string
  children: React.ReactNode
}

export function FormModal({ title, description, triggerButtonText, children }: FormModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{triggerButtonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen-xl max-h-[90vh] overflow-y-auto">
        <div>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          {/* Form content goes here */}
          <div className="mt-4">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
