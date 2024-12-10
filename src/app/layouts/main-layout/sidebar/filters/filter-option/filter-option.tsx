import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Role } from '@/api/app-api.types'
import { applyFilters } from '@/app/store/app-slice'
import { useAppDispatch, useAppSelector } from '@/app/store/store'

import s from './filter-option.module.scss'

type FilterOptionProps = {
  className?: string
  role: Role
}
export const FilterOption = ({ className, role }: FilterOptionProps) => {
  const dispatch = useAppDispatch()
  const activeFilters = useAppSelector(state => state.employees.activeFilters)
  const [_, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (activeFilters.length > 0) {
      const filtersString = activeFilters.join(',')

      setSearchParams({ f: filtersString })
    } else {
      setSearchParams()
    }
  }, [activeFilters])

  const handleChangeSelectedRoles = (e: any, role: Role) => {
    const isChecked = e.currentTarget.checked

    isChecked
      ? dispatch(applyFilters({ action: 'add', filterValue: role }))
      : dispatch(applyFilters({ action: 'remove', filterValue: role }))
  }

  let label = ''

  switch (role) {
    case 'waiter':
      label = 'Официанты'
      break
    case 'driver':
      label = 'Водители'
      break
    case 'cook':
      label = 'Повара'
      break
    case 'archived':
      label = 'в архиве'
      break
    default:
      console.log('Error with employees filter item label')
  }

  return (
    <div className={className ? className : ''}>
      <input
        checked={activeFilters.includes(role)}
        className={s.dropdownItem__input}
        id={role}
        onChange={e => handleChangeSelectedRoles(e, role)}
        type={'checkbox'}
      />
      <label htmlFor={role}>{label}</label>
    </div>
  )
}
