import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { FilterRole, Role } from '@/api/app-api.types'
import { setSelectedFilter } from '@/app/store/app-slice'
import { useAppDispatch, useAppSelector } from '@/app/store/store'

import s from '@/app/components/filters/filter-option/filter-option.module.scss'

type FilterOptionProps = {
  className?: string
  role: FilterRole
}

export const FilterOption = ({ className, role }: FilterOptionProps) => {
  const dispatch = useAppDispatch()
  const activeFilters = useAppSelector(state => state.employees.activeFilters)
  const [_, setSearchParams] = useSearchParams()

  const optionRole = role[0]
  const optionLabel = role[1]

  useEffect(() => {
    if (activeFilters.length > 0) {
      const filtersString = activeFilters.join(',')

      setSearchParams({ f: filtersString })
    } else {
      setSearchParams()
    }
  }, [activeFilters, setSearchParams])

  const handleChangeSelectedRoles = (e: any, role: Role) => {
    const isChecked = e.currentTarget.checked

    isChecked
      ? dispatch(setSelectedFilter({ action: 'add', filterValue: role }))
      : dispatch(setSelectedFilter({ action: 'remove', filterValue: role }))
  }

  return (
    <div className={className ? className : ''}>
      <input
        checked={activeFilters.includes(optionRole)}
        className={s.dropdownItem__input}
        id={optionRole}
        onChange={e => handleChangeSelectedRoles(e, optionRole)}
        type={'checkbox'}
      />
      <label htmlFor={optionRole}>{optionLabel}</label>
    </div>
  )
}
