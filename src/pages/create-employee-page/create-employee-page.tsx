import { EmployeeForm } from '@/components/employee-form/employee-form'
import { addEmployee } from '@/components/employee-form/employees-form-slice'

import s from './create-employee-page.module.scss'

export const CreateEmployeePage = () => {
  return (
    <div className={s.wrapper}>
      <EmployeeForm dispatchVariant={addEmployee} typeForm={'create-employee-page'} />
    </div>
  )
}
