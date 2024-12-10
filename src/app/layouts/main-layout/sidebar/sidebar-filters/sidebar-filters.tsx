import { FilterDropdown } from '@/app/components/filters/filter-dropdown/filter-dropdown'
import { FilterOption } from '@/app/components/filters/filter-option/filter-option'
import {
  RoleForSingleOption,
  RolesForDropdown,
} from '@/app/layouts/main-layout/sidebar/sidebar-filters/constants/constants'

import s from './sidebar-filters.module.scss'

export const SidebarFilters = () => {
  return (
    <fieldset className={s.filtersSetWrapper}>
      <legend className={s.filtersSetLegend}>Фильтрация</legend>
      <FilterDropdown className={s.filterByRole} items={RolesForDropdown} />
      <FilterOption className={s.filterByStatus} role={RoleForSingleOption} />
    </fieldset>
  )
}
