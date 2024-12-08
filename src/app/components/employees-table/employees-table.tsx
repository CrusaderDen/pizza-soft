import { Fragment } from 'react'

import { EditEmployee } from '@/app/components/edit-employee/edit-employee'
import { SortButton } from '@/app/components/employees-table/sort-button'
import { useSort } from '@/app/hooks/useSort'
import { Loader } from '@/app/shared/loader/loader'
import { deleteEmployee } from '@/app/store/app-slice'
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { notifyError, notifySuccess } from '@/utils/toastConfig'
import clsx from 'clsx'

import s from './employees-table.module.scss'

export const EmployeesTable = () => {
  const dispatch = useAppDispatch()
  const { error, filteredEmployees, loading } = useAppSelector(state => state.employees)
  const { birthdaySort, handleBirthdaySort, handleNameSort, nameSort } = useSort(filteredEmployees)

  if (error) {
    return <div>Error: {error}</div>
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
      {filteredEmployees && !!filteredEmployees.length && (
        <div className={s.gridTable}>
          <div className={s.gridHeader}></div>
          <div className={s.gridHeader}></div>
          <div className={s.gridHeader}>
            <div>
              <span>Имя</span>
              <button className={s.sortBtn} onClick={handleNameSort} type={'button'}>
                {nameSort}
              </button>
              <SortButton field={'name'} />
            </div>
          </div>
          <div className={s.gridHeader}>Телефон</div>
          <div className={s.gridHeader}>Роль</div>
          <div className={s.gridHeader}>
            <span> Дата рождения</span>
            <button className={s.sortBtn} onClick={handleBirthdaySort} type={'button'}>
              {birthdaySort}
            </button>
            <SortButton field={'birthday'} />
          </div>
          <div className={s.gridHeader}>Архив</div>

          {filteredEmployees.map(employee => {
            return (
              <Fragment key={employee.id}>
                <div className={s.gridCell}>
                  <button onClick={() => handleRemoveEmployee(employee.id)}>🗑️</button>
                </div>
                <div className={s.gridCell}>
                  <EditEmployee id={employee.id} />
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
