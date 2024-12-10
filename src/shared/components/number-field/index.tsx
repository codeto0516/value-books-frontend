import { forwardRef, type ComponentProps } from 'react'
import { TextField } from '@mui/material'
import type { NumericFormatProps } from 'react-number-format'
import { NumericFormat } from 'react-number-format'

interface NumberFieldProps extends Omit<ComponentProps<typeof TextField>, 'inputComponent' | 'inputProps'> {
  thousandSeparator?: boolean
  decimalScale?: number
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>((props, ref) => {
  const { thousandSeparator = true, decimalScale, ...rest } = props

  return (
    <TextField
      {...rest}
      inputRef={ref}
      InputProps={{
        inputComponent: NumericFormatCustom as any,
        inputProps: {
          thousandSeparator,
          decimalScale

          // isNumericString: true
        }
      }}
    />
  )
})

NumberField.displayName = 'NumberField'

const NumericFormatCustom = forwardRef<HTMLInputElement, NumericFormatProps<HTMLInputElement>>((props, ref) => {
  const { onChange, ...rest } = props

  return (
    <NumericFormat
      {...rest}
      getInputRef={ref} // Material UI の ref に対応
      onValueChange={values => {
        const { floatValue } = values // 数値型の値
        if (onChange) {
          onChange({
            target: {
              value: floatValue ?? '' // 数値型の値を渡す
            }
          } as React.ChangeEvent<HTMLInputElement>)
        }
      }}
    />
  )
})

NumericFormatCustom.displayName = 'NumericFormatCustom'

//////////////////////////////////////////////////////////////////////////////////////////
// React Hook Formを使用するNumberField
//////////////////////////////////////////////////////////////////////////////////////////
import { Controller, useFormContext } from 'react-hook-form'

interface RHFNumberFieldProps extends Omit<NumberFieldProps, 'name'> {
  name: string
}

export const RHFNumberField = forwardRef<HTMLInputElement, RHFNumberFieldProps>((props, ref) => {
  const form = useFormContext()

  if (!form) {
    throw new Error('RHFNumberFieldを使用する場合はFormProviderでラップしてください')
  }

  return (
    <Controller
      name={props.name}
      control={form.control}
      render={({ field, fieldState: { error } }) => (
        <NumberField
          {...field}
          {...props}
          inputRef={ref} // React Hook Form と連携するため ref を設定
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  )
})

RHFNumberField.displayName = 'RHFNumberField'
