import { Role } from '@/app/app-api.types'
import { FilterByRole } from '@/components/sidebar/filters-section/filter-by-role/filter-by-role'

import s from './filters-section.module.scss'

type FiltersSectionProps = {
  selectedRoles: Role[]
  setSelectedRoles: (selectedRoles: Role[]) => void
  setStatusChecked: (checked: boolean) => void
}

export const FiltersSection = (props: FiltersSectionProps) => {
  const { selectedRoles, setSelectedRoles, setStatusChecked } = props

  const handleCheckboxChange = (role: Role) => {
    const newSelectedRoles = selectedRoles.includes(role)
      ? selectedRoles.filter(r => r !== role)
      : [...selectedRoles, role]

    setSelectedRoles(newSelectedRoles)
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
