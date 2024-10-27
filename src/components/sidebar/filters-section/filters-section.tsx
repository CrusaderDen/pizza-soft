import { useState } from 'react'

import { Role } from '@/app/app-api.types'
import { useAppDispatch } from '@/app/hooks'
import {
  setSelectedEmployeesRole,
  setSelectedEmployeesStatus,
} from '@/components/employees-table/employeesSlice'
import { FilterByRole } from '@/components/sidebar/filters-section/filter-by-role/filter-by-role'

import s from './filters-section.module.scss'

export const FiltersSection = () => {
  const dispatch = useAppDispatch()
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])

  const handleCheckboxChange = (role: Role) => {
    const newSelectedRoles = selectedRoles.includes(role)
      ? selectedRoles.filter(r => r !== role)
      : [...selectedRoles, role]

    setSelectedRoles(newSelectedRoles)
    dispatch(setSelectedEmployeesRole(newSelectedRoles))
  }

  const handleStatusChecked = (e: any) => {
    const isChecked = e.currentTarget.checked

    dispatch(setSelectedEmployeesStatus(isChecked))
  }

  return (
    <fieldset className={s.filtersSetWrapper}>
      <legend className={s.filtersSetLegend}>Фильтрация</legend>
      <div className={s.filterByRole}>
        <FilterByRole
          handleCheckboxChange={handleCheckboxChange}
          selectedRoles={selectedRoles}
          setSelectedRoles={setSelectedRoles}
        />
      </div>
      <div className={s.filterByStatus}>
        <input id={'status'} onChange={handleStatusChecked} type={'checkbox'} />
        <label htmlFor={'status'}>в архиве</label>
      </div>
    </fieldset>
  )
}
