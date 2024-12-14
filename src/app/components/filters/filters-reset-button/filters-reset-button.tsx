import { useSearchParams } from 'react-router-dom'

import { CloseIcon } from '@/assets/close-icon'

import s from '@/app/components/filters/filters-reset-button/filters-reset-button.module.scss'

export const FiltersResetButton = () => {
  const [_, setSearchParams] = useSearchParams()
  const query = new URLSearchParams(window.location.search)
  const handler = () => {
    query.delete('f')
    setSearchParams(query)
  }

  return (
    <button className={s.filterIndicator} onClick={handler} type={'button'}>
      <CloseIcon />
    </button>
  )
}
