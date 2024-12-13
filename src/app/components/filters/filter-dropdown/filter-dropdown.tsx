import { useSearchParams } from 'react-router-dom'

import { FilterRole } from '@/api/app-api.types'
import { FilterOption } from '@/app/components/filters/filter-option/filter-option'
import { FiltersResetButton } from '@/app/components/filters/filters-reset-button/filters-reset-button'
import { ArrowDownIcon } from '@/assets/arrow-down-icon'
import { Content, Item, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu'

import s from '@/app/components/filters/filter-dropdown/filter-dropdown.module.scss'

type FilterDropdownProps = {
  className?: string
  items: FilterRole[]
}

export const FilterDropdown = ({ className, items }: FilterDropdownProps) => {
  const [searchParams] = useSearchParams()

  const filterItems = items.map(item => <FilterItem key={item[0]} role={item} />)

  return (
    <div className={className ? className : ''}>
      <Root>
        <Trigger className={s.selectTrigger}>
          <div>По должности</div>
          <ArrowDownIcon className={s.arrowIcon} />
        </Trigger>
        <Portal>
          <Content align={'end'} className={s.dropdownContent} side={'bottom'}>
            {filterItems}
          </Content>
        </Portal>
      </Root>
      {searchParams.get('f') && <FiltersResetButton />}
    </div>
  )
}

const FilterItem = ({ role }: { role: FilterRole }) => {
  return (
    <Item asChild onSelect={event => event.preventDefault()}>
      <FilterOption className={s.dropdownItem} role={role} />
    </Item>
  )
}
