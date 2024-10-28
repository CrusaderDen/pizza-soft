import { useAppDispatch } from '@/app/hooks'
import { setSelectedEmployeesStatus } from '@/components/employees-table/employees-slice'
import { FilterByRole } from '@/layouts/sidebar/filters/filter-by-role/filter-by-role'

import s from './filters-section.module.scss'

export const FiltersSection = () => {
  const dispatch = useAppDispatch()

  const handleStatusChecked = (e: any) => {
    const isChecked = e.currentTarget.checked

    dispatch(setSelectedEmployeesStatus(isChecked))
  }

  return (
    <fieldset className={s.filtersSetWrapper}>
      <legend className={s.filtersSetLegend}>Фильтрация</legend>
      <div className={s.filterByRole}>
        <FilterByRole />
      </div>
      <div className={s.filterByStatus}>
        <input id={'status'} onChange={handleStatusChecked} type={'checkbox'} />
        <label htmlFor={'status'}>в архиве</label>
      </div>
    </fieldset>
  )
}
