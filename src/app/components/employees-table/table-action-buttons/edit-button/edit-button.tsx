import { useState } from 'react'

import { FormEmployee } from '@/app/shared/form-employee/form-employee'
import { updateEmployee } from '@/app/store/app-slice'
import * as Dialog from '@radix-ui/react-dialog'

import s from './edit-button.module.scss'

type EditDialogProps = {
  id: number
}

export const EditButton = ({ id }: EditDialogProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Trigger>✏️</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.content}>
          <Dialog.Title> </Dialog.Title>
          <Dialog.Description> </Dialog.Description>
          <FormEmployee
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
