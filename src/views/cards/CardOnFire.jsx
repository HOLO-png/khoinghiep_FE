// ** MUI Imports
import Grid from '@mui/material/Grid'
// ** Icons Imports
import CardMembership from './CardMembership'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'


// ** Icons Imports

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const image = 'https://static.vecteezy.com/system/resources/thumbnails/018/888/343/small/yellow-fire-icon-png.png'
const CardSeft = ({ title, description, optionRenders, data }) => {
  const chart = () => {
    return (
      <section>
        <img src={image} id='bulb' width={140} alt='' />
      </section>
    )
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

export default CardSeft
