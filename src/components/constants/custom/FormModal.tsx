import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAtom } from 'jotai'
import { formModalAtom } from '../../../../jotai/jotaiStore'

interface FormModalProps {
  title: string
  description: string
  triggerButtonText: string
  children: React.ReactNode
}

export function FormModal({ title, description, triggerButtonText, children }: FormModalProps) {
  const [open, setOpen] = useAtom(formModalAtom)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>{triggerButtonText}</Button>
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
