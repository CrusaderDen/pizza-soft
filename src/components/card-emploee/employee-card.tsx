import { Employee } from '@/backend-data/emploees-types'

import s from './employee-card.module.scss'

type CardEmployeeProps = {
  employee: Employee
}

export const EmployeeCard = ({ employee }: CardEmployeeProps) => {
  return (
    <div className={s.cardWrapper}>
      <div className={s.name}>{employee.name}</div>
      <div className={s.phone}>{employee.phone}</div>
      <div className={s.role}>{employee.role}</div>
    </div>
  )
}
