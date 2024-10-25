import { Role } from '@/app/app-api.types'
import { FilterByRole } from '@/components/sidebar/filters-section/filter-by-role/filter-by-role'

import s from './filters-section.module.scss'

export const FiltersSection = ({ selectedRoles, setSelectedRoles, setStatusChecked }: any): any => {
  const handleCheckboxChange = (role: Role) => {
    setSelectedRoles((prev: Role[]) =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    )
  }

  const handleStatusChecked = (e: any) => {
    setStatusChecked(e.currentTarget.checked)
  }

  return (
    <fieldset className={s.filtersSetWrapper}>
      <legend className={s.filtersSetLegend}>Фильтрация</legend>
      <div className={s.filterByRole}>
        <FilterByRole
          handleCheckboxChange={handleCheckboxChange}
          selectedRoles={selectedRoles}
          setSelectedRoles={setSelectedRoles}
        />
      </div>
      <div className={s.filterByStatus}>
        <input id={'status'} onChange={handleStatusChecked} type={'checkbox'} />
        <label htmlFor={'status'}>в архиве</label>
      </div>
    </fieldset>
  )
}
