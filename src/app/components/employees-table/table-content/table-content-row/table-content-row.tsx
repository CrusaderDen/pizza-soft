import { Employee } from '@/api/app-api.types'
import { EditButton } from '@/app/components/employees-table/table-action-buttons/edit-button/edit-button'
import { RemoveButton } from '@/app/components/employees-table/table-action-buttons/remove-button/remove-button'
import { TableCell } from '@/app/components/employees-table/table-cell/table-cell'

type TableContentRowProps = {
  employee: Employee
}
export const TableContentRow = ({ employee }: TableContentRowProps) => {
  return (
    <>
      <TableCell cellType={'content'}>
        <RemoveButton employeeId={employee.id} />
      </TableCell>
      <TableCell cellType={'content'}>
        <EditButton id={employee.id} />
      </TableCell>
      <TableCell cellType={'content'}>{employee.name}</TableCell>
      <TableCell cellType={'content'}>{employee.phone}</TableCell>
      <TableCell cellType={'content'}>{employee.role}</TableCell>
      <TableCell cellType={'content'}>{employee.birthday}</TableCell>
      <TableCell cellType={'content'}>{employee.isArchive ? 'В архиве' : ''}</TableCell>
    </>
  )
}
