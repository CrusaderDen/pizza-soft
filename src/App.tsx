import { useEffect, useState } from 'react'

import { Employee, Employees } from '@/backend-data/emploees-types'
import { EmployeeCard } from '@/components/card-emploee/employee-card'
import { Content, Item, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu'

import s from './App.module.scss'

import serverData from './backend-data/employees.json'

type Roles = 'cook' | 'driver' | 'waiter'

const sortedData = serverData.sort((a, b) => (a.role > b.role ? -1 : 1))

function App() {
  const [selectedRoles, setSelectedRoles] = useState<Roles[]>([])

  const employees: Employees = sortedData

  const filteredEmployees = selectedRoles.length
    ? employees.filter(employee => selectedRoles.includes(employee.role as Roles))
    : employees

  const handleCheckboxChange = (role: Roles) => {
    setSelectedRoles(prev => (prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]))
  }

  const handleClearFilter = () => setSelectedRoles([])

  return (
    <div className={s.appLayout}>
      <div className={s.employeeTable}>
        {filteredEmployees.map((employee: Employee) => (
          <EmployeeCard employee={employee} key={employee.id} />
        ))}
      </div>
      <div className={s.sidebar}>
        <div style={{ alignSelf: 'center' }}>Тестовое</div>
        <div className={s.filterWrapper}>
          <Select
            handleCheckboxChange={handleCheckboxChange}
            selectedRoles={selectedRoles}
            setSelectedRoles={setSelectedRoles}
          />
          {!!selectedRoles.length && (
            <button className={s.filterIndicator} onClick={handleClearFilter} type={'button'}>
              <svg
                fill={'none'}
                height={'1em'}
                viewBox={'0 0 24 24'}
                width={'1em'}
                xmlns={'http://www.w3.org/2000/svg'}
              >
                <g clipPath={'url(#close_svg__a)'}>
                  <path
                    d={
                      'm13.41 12 4.3-4.29a1.004 1.004 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1.004 1.004 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 .325 1.639 1 1 0 0 0 1.095-.219l4.29-4.3 4.29 4.3a1.002 1.002 0 0 0 1.639-.325 1 1 0 0 0-.219-1.095z'
                    }
                    fill={'currentcolor'}
                  ></path>
                </g>
                <defs>
                  <clipPath id={'close_svg__a'}>
                    <path d={'M0 0h24v24H0z'} fill={'#fff'}></path>
                  </clipPath>
                </defs>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

const Select = ({ handleCheckboxChange, selectedRoles }: any) => {
  return (
    <Root>
      <Trigger className={s.selectTrigger}>
        <div>Фильтр по профессии</div>
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
