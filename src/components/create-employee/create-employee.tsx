import { ComponentPropsWithoutRef, forwardRef, useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/app/hooks'
import { addEmployee } from '@/components/employees-table/employeesSlice'

import s from './create-employee.module.scss'

export const CreateEmployee = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { handleSubmit, register, reset } = useForm()
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const onSubmit = async (data: any) => {
    console.log(data)
    setIsButtonDisabled(true)
    try {
      await dispatch(addEmployee(data))
    } catch (e) {
      console.log(e)
    } finally {
      reset()
      setTimeout(() => {
        setIsButtonDisabled(false)
      }, 300)
    }
  }

  const handleEscape = () => {
    reset()
    navigate('/new-path')
  }

  return (
    <div className={s.wrapper}>
      Добавить сотрудника
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <FormInput label={'Имя'} {...register('name', { maxLength: 30, required: true })} />
        <FormInput label={'Телефон'} {...register('phone', { required: true })} />
        <FormInput label={'Должность'} {...register('role', { required: true })} />
        <FormInput label={'Дата рождения'} {...register('birthday', { required: true })} />
        <FormButton disabled={isButtonDisabled} type={'submit'}>
          Создать
        </FormButton>
        <FormButton onClick={handleEscape} type={'button'}>
          Отмена
        </FormButton>
      </form>
    </div>
  )
}

type FormInputProps = {
  className?: string
  errorMsg?: string
  label: string
  placeholder?: string
} & ComponentPropsWithoutRef<'input'>

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, name, placeholder, ...rest }, ref) => {
    const id = useId()

    return (
      <div className={className}>
        <label htmlFor={id}>{label}</label>
        <input
          className={s.input}
          id={id}
          name={name}
          placeholder={placeholder}
          ref={ref}
          type={'text'}
          {...rest}
        />
      </div>
    )
  }
)

type FormButtonProps = {
  className?: string
  onClick?: () => void
  type?: 'button' | 'reset' | 'submit'
} & ComponentPropsWithoutRef<'button'>

const FormButton = ({ children, className, disabled, onClick, type }: FormButtonProps) => {
  return (
    <div className={className}>
      <button className={s.button} disabled={disabled} onClick={onClick} type={type}>
        {children}
      </button>
    </div>
  )
}
