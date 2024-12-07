import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { FilterByRole } from '@/app/layouts/sidebar/filters/filter-by-role/filter-by-role'
import { applyFilters } from '@/app/store/app-slice'
import { useAppDispatch, useAppSelector } from '@/app/store/store'

import s from './filters-section.module.scss'

export const FiltersSection = () => {
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

  const handleStatusChecked = (e: any) => {
    const isChecked = e.currentTarget.checked

    isChecked
      ? dispatch(applyFilters({ action: 'add', filterValue: 'archived' }))
      : dispatch(applyFilters({ action: 'remove', filterValue: 'archived' }))
  }

  return (
    <fieldset className={s.filtersSetWrapper}>
      <legend className={s.filtersSetLegend}>Фильтрация</legend>
      <div className={s.filterByRole}>
        <FilterByRole />
      </div>
      <div className={s.filterByStatus}>
        <input
          checked={activeFilters.includes('archived')}
          id={'status'}
          onChange={handleStatusChecked}
          type={'checkbox'}
        />
        <label htmlFor={'status'}>в архиве</label>
      </div>
    </fieldset>
  )
}
