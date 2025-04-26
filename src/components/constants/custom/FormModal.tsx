import React, { useState } from 'react'
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
  useGlobalAtom?: boolean
  title: string
  description: string
  triggerButtonText: string
  Trigger?: any
  localOpen?: boolean
  setLocalOpen?: (values: boolean) => void
  children: React.ReactNode
}

export function FormModal({ useGlobalAtom = true, title, description, triggerButtonText, Trigger, localOpen, setLocalOpen, children }: FormModalProps) {
  const [globalOpen, setGlobalOpen] = useAtom(formModalAtom)

  const open = useGlobalAtom ? globalOpen : localOpen
  const setOpen = useGlobalAtom ? setGlobalOpen : setLocalOpen
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {Trigger ? React.cloneElement(Trigger, { onClick: () => setOpen(true) }) : (
          <Button onClick={() => setOpen(true)}>{triggerButtonText}</Button>
        )}
        {/* <Button onClick={() => setOpen(true)}>{triggerButtonText}</Button> */}
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
