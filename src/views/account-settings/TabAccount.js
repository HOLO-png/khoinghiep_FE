// ** React Imports
import { useRef, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { useSession } from 'next-auth/react'
import { REGEX_EMAIL } from 'src/@core/constant'
import { Controller, useForm } from 'react-hook-form'
import { useAuthStore, useNotificationStore } from 'src/@core/store'
import { USER_ENDPOINT } from 'src/@core/constant/APIEndpoint'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  const session = useSession()
  const updateUserData = useAuthStore(s => s.updateUserData)
  const dispatchNotification = useNotificationStore(s => s.dispatchNotification)
  const { data: user } = session
  const userInfo = user?.user.user

  const formRef = useRef()

  const form = useForm({
    mode: 'onTouched'
  })

  formRef.current = form

  const inputs = [
    {
      name: 'fullname',
      type: 'text',
      label: 'Full name',
      required: { value: true, message: 'Full name is required' },
      maxLength: { value: 30, message: 'Full name must not exceed 30 characters' },
      minLength: { value: 8, message: 'Full name at least 8 characters' },
      placeholder: userInfo?.fullname,
      defaultValue: userInfo?.fullname
    },
    {
      name: 'phoneNumber',
      type: 'number',
      label: 'Phone number',
      required: { value: true, message: 'Phone number is required' },
      maxLength: { value: 20, message: 'Phone number must not exceed 20 digits' },
      minLength: { value: 8, message: 'Phone number at least 8 digits' },
      placeholder: userInfo?.phoneNumber,
      defaultValue: userInfo?.phoneNumber
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email',
      pattern: { value: REGEX_EMAIL, message: 'Email is invalid' },
      required: { value: true, message: 'Email is required' },
      maxLength: { value: 40, message: 'Email must not exceed 40 digits' },
      minLength: { value: 8, message: 'Email at least 8 digits' },
      placeholder: userInfo?.email,
      defaultValue: userInfo?.email
    },
    {
      name: 'identify',
      type: 'number',
      label: 'Identity card number',
      required: { value: true, message: 'Identity card number is required' },
      maxLength: { value: 10, message: 'Identity card number must not exceed 10 digits' },
      minLength: { value: 1, message: 'Identity card number at least 1 digits' },
      placeholder: userInfo?.identify,
      defaultValue: userInfo?.identify
    }
  ]

  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState()

  const onChange = (file) => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  if (!userInfo) return <></>

  const onSuccess = ({ user }) => {
    session?.update({ ...session.data.user, user })
  }

  const onLogin = (data) => {
    updateUserData(USER_ENDPOINT, { ...data }, user?.user, dispatchNotification, onSuccess)
  }

  const onLoginClick = () => {
    formRef.current?.handleSubmit(onLogin)()
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc || userInfo?.avatar || '/images/avatars/1.png'} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>
          {inputs.map(i => {
            const error = formRef.current?.formState?.errors[i.name]

            return (
              <Grid item xs={12} sm={6} key={i.name}>
                <Controller
                  name={i.name}
                  control={form.control}
                  rules={{
                    required: i.required,
                    minLength: i.minLength,
                    maxLength: i.maxLength,
                    pattern: i.pattern,
                    validate: i.validate
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      ref={field.ref}
                      label={i.label}
                      id={i.name}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      type={i.type}
                      helperText={error?.message}
                      error={Boolean(error)}
                      className={i.className}
                      defaultValue={i.defaultValue}
                      placeholder={i.placeholder}
                    />
                  )}
                />
              </Grid>
            )
          })}
          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }>
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={(e) => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={onLoginClick}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
