import { forwardRef, type ComponentProps } from 'react'
import { TextField } from '@mui/material'
import AppReactDatepicker from './AppReactDatepicker'
import { Controller, useFormContext } from 'react-hook-form'
import { FORM_SIZE } from '@/shared/constants/form'

type DatePickerProps = Omit<ComponentProps<typeof AppReactDatepicker>, 'select' | 'onChange'> & {
  name?: string
  required?: boolean
  label?: string
  readOnly?: boolean
  errorMessage?: string
  size?: 'small' | 'medium'
  placeholder?: string
  value?: Date | null
  onChange?: (date: Date | null) => void
  fullWidth?: boolean
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>((props, ref) => {
  return (
    <AppReactDatepicker
      name={props?.name}
      selected={props.value ? new Date(props.value) : null}
      onChange={date => props.onChange?.(date)}
      customInput={
        <TextField
          fullWidth={props.fullWidth ?? true}
          size={props.size ?? FORM_SIZE}
          placeholder={props.placeholder ?? props.label}
          label={props.label}
          required={props.required}
          error={!!props.errorMessage}
          helperText={props.errorMessage}
          inputRef={ref}
        />
      }
      dateFormat='yyyy/MM/dd'
    />
  )
})

//////////////////////////////////////////////////////////////////////////////////////////
// React Hook Formを使用するDatePicker
//////////////////////////////////////////////////////////////////////////////////////////
type RHFDatePickerProps = DatePickerProps & {
  name: string
}

export const RHFDatePicker = forwardRef<HTMLInputElement, RHFDatePickerProps>((props, ref) => {
  const form = useFormContext()

  if (!form) {
    throw new Error('RHFDatePickerを使用する場合はFormProviderでラップしてください')
  }

  return (
    <Controller
      name={props.name}
      control={form.control}
      render={({ field }) => (
        <DatePicker
          {...field}
          {...props}
          ref={ref} // refをDatePickerに渡す
          onChange={date => {
            field.onChange(date) // RHFのstateを更新
            props.onChange?.(date) // 任意の追加のonChangeを実行
          }}
        />
      )}
    />
  )
})
