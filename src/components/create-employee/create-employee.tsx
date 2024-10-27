import { ComponentPropsWithoutRef, forwardRef, useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Employee } from '@/app/app-api.types'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { PATHS } from '@/app/paths'
import { notifyError, notifySuccess } from '@/app/toastConfig'
import { addEmployee } from '@/components/employees-table/employeesSlice'
import clsx from 'clsx'

import s from './create-employee.module.scss'

export const CreateEmployee = () => {
  return (
    <div className={s.wrapper}>
      <EmployeeForm dispatchVariant={addEmployee} typeForm={'create-employee'} />
    </div>
  )
}

type EmployeeFormProps = {
  dispatchVariant: any
  id?: number
  setOpen?: (open: boolean) => void
  typeForm: 'create-employee' | 'edit-form'
}

export const EmployeeForm = ({ dispatchVariant, id, setOpen, typeForm }: EmployeeFormProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { employees } = useAppSelector(state => state.employees)

  const { handleSubmit, register, reset, setValue } = useForm()
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  function filterById(employees: Employee[], id: number): Employee | undefined {
    return employees.find(employee => employee.id === id)
  }

  if (id) {
    const employee = filterById(employees, id)

    setValue('name', employee?.name)
    setValue('role', employee?.role)
    setValue('birthday', employee?.birthday)
    setValue('phone', employee?.phone)
    setValue('isArchive', employee?.isArchive)
  }

  const onSubmit = async (data: any) => {
    setIsButtonDisabled(true)
    try {
      await dispatch(dispatchVariant({ ...data, id }))
      notifySuccess(
        setOpen
          ? 'Данные сотрудника успешно изменены'
          : 'Новый сотрудник сохранён в базу. Продолжайте заведение, или нажмите "отмена"'
      )
    } catch (e) {
      notifyError(`Ошибка ${e}. Попробуйте позже или обратитесь в поддержку. `)
      console.log(e)
    } finally {
      reset()
      setOpen && setOpen(false)
      setTimeout(() => {
        // блокировка кнопки на имитационное время выполнения запроса
        setIsButtonDisabled(false)
      }, 300)
    }
  }

  const handleEscape = () => {
    if (setOpen) {
      setOpen(false)
    } else {
      reset()
      navigate(PATHS.TABLE)
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <span className={s.title}>
        {typeForm === 'create-employee' ? 'Добавить сотрудника' : 'Редактировать'}
      </span>
      <FormInput
        className={s.formInput}
        label={'Имя'}
        {...register('name', { maxLength: 30, required: true })}
      />
      <FormInput
        className={s.formInput}
        label={'Телефон'}
        {...register('phone', { required: true })}
      />
      <FormInput
        className={s.formInput}
        label={'Должность'}
        {...register('role', { required: true })}
      />
      <FormInput
        className={s.formInput}
        label={'Дата рождения'}
        {...register('birthday', { required: true })}
      />{' '}
      <FormInput
        className={s.formCheckbox}
        label={'Архив'}
        {...register('isArchive')}
        type={'checkbox'}
      />
      <div className={s.buttonWrapper}>
        <FormButton disabled={isButtonDisabled} type={'submit'}>
          {typeForm === 'create-employee' ? 'Создать' : 'Сохранить изменения'}
        </FormButton>
        <FormButton onClick={handleEscape} type={'button'}>
          Отмена
        </FormButton>
      </div>
    </form>
  )
}

type FormInputProps = {
  className?: string
  errorMsg?: string
  label: string
  placeholder?: string
  type?: string
} & ComponentPropsWithoutRef<'input'>

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, name, placeholder, type = 'text', ...rest }, ref) => {
    const id = useId()

    return (
      <div className={className}>
        <label className={s.label} htmlFor={id}>
          {label}
        </label>
        <input
          className={s.input}
          id={id}
          name={name}
          placeholder={placeholder}
          ref={ref}
          type={type}
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
    <button className={clsx(s.button, className)} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  )
}
