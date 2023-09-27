// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Sofa from 'mdi-material-ui/Sofa'
import Countertop from 'mdi-material-ui/Countertop'
import BedEmpty from 'mdi-material-ui/BedEmpty'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import { useLoadingStore } from 'src/@core/store/loading-store'
import { useDeviceStore } from 'src/@core/store'
import { useSession } from 'next-auth/react'
import { useSocketStore } from 'src/@core/store/socket-store'
import { useEffect } from 'react'
import { DEVICE_ENDPOINT } from 'src/@core/constant/APIEndpoint'

const Dashboard = () => {

  const getDeviceStatus = useDeviceStore((s) => s.getDeviceStatus)
  const device = useDeviceStore((s) => s.device)
  const { dispatchLoading } = useLoadingStore()
  const session = useSession()
  const { data: user } = session
  const socket = useSocketStore((s) => s.socket)


  useEffect(() => {
    if (socket && user?.user) {
      getDeviceStatus(DEVICE_ENDPOINT, user?.user, socket)
    }
    dispatchLoading(false)
  }, [dispatchLoading, getDeviceStatus, socket, user?.user])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard device={device} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={`Humi: ${device?.Humidity?.Data.toFixed(2)}%`}
                icon={<Sofa />}
                color='success'
                trendNumber='Devi: 5'
                title='Living room'
                subtitle={`Temp: ${device?.Temperature?.Data.toFixed(2)}°C`}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={`Humi: ${device?.Humidity?.Data.toFixed(2)}%`}
                icon={<Countertop />}
                color='secondary'
                trendNumber='Devi: 5'
                title='Kitchen room'
                subtitle={`Temp: ${device?.Temperature?.Data.toFixed(2)}°C`}
              />
            </Grid>
            <Grid item xs={12}>
              <CardStatisticsVerticalComponent
                stats={`Humi: ${device?.Humidity?.Data.toFixed(2)}%`}
                icon={<BedEmpty />}
                trendNumber='Devi: 5'
                title='Bed room'
                subtitle={`Temp: ${device?.Temperature?.Data.toFixed(2)}°C`}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid> */}
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
