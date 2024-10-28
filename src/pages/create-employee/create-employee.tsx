import { EmployeeForm } from '@/components/employee-form/employee-form'
import { addEmployee } from '@/components/employees-table/employees-slice'

import s from './create-employee.module.scss'

export const CreateEmployee = () => {
  return (
    <div className={s.wrapper}>
      <EmployeeForm dispatchVariant={addEmployee} typeForm={'create-employee'} />
    </div>
  )
}
