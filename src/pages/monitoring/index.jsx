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
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const Dashboard = () => {
  var options = {
    xaxis: {
      categories: [1, 3, 5, 7, 9, 11]
    }
  };

  const series = [
    {
      name: "Humidity",
      data: [45, 50, 55, 60, 75, 62.3]
    },
    {
      name: "Temperature",
      data: [22, 15, 17, 18, 22, 26.5]
    }
  ];

  const chart = () => {
    return <ReactApexcharts options={options} series={series} height={600} width={1000} type="area" />
  }

  return (
    <ApexChartWrapper>
      <Grid container spacing={12}>
        <Grid item xs={12} md={4}>
          {chart()}
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
