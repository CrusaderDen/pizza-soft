import { useState } from 'react'

import { EmployeeForm } from '@/components/employee-form/employee-form'
import { updateEmployee } from '@/components/employee-form/employees-form-slice'
import * as Dialog from '@radix-ui/react-dialog'

import s from './edit-employee-dialog.module.scss'

type EditDialogProps = {
  id: number
}

export const EditEmployeeDialog = ({ id }: EditDialogProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Trigger>✏️</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.content}>
          <Dialog.Title> </Dialog.Title>
          <Dialog.Description> </Dialog.Description>
          <EmployeeForm
            dispatchVariant={updateEmployee}
            id={id}
            setOpen={setOpen}
            typeForm={'edit-form'}
          />
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
