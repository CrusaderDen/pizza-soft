import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Employee } from '@/api/app-api.types'
import { PATHS } from '@/app/router/paths'
import { FormEmployeeButton } from '@/app/shared/form-employee/form-employee-button/form-employee-button'
import { FormEmployeeInput } from '@/app/shared/form-employee/form-employee-input/form-employee-input'
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { customValidator } from '@/utils/custom-validator'
import { notifyError, notifySuccess } from '@/utils/toastConfig'

import s from './form-employee.module.scss'

type EmployeeFormProps = {
  dispatchVariant: any
  id?: number
  setOpen?: (open: boolean) => void
  typeForm: 'create-employee-page' | 'edit-form'
}
export const FormEmployee = ({ dispatchVariant, id, setOpen, typeForm }: EmployeeFormProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { employees } = useAppSelector(state => state.employees)

  const { control, handleSubmit, reset, setValue } = useForm()
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [validateError, setValidateError] = useState({})

  function filterById(employees: Employee[], id: number): Employee | undefined {
    return employees.find(employee => employee.id === id)
  }

  if (id) {
    const employee = filterById(employees, id)

    if (employee) {
      setValue('name', employee.name)
      setValue('role', employee.role)
      setValue('birthday', employee.birthday)
      setValue('phone', employee.phone)
      setValue('isArchive', employee.isArchive)
    }
  }

  const onSubmit = async (data: any) => {
    setValidateError({})
    const errors = customValidator(data)

    if (Object.keys(errors).length !== 0) {
      setValidateError(errors)

      return
    }

    setIsButtonDisabled(true)

    try {
      await dispatch(dispatchVariant({ ...data, id }))
      setValue('phone', '')
      setValue('birthday', '')
      setValue('role', '-')

      notifySuccess(
        setOpen
          ? 'Данные сотрудника успешно изменены'
          : 'Новый сотрудник сохранён в базу. Продолжайте заведение, или нажмите "отмена" для выхода'
      )
    } catch (e) {
      notifyError(`Ошибка ${e}. Попробуйте позже или обратитесь в поддержку. `)
      console.log(e)
    } finally {
      reset()
      setOpen && setOpen(false) // если передан setOpen, значит это модалка, закрываем её
      setTimeout(() => {
        // блокировка кнопки на имитационное время выполнения запроса
        setIsButtonDisabled(false)
      }, 300)
    }
  }

  const handleEscape = () => {
    if (setOpen) {
      setOpen(false)
      setValidateError({})
    } else {
      reset()
      setValidateError({})
      navigate(PATHS.TABLE)
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <span className={s.title}>
        {typeForm === 'create-employee-page' ? 'Добавить сотрудника' : 'Редактировать'}
      </span>
      <FormEmployeeInput
        className={s.formInput}
        control={control}
        label={'Имя'}
        name={'name'}
        validateError={validateError}
      />
      <FormEmployeeInput
        className={s.formInput}
        control={control}
        label={'Телефон'}
        mask={'+7 (999) 999-99-99'}
        name={'phone'}
        placeholder={'+7 (___) ___-__-__'}
        type={'tel'}
        validateError={validateError}
      />
      <FormEmployeeInput
        className={s.formInput}
        control={control}
        label={'Должность'}
        name={'role'}
        type={'role'}
        validateError={validateError}
      />
      <FormEmployeeInput
        className={s.formInput}
        control={control}
        label={'Дата рождения'}
        mask={'99.99.9999'}
        name={'birthday'}
        placeholder={'дд.мм.гггг'}
        type={'tel'}
        validateError={validateError}
      />
      <FormEmployeeInput
        className={s.formCheckbox}
        control={control}
        label={'Архив'}
        name={'isArchive'}
        type={'checkbox'}
        validateError={validateError}
      />
      <div className={s.buttonWrapper}>
        <FormEmployeeButton disabled={isButtonDisabled} type={'submit'}>
          {typeForm === 'create-employee-page' ? 'Создать' : 'Сохранить изменения'}
        </FormEmployeeButton>
        <FormEmployeeButton onClick={handleEscape} type={'button'}>
          Отмена
        </FormEmployeeButton>
      </div>
    </form>
  )
}
