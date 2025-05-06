import React, { useState } from 'react'
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
import { useAtomValue } from 'jotai'
import { pathAtom } from '../../../../jotai/jotaiStore'
import { Trash2 } from 'lucide-react'
import { apiService } from '@/apiService/apiService'
import { DialogClose } from '@radix-ui/react-dialog'

interface DeleteProps {
  id: number
  isTransaction: boolean
  // useGlobalAtom?: boolean
  // title: string
  // description: string
  // children: React.ReactNode
}

export function DeletePopUp({ id, isTransaction }: DeleteProps) {
  const [open, setOpen] = useState(false)
  const apiPath = useAtomValue(pathAtom)

  console.log(isTransaction)

  const deleteData = async () => {
    try {
      const response = await apiService.delete(
        `${isTransaction ? '/transaction-master' : apiPath}/delete`,
        { id: id },
      )

      if (response) {
        window.location.reload()
        setOpen(false)
        return response
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-500">
          <Trash2 color="#fff" size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen-xl max-h-[90vh] overflow-y-auto">
        <div>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>Deleting will delete this permanantly</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button className="bg-[#ff0000]" onClick={deleteData}>
              Confirm
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
