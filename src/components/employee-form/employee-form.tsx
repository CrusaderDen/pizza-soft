import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Employee } from '@/api/app-api.types'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { PATHS } from '@/common/paths'
import { notifyError, notifySuccess } from '@/common/toastConfig'
import { FormButton } from '@/components/employee-form/form-button/form-button'
import { CustomInput, FormInput } from '@/components/employee-form/form-input/form-input'

import s from './employee-form.module.scss'

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