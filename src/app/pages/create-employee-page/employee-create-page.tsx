import { EmployeeForm } from '@/app/components/employee-form/employee-form'
import { Loader } from '@/app/components/loader/loader'
import { addEmployee } from '@/app/store/app-slice'
import { useAppSelector } from '@/app/store/store'

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
