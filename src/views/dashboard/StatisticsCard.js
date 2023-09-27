// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
// ** Icons Imports
import TemperatureCelsius from 'mdi-material-ui/TemperatureCelsius'
import WaterCheckOutline from 'mdi-material-ui/WaterCheckOutline'
import DotsVertical from 'mdi-material-ui/DotsVertical'

const TrophyImg = styled('img')({
  right: 36,
  bottom: '10%',
  height: 98,
  position: 'absolute'
})



const renderStats = (device) => {

  const salesData = [
    {
      stats: `${device?.Temperature?.Data.toFixed(2) ?? ''} °C`,
      title: 'Temperature',
      color: 'primary',
      icon: <TemperatureCelsius sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: `${device?.Humidity?.Data.toFixed(2) ?? ''} %`,
      title: 'Humidity',
      color: 'success',
      icon: <WaterCheckOutline sx={{ fontSize: '1.75rem' }} />
    }
  ]

  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}>
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCard = ({ device }) => {


  return (
    <Card style={{ position: 'relative' }}>
      <CardHeader
        title='Weather'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Few Clouds
            </Box>{' '}
            😎
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(device)}
        </Grid>
      </CardContent>
      <TrophyImg alt='trophy' src='/images/misc/1779940.png' />
    </Card>
  )
}

export default StatisticsCard
