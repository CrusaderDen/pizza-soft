import { applyFilters } from '@/app/store/app-slice'
import { useAppDispatch } from '@/app/store/store'
import { CloseIcon } from '@/assets/close-icon'

import s from './all-filters-reset-button.module.scss'

export const AllFiltersResetButton = () => {
  const dispatch = useAppDispatch()

  const handler = () => dispatch(applyFilters({ action: 'clear' }))

  return (
    <button className={s.filterIndicator} onClick={handler} type={'button'}>
      <CloseIcon />
    </button>
  )
}
