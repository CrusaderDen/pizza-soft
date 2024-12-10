import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { FilterRole } from '@/api/app-api.types'
import { FilterDropdown } from '@/app/components/filters/filter-dropdown/filter-dropdown'
import { FilterOption } from '@/app/components/filters/filter-option/filter-option'
import { useAppSelector } from '@/app/store/store'

import s from './sidebar-filters.module.scss'

const RolesForDropdown: FilterRole[] = [
  ['waiter', 'Официанты'],
  ['driver', 'Водители'],
  ['cook', 'Повара'],
]

const RoleForSingleOption: FilterRole = ['archived', 'в архиве']

export const SidebarFilters = () => {
  const activeFilters = useAppSelector(state => state.employees.activeFilters)

  const [_, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (activeFilters.length > 0) {
      const filtersString = activeFilters.join(',')

      setSearchParams({ f: filtersString })
    } else {
      setSearchParams()
    }
  }, [activeFilters, setSearchParams])

  return (
    <fieldset className={s.filtersSetWrapper}>
      <legend className={s.filtersSetLegend}>Фильтрация</legend>
      <FilterDropdown className={s.filterByRole} items={RolesForDropdown} />
      <FilterOption className={s.filterByStatus} role={RoleForSingleOption} />
    </fieldset>
  )
}
