import { ComponentPropsWithoutRef, Ref, forwardRef, useId } from 'react'
import { useController } from 'react-hook-form'
import InputMask from 'react-input-mask'

import s from './form-input.module.scss'

type FormInputProps = {
  className?: string
  errorMsg?: string
  label: string
  placeholder?: string
  type?: string
} & ComponentPropsWithoutRef<'input'> &
  ComponentPropsWithoutRef<'select'>

export const FormInput = forwardRef<HTMLInputElement | HTMLSelectElement, FormInputProps>(
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

export const CustomInput = ({
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
