import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { ContainerInputField } from '../text-field'

export const FormTextInput = (props) => {
  const { form, control } = props
  const [isShow, setIsShow] = useState(false)

  const error = form.formState.errors[control.name]

  const renderPasswordIcon = (isShowPassword, type) => {
    if (isShowPassword && type === 'password') {
      return {
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton aria-label='toggle password visibility' onClick={() => setIsShow(!isShow)}>
              {isShow ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }
    }
  }

  return (
    <Controller
      name={control.name}
      control={form.control}
      rules={{
        required: control.required,
        minLength: control.minLength,
        maxLength: control.maxLength,
        pattern: control.pattern,
        validate: control.validate
      }}
      render={({ field }) => (
        <ContainerInputField
          ref={field.ref}
          label={control.label}
          id={control.name}
          onChange={field.onChange}
          onBlur={field.onBlur}
          type={isShow ? 'input' : control.type}
          helperText={error?.message}
          error={Boolean(error)}
          className={control.className}
          placeholder={control.placeholder}
          InputProps={renderPasswordIcon(!!control.isShowPassword, control.type)}
        />
      )}
    />
  )
}

