import { Ref, useId } from 'react'
import { Control, useController } from 'react-hook-form'
import InputMask from 'react-input-mask'

import s from './form-input.module.scss'

type FormInputProps = {
  className?: string
  control: Control
  errorMsg?: string
  label: string
  mask?: string
  name: string
  placeholder?: string
  type?: string
}

export const FormInput = (props: FormInputProps) => {
  const { className, control, label, mask = '', name, placeholder, type = 'text', ...rest } = props

  const id = useId()
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController({
    control,
    defaultValue: '',
    name,
  })

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
          onBlur={onBlur}
          onChange={e => {
            onChange(e.target.value)
          }}
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
  } else {
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
        ></InputMask>
        {error && <span style={{ color: 'red' }}>{error.message}</span>}
      </div>
    )
  }
}
