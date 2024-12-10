import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { FilterByRoleDropdown } from '@/app/layouts/main-layout/sidebar/filters/filter-by-role-dropdown/filter-by-role-dropdown'
import { FilterOption } from '@/app/layouts/main-layout/sidebar/filters/filter-option/filter-option'
import { useAppSelector } from '@/app/store/store'

import s from './filters-section.module.scss'

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
  }, [activeFilters])

  return (
    <fieldset className={s.filtersSetWrapper}>
      <legend className={s.filtersSetLegend}>Фильтрация</legend>
      <FilterByRoleDropdown />
      <FilterOption className={s.filterByStatus} role={'archived'} />
    </fieldset>
  )
}
