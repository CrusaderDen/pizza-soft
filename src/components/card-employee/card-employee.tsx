import { Employee } from '@/backend-data/employees-types'

import s from './card-employee.module.scss'

type CardEmployeeProps = {
  employee: Employee
}

export const CardEmployee = ({ employee }: CardEmployeeProps) => {
  return (
    <div className={s.cardWrapper}>
      <div className={s.name}>{employee.name}</div>
      <div className={s.phone}>{employee.phone}</div>
      <div className={s.role}>{employee.role}</div>
      <div className={s.birthday}>{employee.birthday}</div>
      <div className={s.isArchive}>{employee.isArchive ? 'В архиве' : ''}</div>
    </div>
  )
}
