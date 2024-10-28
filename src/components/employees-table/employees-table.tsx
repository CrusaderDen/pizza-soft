import { Fragment, useEffect } from 'react'

import { Role } from '@/api/app-api.types'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { notifyError, notifySuccess } from '@/common/toastConfig'
import { EditDialog } from '@/components/employees-table/edit-dialog/edit-dialog'
import { deleteEmployee, fetchEmployees } from '@/components/employees-table/employees-slice'
import { useSort } from '@/components/employees-table/useSort'
import { Loader } from '@/components/loader/loader'
import clsx from 'clsx'

import s from './employees-table.module.scss'

export const EmployeesTable = () => {
  const dispatch = useAppDispatch()
  const { employees, error, loading, selectedEmployeesRole, selectedEmployeesStatus } =
    useAppSelector(state => state.employees)
  const { birthdaySort, handleBirthdaySort, handleNameSort, nameSort } = useSort(employees)

  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployees())
    }
  }, [dispatch])

  if (error) {
    return <div>Error: {error}</div>
  }

  let filteredEmployees = employees

  if (selectedEmployeesRole.length) {
    filteredEmployees = filteredEmployees.filter(employee =>
      selectedEmployeesRole.includes(employee.role as Role)
    )
  }

  if (selectedEmployeesStatus) {
    filteredEmployees = filteredEmployees.filter(employee => employee.isArchive)
  }

  const handleRemoveEmployee = async (id: number) => {
    const confirmation = confirm('Подтвердите удаление сотрудника из базы')

    if (confirmation) {
      try {
        await dispatch(deleteEmployee(id))
        notifySuccess('Сотрудник успешно удалён из базы')
      } catch (e) {
        notifyError(`Ошибка ${e}. Попробуйте позже или обратитесь в поддержку. `)
      }
    }
  }

  return (
    <>
      {loading && <Loader />}
      {!!employees.length && (
        <div className={s.gridTable}>
          <div className={s.gridCell}></div>
          <div className={s.gridCell}></div>
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

          {filteredEmployees.map(employee => {
            return (
              <Fragment key={employee.id}>
                <div className={s.gridCell}>
                  <button onClick={() => handleRemoveEmployee(employee.id)}>🗑️</button>
                </div>
                <div className={s.gridCell}>
                  <EditDialog id={employee.id} />
                </div>
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
