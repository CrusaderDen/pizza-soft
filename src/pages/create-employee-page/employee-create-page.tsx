import { addEmployee } from '@/app/app-slice'
import { useAppSelector } from '@/app/hooks'
import { EmployeeForm } from '@/components/employee-form/employee-form'
import { Loader } from '@/components/loader/loader'

import s from './create-employee-page.module.scss'

export const EmployeeCreatePage = () => {
  const { loading } = useAppSelector(state => state.employees)

  return (
    <div className={s.wrapper}>
      <p style={{ left: '-9999px', position: 'absolute' }}>
        Уникальный текст для прохождения тестов на рендер CreateEmployeePage
      </p>
      {loading && <Loader />}
      <EmployeeForm dispatchVariant={addEmployee} typeForm={'create-employee-page'} />
    </div>
  )
}
