import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Role } from '@/api/app-api.types'
import { applyFilters } from '@/app/store/app-slice'
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { ArrowDownIcon } from '@/assets/arrow-down-icon'
import { CloseIcon } from '@/assets/close-icon'
import { Content, Item, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu'

import s from './filter-by-role.module.scss'

export const FilterByRole = () => {
  const activeFilters = useAppSelector(state => state.employees.activeFilters)

  return (
    <>
      <Root>
        <Trigger asChild>
          <div className={s.selectTrigger}>
            <div>По должности</div>
            <ArrowDownIcon className={s.arrowIcon} />
          </div>
        </Trigger>
        <Portal>
          <Content align={'end'} className={s.dropdownContent} side={'bottom'}>
            <FilterItem role={'waiter'} />
            <FilterItem role={'driver'} />
            <FilterItem role={'cook'} />
          </Content>
        </Portal>
      </Root>
      {activeFilters && !!activeFilters.length && <SelectClearBtn />}
    </>
  )
}

type FilterItemProps = {
  role: Role
}

const FilterItem = ({ role }: FilterItemProps) => {
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
    default:
      console.log('Error with employees filter item label')
  }

  return (
    <Item asChild className={s.dropdownItem} onSelect={event => event.preventDefault()}>
      <div>
        <input
          checked={activeFilters.includes(role)}
          className={s.dropdownItem__input}
          id={role}
          onChange={e => handleChangeSelectedRoles(e, role)}
          type={'checkbox'}
        />
        <label htmlFor={role}>{label}</label>
      </div>
    </Item>
  )
}

const SelectClearBtn = () => {
  const dispatch = useAppDispatch()

  const clearActiveFilter = () => dispatch(applyFilters({ action: 'clear' }))

  return (
    <button className={s.filterIndicator} onClick={clearActiveFilter} type={'button'}>
      <CloseIcon />
    </button>
  )
}
