import { forwardRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FormTextInput } from './FormControl'

const FormWrapper = (props, ref) => {
  const { inputs, mode = 'onSubmit' } = props

  const form = useForm({
    mode: mode
  })

  useEffect(() => {
    if (ref) {
      ref.current = form
    }
  }, [form, ref])

  return (
    <form>
      {inputs.map(i => {
        switch (i.type) {
          case 'input':
          case 'number':
          case 'password':
            return <FormTextInput key={i.name} control={i} form={form} />
          default:
            break
        }
      })}
    </form>
  )
}

export const FormProvider = forwardRef(FormWrapper)
