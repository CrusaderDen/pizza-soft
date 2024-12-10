import { FormEmployee } from '@/app/shared/form-employee/form-employee'
import { updateEmployee } from '@/app/store/app-slice'
import * as Dialog from '@radix-ui/react-dialog'

import s from './edit-employee-dialog.module.scss'

type EditEmployeeDialogProps = {
  id: number
  open: boolean
  setOpen: (open: boolean) => void
}

export const EditEmployeeDialog = ({ id, open, setOpen }: EditEmployeeDialogProps) => {
  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.content}>
          <Dialog.Title>Редактировать сотрудника</Dialog.Title>
          <Dialog.Description>Заполните данные сотрудника.</Dialog.Description>
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
