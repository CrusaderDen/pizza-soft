import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './form-employee-button.module.scss'

type FormButtonProps = {
  className?: string
  onClick?: () => void
  type?: 'button' | 'reset' | 'submit'
} & ComponentPropsWithoutRef<'button'>

export const FormEmployeeButton = ({
  children,
  className,
  disabled,
  onClick,
  type,
}: FormButtonProps) => {
  return (
    <button className={clsx(s.button, className)} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  )
}
