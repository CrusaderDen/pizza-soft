import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { TableContent } from '@/app/components/employees-table/table-content/table-content'
import { TableHeader } from '@/app/components/employees-table/table-header/table-header'
import { fetchEmployeesThunk } from '@/app/store/app-thunks'
import { useAppDispatch, useAppSelector } from '@/app/store/store'

import s from './employees-table.module.scss'

export const EmployeesTable = () => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const { employees, error } = useAppSelector(state => state.employees)

  useEffect(() => {
    dispatch(fetchEmployeesThunk(searchParams.size ? { filters: searchParams.get('f') } : ''))
  }, [dispatch, searchParams])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className={s.gridTable}>
      <TableHeader />
      <TableContent employees={employees} />
    </div>
  )
}
