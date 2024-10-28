import { Role } from '@/api/app-api.types'
import { setSelectedEmployeesRole } from '@/app/app-slice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ArrowDownIcon } from '@/assets/arrow-down-icon'
import { CloseIcon } from '@/assets/close-icon'
import { Content, Item, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu'

import s from './filter-by-role.module.scss'

export const FilterByRole = () => {
  const { selectedEmployeesRole } = useAppSelector(state => state.employees)

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
            <FilterItem itemRole={'waiter'} selectedEmployeesRole={selectedEmployeesRole} />
            <FilterItem itemRole={'driver'} selectedEmployeesRole={selectedEmployeesRole} />
            <FilterItem itemRole={'cook'} selectedEmployeesRole={selectedEmployeesRole} />
          </Content>
        </Portal>
      </Root>
      {!!selectedEmployeesRole.length && <SelectClearBtn />}
    </>
  )
}

type FilterItemProps = {
  itemRole: Role
  selectedEmployeesRole: Role[]
}

const FilterItem = ({ itemRole, selectedEmployeesRole }: FilterItemProps) => {
  const dispatch = useAppDispatch()
  const handleChangeSelectedRoles = (role: Role) => {
    const newSelectedRoles = selectedEmployeesRole.includes(role)
      ? selectedEmployeesRole.filter(r => r !== role)
      : [...selectedEmployeesRole, role]

    dispatch(setSelectedEmployeesRole(newSelectedRoles))
  }

  let itemLabel = ''

  switch (itemRole) {
    case 'waiter':
      itemLabel = 'Официанты'
      break
    case 'driver':
      itemLabel = 'Водители'
      break
    case 'cook':
      itemLabel = 'Повара'
      break
    default:
      console.log('Error with employees filter item label')
  }

  return (
    <Item asChild className={s.dropdownItem} onSelect={event => event.preventDefault()}>
      <div>
        <input
          checked={selectedEmployeesRole.includes(itemRole)}
          className={s.dropdownItem__input}
          id={itemRole}
          onChange={() => handleChangeSelectedRoles(itemRole)}
          type={'checkbox'}
        />
        <label htmlFor={itemRole}>{itemLabel}</label>
      </div>
    </Item>
  )
}

const SelectClearBtn = () => {
  const dispatch = useAppDispatch()
  const handleClearFilter = () => dispatch(setSelectedEmployeesRole([]))

  return (
    <button className={s.filterIndicator} onClick={handleClearFilter} type={'button'}>
      <CloseIcon />
    </button>
  )
}
