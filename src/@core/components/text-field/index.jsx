import { Box, TextField } from '@mui/material'
import clsx from 'clsx'
import styles from './style.module.scss'
import { forwardRef } from 'react'

const InputBaseClasses = {
  root: styles.InputBaseRoot,
  focused: styles.InputBaseFocused,
  error: styles.InputBaseError,
  disabled: styles.InputBaseDisabled
}

const InputLabelClasses = {
  root: clsx(styles.LabelRoot, styles.Caption),
  focused: styles.LabelFocused,
  error: styles.LabelError,
  disabled: styles.LabelDisabled
}

const FormHelperTextClasses = {
  root: styles.HelperTextRoot,
  error: styles.HelperTextError
}

const BaseInputField = forwardRef((props, ref) => {
  const { InputLabelProps, FormHelperTextProps, className, variant, ...rest } = props

  return (
    <Box className={variant === 'outlined' ? styles.ContainerBox : styles.LineBox}>
      <TextField
        {...rest}
        className={className}
        ref={ref}
        InputLabelProps={{
          shrink: true,
          classes: InputLabelClasses,
          ...InputLabelProps
        }}
        FormHelperTextProps={{
          classes: FormHelperTextClasses,
          ...FormHelperTextProps
        }}
      />
    </Box>
  )
})

export const LineInputField = forwardRef((props, ref) => {
  return (
    <BaseInputField
      {...props}
      variant='standard'
      ref={ref}
      className={clsx(styles.InputField, styles.LineInputField, props.className)}
      InputProps={{
        classes: {
          ...InputBaseClasses
        },
        ...props.InputProps
      }}
    />
  )
})

export const ContainerInputField = forwardRef((props, ref) => {
  return (
    <BaseInputField
      {...props}
      variant='outlined'
      ref={ref}
      className={clsx(styles.InputField, styles.ContainerInputField, props.className)}
      InputProps={{
        classes: {
          ...InputBaseClasses,
          notchedOutline: styles.NotchedOutline
        },
        ...props.InputProps
      }}
    />
  )
})

export const TextareaField = forwardRef((props, ref) => {
  const {
    InputProps,
    InputLabelProps,
    FormHelperTextProps,
    className,
    maxRows = 4,
    minRows = 1,
    label,
    ...rest
  } = props

  return (
    <TextField
      {...rest}
      label={label}
      multiline
      ref={ref}
      maxRows={maxRows}
      minRows={minRows}
      variant='outlined'
      className={clsx(
        styles.InputField,
        styles.ContainerInputField,
        label ? styles.TextareaField : styles.TextareaNoLabel,
        className
      )}
      InputProps={{
        classes: {
          ...InputBaseClasses,
          notchedOutline: styles.NotchedOutline
        },
        ...InputProps
      }}
      InputLabelProps={{
        shrink: true,
        classes: InputLabelClasses,
        ...InputLabelProps
      }}
      FormHelperTextProps={{
        classes: FormHelperTextClasses,
        ...FormHelperTextProps
      }}
    />
  )
})
