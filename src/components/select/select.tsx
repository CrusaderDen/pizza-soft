import { Content, Item, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu'
import { Roles } from 'App'

import s from './select.module.scss'

type SelectProps = {
  handleCheckboxChange: (role: Roles) => void
  selectedRoles: Roles[]
}

export const Select = ({ handleCheckboxChange, selectedRoles }: SelectProps) => {
  return (
    <Root>
      <Trigger className={s.selectTrigger}>
        <div>По должности</div>
        <div className={s.arrowIcon}>⬇</div>
      </Trigger>
      <Portal>
        <Content align={'end'} className={s.dropdownContent} side={'bottom'}>
          <Item asChild className={s.dropdownItem} onSelect={event => event.preventDefault()}>
            <div>
              <input
                checked={selectedRoles.includes('waiter')}
                className={s.dropdownItem__input}
                id={'waiter'}
                onChange={() => handleCheckboxChange('waiter')}
                type={'checkbox'}
              />
              <label htmlFor={'waiter'}>Официанты</label>
            </div>
          </Item>
          <Item asChild className={s.dropdownItem} onSelect={event => event.preventDefault()}>
            <div>
              <input
                checked={selectedRoles.includes('driver')}
                className={s.dropdownItem__input}
                id={'driver'}
                onChange={() => handleCheckboxChange('driver')}
                type={'checkbox'}
              />
              <label htmlFor={'driver'}>Водители</label>
            </div>
          </Item>
          <Item asChild className={s.dropdownItem} onSelect={event => event.preventDefault()}>
            <div>
              <input
                checked={selectedRoles.includes('cook')}
                className={s.dropdownItem__input}
                id={'cook'}
                onChange={() => handleCheckboxChange('cook')}
                type={'checkbox'}
              />
              <label htmlFor={'cook'}>Повара</label>
            </div>
          </Item>
        </Content>
      </Portal>
    </Root>
  )
}
