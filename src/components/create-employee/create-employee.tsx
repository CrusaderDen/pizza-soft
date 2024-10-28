import { ComponentPropsWithoutRef, Ref, forwardRef, useId, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
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

  const { control, handleSubmit, register, reset, setValue } = useForm()
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
      setValue('phone', '')
      setValue('birthday', '')
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
      {/*<FormInput*/}
      {/*  className={s.formInput}*/}
      {/*  label={'Телефон'}*/}
      {/*  {...register('phone', { required: true })}*/}
      {/*/>*/}
      <CustomInput
        className={s.formInput}
        control={control}
        label={'Телефон'}
        mask={'+7 (999) 999-99-99'}
        name={'phone'}
        placeholder={'+7 (___) ___-__-__'}
      />
      <FormInput
        className={s.formInput}
        label={'Должность'}
        type={'role'}
        {...register('role', { required: true })}
      />
      {/*<FormInput*/}
      {/*  className={s.formInput}*/}
      {/*  label={'Дата рождения'}*/}
      {/*  {...register('birthday', { required: true })}*/}
      {/*/>{' '}*/}
      <CustomInput
        className={s.formInput}
        control={control}
        label={'Дата рождения'}
        mask={'99.99.9999'}
        name={'birthday'}
        placeholder={'дд.мм.гггг'}
      />
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
} & ComponentPropsWithoutRef<'input'> &
  ComponentPropsWithoutRef<'select'>

const FormInput = forwardRef<HTMLInputElement | HTMLSelectElement, FormInputProps>(
  ({ className, label, name, placeholder, type = 'text', ...rest }, ref) => {
    const id = useId()

    if (type === 'role') {
      return (
        <div className={className}>
          <label className={s.label} htmlFor={id}>
            {label}
          </label>
          <select
            className={s.input}
            id={id}
            name={name}
            ref={ref as Ref<HTMLSelectElement>}
            {...rest}
          >
            <option value={'-'}>- выбрать -</option>
            <option value={'cook'}>cook</option>
            <option value={'driver'}>driver</option>
            <option value={'waiter'}>waiter</option>
          </select>
        </div>
      )
    }

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
          ref={ref as Ref<HTMLInputElement>}
          type={type}
          {...rest}
        />
      </div>
    )
  }
)

const CustomInput = ({
  className,
  control,
  label,
  mask,
  name,
  placeholder,
  type = 'text',
  ...rest
}: any) => {
  const id = useId()
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController({
    control,
    defaultValue: '',
    name,
  })

  return (
    <div className={className}>
      <label className={s.label} htmlFor={id}>
        {label}
      </label>
      <InputMask
        className={s.input}
        id={id}
        mask={mask}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        type={type}
        value={value}
        {...rest}
      >
        {/*{inputProps => <input id={name} {...inputProps} />}*/}
      </InputMask>
      {error && <span style={{ color: 'red' }}>{error.message}</span>}
    </div>
  )
}

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
