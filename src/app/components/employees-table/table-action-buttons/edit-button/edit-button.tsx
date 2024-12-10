import { useState } from 'react'

import { EditEmployeeDialog } from '@/app/components/edit-empolyee-dialog/edit-employee-dialog'

type EditDialogProps = {
  id: number
}

export const EditButton = ({ id }: EditDialogProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>✏️</button>
      <EditEmployeeDialog id={id} open={open} setOpen={setOpen} />
    </>
  )
}
