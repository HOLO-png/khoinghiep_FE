// ** MUI Imports
import Grid from '@mui/material/Grid'
// ** Icons Imports
import CardMembership from './CardMembership'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LightAction from './fragment/LightAction'

// ** Icons Imports

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const CardTemp = ({ title, description, optionRenders }) => {

  const chart = () => {
    return <LightAction />
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
              {optionRenders?.map((option, index) =>
                <Grid item xs={8} sm={12} key={index}>
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
              {optionRenders?.map((option, index) =>
                <Grid item xs={8} sm={4} key={index}>
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
      <CardMembership chart={chart()} tabs={tabs} style={{ marginLeft: '300px' }} />
    </Grid>
  )
}

export default CardTemp
