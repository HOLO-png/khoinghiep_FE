// ** MUI Imports
import Grid from '@mui/material/Grid'
// ** Icons Imports
import CardMembership from './CardMembership'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'

import TemperatureCelsius from 'mdi-material-ui/TemperatureCelsius'
import PowerPlug from 'mdi-material-ui/PowerPlug'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import CosineWave from 'mdi-material-ui/CosineWave'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import CounterTemp from './fragment/CounterTemp'

// ** Icons Imports

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const CardTemp = ({ title, description, optionRenders, data }) => {
  const theme = useTheme()

  var options = {
    chart: {
      height: 280,
      type: 'radialBar'
    },
    series: [+data],
    colors: [
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.primary.main,
      theme.palette.background.default,
      theme.palette.background.default
    ],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: '70%',
          background: '#ffd26a'
        },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15
          }
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: '#fff',
            fontSize: '13px'
          },
          value: {
            color: '#fff',
            fontSize: '30px',
            show: true
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        gradientToColors: ['#87D4F9'],
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    }
  }

  const chart = () => {
    return <ReactApexcharts type='radialBar' height={205} options={options} series={[+data]} />
  }

  const tabs = [
    {
      content: () => {
        return (
          <>
            <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
              {title}
            </Typography>
            <Typography variant='body2'>
              {description}
            </Typography>
            <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
            <Grid container spacing={4}>
              {optionRenders?.map((option, idx) =>
                <Grid item xs={8} sm={4} key={idx}>
                  <StyledBox>
                    {option.render()}
                  </StyledBox>
                </Grid>
              )}
            </Grid>
          </>
        )
      },
      idx: '1'
    },
    {
      content: () => {
        return (
          <>
            <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
              {title}
            </Typography>
            <Typography variant='body2'>
              {description}
            </Typography>
            <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
            <Grid container spacing={4}>
              {optionRenders?.map((option, idx) =>
                <Grid item xs={8} sm={4} key={idx}>
                  <StyledBox>
                    {option.render()}
                  </StyledBox>
                </Grid>
              )}
            </Grid>
          </>
        )
      },
      idx: '2'
    }
  ]

  return (
    <Grid item xs={12} md={10}>
      <CardMembership chart={chart()} tabs={tabs} />
    </Grid>
  )
}

export default CardTemp
