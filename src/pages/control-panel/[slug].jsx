// ** MUI Imports
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
// ** Demo Components Imports
import CardTemp from 'src/views/cards/CardTemp'
import CardLed from 'src/views/cards/CardLed'

import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import PowerPlug from 'mdi-material-ui/PowerPlug'
import TemperatureCelsius from 'mdi-material-ui/TemperatureCelsius'
import CosineWave from 'mdi-material-ui/CosineWave'

import AlphaDBox from 'mdi-material-ui/AlphaDBox'
import Update from 'mdi-material-ui/Update'

import CounterTemp from 'src/views/cards/fragment/CounterTemp'

import AccountOutline from 'mdi-material-ui/AccountOutline'
import FireCircle from 'mdi-material-ui/FireCircle'

import AlphaS from 'mdi-material-ui/AlphaS'
import FireAlert from 'mdi-material-ui/FireAlert'

import Thermometer from 'mdi-material-ui/Thermometer'
import { lefOff, lefOn, useLightStore } from 'src/@core/store/light-store'
import { useNotificationStore } from 'src/@core/store/notification-store'
import { DEVICE_ENDPOINT, LIGHT_ENDPOINT } from 'src/@core/constant/APIEndpoint'
import { useSocketStore } from 'src/@core/store/socket-store'
import { useSession } from 'next-auth/react'
import CardSeft from 'src/views/cards/CardSeft'
import CardOnFire from 'src/views/cards/CardOnFire'
import { useDeviceStore } from 'src/@core/store'
import { useEffect } from 'react'
import { useLoadingStore } from 'src/@core/store/loading-store'


const CardBasic = () => {
  const setStatusLightApi = useLightStore((s) => s.setStatusLightApi)
  const getDeviceStatus = useDeviceStore((s) => s.getDeviceStatus)
  const device = useDeviceStore((s) => s.device)
  const { dispatchLoading } = useLoadingStore()

  const isTurnOn = useLightStore((s) => s.isTurnOn)

  const createNotify = useNotificationStore((s) => s.createNotify)
  const session = useSession()
  const { data: user } = session
  const userInfo = user?.user?.user
  const light = useLightStore((s) => s.light)
  const socket = useSocketStore((s) => s.socket)

  useEffect(() => {
    if (socket && user?.user) {
      getDeviceStatus(DEVICE_ENDPOINT, user?.user, socket)
    }
    dispatchLoading(false)
  }, [dispatchLoading, getDeviceStatus, socket, user?.user])


  const temperatureOptions = [
    {
      render: () => (
        <>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
            <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Sensor</Typography>
            <Switch defaultChecked size='small' />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <CounterTemp counter={5} limit={10} />
          </Box>
        </>
      ),
    },
    {
      render: () => (
        <>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
            <PowerPlug sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Power: 3 -{'>'} 5 VDC</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TemperatureCelsius sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Temp range: 0 - 50°C (2°C)</Typography>
          </Box>
        </>
      )
    },
    {
      render: () => (
        <>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
            <Thermometer sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Temperature: 50°C</Typography>
          </Box>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
            <CosineWave sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Samplefrequency: 1Hz(1s/time)</Typography>
          </Box>
        </>

      )
    },

  ]

  const humidityOptions = [
    {
      render: () => (
        <>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Sensor</Typography>
            <Switch defaultChecked size='small' />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <CounterTemp counter={5} limit={20} />
          </Box>
        </>
      ),
    },
    {
      render: () => (
        <>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
            <PowerPlug sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Power: 3 -{'>'} 5 VDC</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TemperatureCelsius sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Humi range: 20 - 90°C (5°C)</Typography>
          </Box>
        </>
      )
    },
    {
      render: () => (
        <>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
            <Thermometer sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Humidity: 74°C</Typography>
          </Box>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
            <CosineWave sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Samplefrequency: 1Hz(1s/time)</Typography>
          </Box>
        </>
      )
    },
  ]

  const safeStateOptions = [
    {
      render: () => (
        <>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
            <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Sensor 1</Typography>

          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AlphaS sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>{device?.AntiFire?.Status === 'yes' ? 'Active status' : ''}</Typography>
          </Box>
        </>
      ),
    },
    {
      render: () => (
        <>
          <Box >
            <AlphaDBox sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='caption'>Number of intrucsion detections</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Update sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>{device?.AntiTheft.Times} times/Day</Typography>
          </Box>
        </>
      )
    },
  ]

  const onNotifySuccess = (isNotify) => {
    if (userInfo) {
      const params = {
        userId: userInfo?._id,
        title: 'Light action',
        body: `Light status is ${isNotify === 1 ? 'on' : 'off'}`,
        image: !isTurnOn ? lefOn : lefOff,
        status: isNotify.toString(),
      }
      const data = { params, auth: user?.user, socket }
      createNotify(data)
    }
  }

  const ledOptions = [
    {
      render: () => {
        const handleTurnLed = (event) => {
          if (!event.target.checked) {
            setStatusLightApi(LIGHT_ENDPOINT, { Led: { Status: 0 } }, socket, onNotifySuccess)
          } else {
            setStatusLightApi(LIGHT_ENDPOINT, { Led: { Status: 1 } }, socket, onNotifySuccess)
          }
        }

        return (
          <>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body2'>Turn</Typography>
              <Switch checked={light !== lefOff} size='small' onChange={handleTurnLed} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccountOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <CounterTemp counter={5} limit={20} />
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <CosineWave sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
              <Typography variant='body2'>Watt total power comsumption: 12KW/H</Typography>
            </Box>
          </>
        )
      },
    }
  ]

  const fireStateOptions = [
    {
      render: () => (
        <>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
            <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>Sensor 1</Typography>

          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AlphaS sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>{device?.AntiFire?.Status === 'yes' ? 'Active status' : ''}</Typography>
          </Box>
        </>
      ),
    },
    {
      render: () => (
        <>
          <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
            <FireAlert sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='caption'>flammable gas concentration</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FireCircle sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
            <Typography variant='body2'>{device?.AntiFire.PPM} PPM</Typography>
          </Box>
        </>
      )
    },
  ]

  if (!device) {
    return <></>
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Control Device</Typography>
      </Grid>
      <CardTemp data={device?.Temperature?.Data.toFixed(2)} title="Temperature" description="Temperature is a physical property of matter, roughly understood as a scale of 'hot' and 'cold'. It is the
              manifestation of thermal energy, present in all matter" optionRenders={temperatureOptions} />
      <CardTemp data={device?.Humidity?.Data.toFixed(2)} title="Humidity" description="Air humidity is the amount of water vapor present in the air, water in the form of water vapor and difficult to perceive by the human eye. Humidity directly affects the living environment of humans, our daily activities and production." optionRenders={humidityOptions} />
      <CardLed title="Led" description="you can control the lights in your room with just 1 click" optionRenders={ledOptions} />
      <CardSeft title="Anti Theft" description="The safe state will notify you of the risks of unauthorized entry and possible danger to you and your loved ones." optionRenders={safeStateOptions} />
      <CardOnFire title="Anti Fire" description="When there is a fire incident, the fire alarm system is activated and reports the exact location of the incident on the map based on that, the supervisor or the fire protection agency has a plan to handle it promptly and quickly." optionRenders={fireStateOptions} />
    </Grid>
  )
}

export default CardBasic
