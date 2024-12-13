import { SidebarFilters } from '@/app/components/sidebar/sidebar-filters/sidebar-filters'
import { SidebarLink } from '@/app/components/sidebar/sidebar-link/sidebar-link'
import { PATHS } from '@/app/router/paths'

import s from './sidebar.module.scss'

export const Sidebar = () => {
  return (
    <div className={s.sidebar}>
      <div className={s.title}>Pizza-soft</div>
      <div className={s.sidebarContentWrapper}>
        <div className={s.linksWrapper}>
          <SidebarLink to={PATHS.TABLE}>Список персонала</SidebarLink>
          <SidebarLink to={PATHS.CREATE_EMPLOYEE}>Добавить сотрудника</SidebarLink>
        </div>
        <SidebarFilters />
      </div>
    </div>
  )
}
