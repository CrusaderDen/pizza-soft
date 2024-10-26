import { Fragment, useState } from 'react'

import { SortVariant } from '@/App'
import { Employee } from '@/app/app-api.types'
import clsx from 'clsx'

import s from './employees-table.module.scss'

type EmployeesTableProps = {
  employees: Employee[]
  setSortBy: (sortBy: SortVariant) => void
}

type SortArrow = '↑' | '↓' | '↕'

export const EmployeesTable = ({ employees, setSortBy }: EmployeesTableProps) => {
  const [nameSort, setNameSort] = useState<SortArrow>('↕')
  const [birthdaySort, setBirthdaySort] = useState<SortArrow>('↕')

  const handleNameSort = () => {
    if (nameSort === '↕') {
      setSortBy('by-name-asc')
      setNameSort('↓')
    }
    if (nameSort === '↓') {
      setSortBy('by-name-desc')
      setNameSort('↑')
    }
    if (nameSort === '↑') {
      setSortBy('default')
      setNameSort('↕')
    }
  }

  const handleBirthdaySort = () => {
    if (birthdaySort === '↕') {
      setSortBy('by-date-of-birthday-asc')
      setBirthdaySort('↓')
    }
    if (birthdaySort === '↓') {
      setSortBy('by-date-of-birthday-desc')
      setBirthdaySort('↑')
    }
    if (birthdaySort === '↑') {
      setSortBy('default')
      setBirthdaySort('↕')
    }
  }

  return (
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
  )
}
