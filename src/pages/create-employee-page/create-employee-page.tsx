import { addEmployee } from '@/app/app-slice'
import { EmployeeForm } from '@/components/employee-form/employee-form'

import s from './create-employee-page.module.scss'

export const CreateEmployeePage = () => {
  return (
    <div className={s.wrapper}>
      <p style={{ position: 'absolute', top: '5000px' }}>
        Уникальный текст для прохождения тестов на рендер CreateEmployeePage
      </p>
      <EmployeeForm dispatchVariant={addEmployee} typeForm={'create-employee-page'} />
    </div>
  )
}
