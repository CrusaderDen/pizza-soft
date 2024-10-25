import { Roles } from 'App'
import { Select } from 'components/select/select'

import s from './sidebar.module.scss'

export const Sidebar = ({ selectedRoles, setSelectedRoles, setStatusChecked }: any) => {
  const handleCheckboxChange = (role: Roles) => {
    setSelectedRoles((prev: Roles[]) =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    )
  }

  const handleClearFilter = () => setSelectedRoles([])

  const handleStatusChecked = (e: any) => {
    setStatusChecked(e.currentTarget.checked)
  }

  return (
    <div className={s.sidebar}>
      <div style={{ alignSelf: 'center', fontSize: '24px', fontWeight: '700' }}>Pizza HRM</div>
      <fieldset
        style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '30px' }}
      >
        <legend>Фильтрация</legend>
        <div className={s.filterRoleWrapper}>
          <Select handleCheckboxChange={handleCheckboxChange} selectedRoles={selectedRoles} />
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
        <div className={s.filterStatusWrapper}>
          <input id={'status'} onChange={handleStatusChecked} type={'checkbox'} />
          <label htmlFor={'status'}>в архиве</label>
        </div>
      </fieldset>
    </div>
  )
}
