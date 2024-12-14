import { ChangeEvent, forwardRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import { FilterRole, Role } from '@/api/app-api.types'
import { useUpdateSearchParam } from '@/utils/use-update-search-param'

import s from '@/app/components/filters/filter-option/filter-option.module.scss'

type FilterOptionProps = {
  className?: string
  role: FilterRole
}

export const FilterOption = forwardRef<HTMLInputElement, FilterOptionProps>(
  ({ className, role }, ref) => {
    const [searchParams] = useSearchParams()
    const { updateSearchParam } = useUpdateSearchParam()

    const optionRole = role[0] as Role
    const optionLabel = role[1]
    const prevFiltration = searchParams.get('f') || ''
    const isChecked = prevFiltration?.includes(optionRole) || false

    const handleChangeSelectedRoles = (e: ChangeEvent<HTMLInputElement>, role: Role) => {
      const isChecked = e.currentTarget.checked

      updateSearchParam({ isChecked, param: 'f', prevFiltration, role })
    }

    return (
      <div className={className ? className : ''}>
        <input
          checked={isChecked}
          className={s.filter_checkbox}
          id={optionRole}
          onChange={e => handleChangeSelectedRoles(e, optionRole)}
          ref={ref}
          type={'checkbox'}
        />
        <label htmlFor={optionRole}>{optionLabel}</label>
      </div>
    )
  }
)
