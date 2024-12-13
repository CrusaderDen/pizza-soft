import { setSelectedSortField, setSelectedSortOrder } from '@/app/store/app-slice'
import { SortField } from '@/app/store/app-slice.types'
import { useAppDispatch, useAppSelector } from '@/app/store/store'

import s from './sort-button.module.scss'

type SortArrows = Record<'asc' | 'desc' | 'unselected', string>

const sortArrows: SortArrows = {
  asc: '↑',
  desc: '↓',
  unselected: '↕',
}

type SortButtonProps = {
  field: SortField
}

export const SortButton = ({ field }: SortButtonProps) => {
  const dispatch = useAppDispatch()
  const sortOrder = useAppSelector(state => state.employees.sortOrder)
  const sortLabel = sortArrows[sortOrder]

  const handleSort = () => {
    dispatch(setSelectedSortField(field))

    if (sortOrder === 'unselected') {
      dispatch(setSelectedSortOrder('desc'))
    }
    if (sortOrder === 'desc') {
      dispatch(setSelectedSortOrder('asc'))
    }
    if (sortOrder === 'asc') {
      dispatch(setSelectedSortOrder('unselected'))
    }
  }

  return (
    <button className={s.sortBtn} onClick={handleSort} type={'button'}>
      {sortLabel}
    </button>
  )
}
