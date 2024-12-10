import { Employee } from '@/api/app-api.types'
import { TableContentRow } from '@/app/components/employees-table/table-content/table-content-row/table-content-row'

type TableContentProps = {
  employees: Employee[]
}
export const TableContent = ({ employees }: TableContentProps) => {
  return (
    <>
      {employees.map(employee => (
        <TableContentRow employee={employee} key={employee.id} />
      ))}
    </>
  )
}
