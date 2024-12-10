import { Role } from '@/api/app-api.types'
import { AllFiltersResetButton } from '@/app/layouts/main-layout/sidebar/filters/filter-action-buttons/all-filter-reset-button/all-filters-reset-button'
import { FilterOption } from '@/app/layouts/main-layout/sidebar/filters/filter-option/filter-option'
import { useAppSelector } from '@/app/store/store'
import { ArrowDownIcon } from '@/assets/arrow-down-icon'
import { Content, Item, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu'

import s from './filter-by-role-dropdown.module.scss'

export const FilterByRoleDropdown = () => {
  const activeFilters = useAppSelector(state => state.employees.activeFilters)

  return (
    <div className={s.filterByRole}>
      <Root>
        <Trigger className={s.selectTrigger}>
          <div>По должности</div>
          <ArrowDownIcon className={s.arrowIcon} />
        </Trigger>
        <Portal>
          <Content align={'end'} className={s.dropdownContent} side={'bottom'}>
            <FilterItem role={'waiter'} />
            <FilterItem role={'driver'} />
            <FilterItem role={'cook'} />
          </Content>
        </Portal>
      </Root>
      {activeFilters && !!activeFilters.length && <AllFiltersResetButton />}
    </div>
  )
}

const FilterItem = ({ role }: { role: Role }) => {
  return (
    <Item asChild onSelect={event => event.preventDefault()}>
      <FilterOption className={s.dropdownItem} role={role} />
    </Item>
  )
}
