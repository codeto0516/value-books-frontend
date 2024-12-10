import { forwardRef, type ComponentProps } from 'react'
import { TextField as MuiTextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { FORM_SIZE } from '@/shared/constants/form'

interface TextFieldProps extends ComponentProps<typeof MuiTextField> {}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  return (
    <MuiTextField
      {...props}
      inputRef={ref}
      size={props.size ?? FORM_SIZE}
      placeholder={props.placeholder ?? (props.label as string)}
      fullWidth={props.fullWidth ?? true}
    />
  )
})

TextField.displayName = 'TextField'

//////////////////////////////////////////////////////////////////////////////////////////
// React Hook Formを使用するTextField
//////////////////////////////////////////////////////////////////////////////////////////
interface RHFTextFieldProps extends TextFieldProps {
  name: string
}

export const RHFTextField = forwardRef<HTMLInputElement, RHFTextFieldProps>((props, ref) => {
  const form = useFormContext()

  if (!form) {
    throw new Error('RHFTextFieldを使用する場合はFormProviderでラップしてください')
  }

  return (
    <Controller
      name={props.name}
      control={form.control}
      render={({ field }) => <TextField {...field} {...props} ref={ref} />}
    />
  )
})

RHFTextField.displayName = 'RHFTextField'
