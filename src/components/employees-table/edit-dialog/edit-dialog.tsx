import { useState } from 'react'

import { EmployeeForm } from '@/components/create-employee/create-employee'
import { updateEmployee } from '@/components/employees-table/employeesSlice'
import * as Dialog from '@radix-ui/react-dialog'

import s from './edit-dialog.module.scss'

type EditDialogProps = {
  id: number
}

export const EditDialog = ({ id }: EditDialogProps) => {
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
