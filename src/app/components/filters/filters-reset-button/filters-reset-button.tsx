import { CloseIcon } from '@/assets/close-icon'
import { useFilterSearchParam } from '@/utils/remove-search-param'

import s from '@/app/components/filters/filters-reset-button/filters-reset-button.module.scss'

export const FiltersResetButton = () => {
  const { removeParam } = useFilterSearchParam()
  const handler = () => removeParam('f')

  return (
    <button className={s.filterIndicator} onClick={handler} type={'button'}>
      <CloseIcon />
    </button>
  )
}
