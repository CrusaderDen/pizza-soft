import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Employee } from '@/api/app-api.types'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { PATHS } from '@/common/paths'
import { notifyError, notifySuccess } from '@/common/toastConfig'
import { FormButton } from '@/components/employee-form/form-button/form-button'
import { customValidator } from '@/components/employee-form/form-input/custom-validator'
import { FormInput } from '@/components/employee-form/form-input/form-input'

import s from './employee-form.module.scss'

type EmployeeFormProps = {
  dispatchVariant: any
  id?: number
  setOpen?: (open: boolean) => void
  typeForm: 'create-employee-page' | 'edit-form'
}
export const EmployeeForm = ({ dispatchVariant, id, setOpen, typeForm }: EmployeeFormProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { employees } = useAppSelector(state => state.employees)

  const { control, handleSubmit, reset, setValue } = useForm()
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [validateError, setValidateError] = useState({})

  function filterById(employees: Employee[], id: number): Employee | undefined {
    return employees.find(employee => employee.id === id)
  }

  useEffect(() => {
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
  }, [id, employees, setValue])

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
      <FormInput
        className={s.formInput}
        control={control}
        label={'Имя'}
        name={'name'}
        validateError={validateError}
      />
      <FormInput
        className={s.formInput}
        control={control}
        label={'Телефон'}
        mask={'+7 (999) 999-99-99'}
        name={'phone'}
        placeholder={'+7 (___) ___-__-__'}
        type={'number'}
        validateError={validateError}
      />
      <FormInput
        className={s.formInput}
        control={control}
        label={'Должность'}
        name={'role'}
        type={'role'}
        validateError={validateError}
      />
      <FormInput
        className={s.formInput}
        control={control}
        label={'Дата рождения'}
        mask={'99.99.9999'}
        name={'birthday'}
        placeholder={'дд.мм.гггг'}
        type={'number'}
        validateError={validateError}
      />
      <FormInput
        className={s.formCheckbox}
        control={control}
        label={'Архив'}
        name={'isArchive'}
        type={'checkbox'}
        validateError={validateError}
      />
      <div className={s.buttonWrapper}>
        <FormButton disabled={isButtonDisabled} type={'submit'}>
          {typeForm === 'create-employee-page' ? 'Создать' : 'Сохранить изменения'}
        </FormButton>
        <FormButton onClick={handleEscape} type={'button'}>
          Отмена
        </FormButton>
      </div>
    </form>
  )
}
