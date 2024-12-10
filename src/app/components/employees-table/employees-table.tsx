import { TableContent } from '@/app/components/employees-table/table-content/table-content'
import { TableHeader } from '@/app/components/employees-table/table-header/table-header'
import { Loader } from '@/app/shared/loader/loader'
import { useAppSelector } from '@/app/store/store'

import s from './employees-table.module.scss'

export const EmployeesTable = () => {
  const { error, filteredEmployees, loading } = useAppSelector(state => state.employees)

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!filteredEmployees || !filteredEmployees.length) {
    return <div>Данные по сотрудникам отсутствуют.</div>
  }

  return (
    <div className={s.gridTable}>
      <TableHeader />
      <TableContent employees={filteredEmployees} />
    </div>
  )
}
