import { FormEmployee } from '@/app/shared/form-employee/form-employee'
import { Loader } from '@/app/shared/loader/loader'
import { addEmployeeThunk } from '@/app/store/app-thunks'
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
      <FormEmployee dispatchVariant={addEmployeeThunk} typeForm={'create-employee-page'} />
    </div>
  )
}
