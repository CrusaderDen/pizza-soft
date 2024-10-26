import { Link } from 'react-router-dom'

import { Role } from '@/app/app-api.types'
import { FiltersSection } from '@/components/sidebar/filters-section/filters-section'

import s from './sidebar.module.scss'

type SidebarProps = {
  selectedRoles: Role[]
  setSelectedRoles: (selectedRoles: Role[]) => void
  setStatusChecked: (checked: boolean) => void
}

export const Sidebar = ({ selectedRoles, setSelectedRoles, setStatusChecked }: SidebarProps) => {
  return (
    <div className={s.sidebar}>
      <div style={{ alignSelf: 'center', fontSize: '24px', fontWeight: '700' }}>Pizza HRM</div>
      <FiltersSection
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
        setStatusChecked={setStatusChecked}
      />
      <Link to={'/create-employee'}>Create Employee</Link>
    </div>
  )
}
