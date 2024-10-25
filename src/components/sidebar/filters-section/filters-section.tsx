import { Roles } from '@/App'
import { FilterByRole } from '@/components/sidebar/filters-section/filter-by-role/filter-by-role'

import s from './filters-section.module.scss'

export const FiltersSection = ({ selectedRoles, setSelectedRoles, setStatusChecked }: any): any => {
  const handleCheckboxChange = (role: Roles) => {
    setSelectedRoles((prev: Roles[]) =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    )
  }

  const handleStatusChecked = (e: any) => {
    setStatusChecked(e.currentTarget.checked)
  }

  return (
    <fieldset
      style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '30px' }}
    >
      <legend>Фильтрация</legend>
      <div className={s.filterRoleWrapper}>
        <FilterByRole
          handleCheckboxChange={handleCheckboxChange}
          selectedRoles={selectedRoles}
          setSelectedRoles={setSelectedRoles}
        />
      </div>
      <div className={s.filterStatusWrapper}>
        <input id={'status'} onChange={handleStatusChecked} type={'checkbox'} />
        <label htmlFor={'status'}>в архиве</label>
      </div>
    </fieldset>
  )
}
