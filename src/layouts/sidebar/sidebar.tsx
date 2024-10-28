import { Link, useLocation } from 'react-router-dom'

import { PATHS } from '@/common/paths'
import { FiltersSection } from '@/layouts/sidebar/filters/filters-section'
import clsx from 'clsx'

import s from './sidebar.module.scss'

export const Sidebar = () => {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className={s.sidebar}>
      <div className={s.title}>Pizza-soft</div>
      <div className={s.linksWrapper}>
        <Link
          className={clsx(s.link, currentPath === PATHS.TABLE ? s.linkIsActive : '')}
          to={PATHS.TABLE}
        >
          Список персонала
        </Link>
        <Link
          className={clsx(s.link, currentPath === PATHS.CREATE_EMPLOYEE ? s.linkIsActive : '')}
          to={PATHS.CREATE_EMPLOYEE}
        >
          Добавить сотрудника
        </Link>
      </div>
      <FiltersSection />
    </div>
  )
}
