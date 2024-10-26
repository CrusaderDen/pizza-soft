import { Fragment, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchEmployees } from '@/components/employees-table/employeesSlice'
import { useSort } from '@/components/employees-table/useSort'
import { Loader } from '@/components/loader/loader'
import clsx from 'clsx'

import s from './employees-table.module.scss'

export const EmployeesTable = () => {
  const dispatch = useAppDispatch()
  const { employees, error, loading } = useAppSelector(state => state.employees)
  const { birthdaySort, handleBirthdaySort, handleNameSort, nameSort } = useSort(employees)

  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployees())
    }
  }, [dispatch])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      {loading && <Loader />}
      {!!employees.length && (
        <div className={s.gridTable}>
          <div className={s.gridHeader}>
            <span>Имя</span>
            <button className={s.sortBtn} onClick={handleNameSort} type={'button'}>
              {nameSort}
            </button>
          </div>
          <div className={s.gridHeader}>Телефон</div>
          <div className={s.gridHeader}>Роль</div>
          <div className={s.gridHeader}>
            <span> Дата рождения</span>
            <button className={s.sortBtn} onClick={handleBirthdaySort} type={'button'}>
              {birthdaySort}
            </button>
          </div>
          <div className={s.gridHeader}>Архив</div>

          {employees.map(employee => {
            return (
              <Fragment key={employee.id}>
                <div className={clsx(s.gridCell, s.name)}>{employee.name}</div>
                <div className={s.gridCell}>{employee.phone}</div>
                <div className={s.gridCell}>{employee.role}</div>
                <div className={s.gridCell}>{employee.birthday}</div>
                <div className={s.gridCell}> {employee.isArchive ? 'В архиве' : ''}</div>
              </Fragment>
            )
          })}
        </div>
      )}
    </>
  )
}
