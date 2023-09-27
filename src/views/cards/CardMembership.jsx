// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'

import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'


// ** Icons Imports
import { useState } from 'react'


const CardMembership = ({ chart, tabs, style }) => {
  const [value, setValue] = useState('1')

  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  return (
    <Card id="boxLed">
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          <Tab value='1' label='Sensor 1' />
          <Tab value='2' label='Sensor 2' />
        </TabList>
        <CardContent style={{ display: 'flex' }}>
          {tabs?.map((tab, idx) => {
            return (
              <TabPanel value={tab.idx} sx={{ p: 0 }} key={idx}>
                {tab.content()}
              </TabPanel>
            )
          })}
          <Grid
            item
            sm={5}
            xs={12}
            sx={{
              paddingTop: ['0 !important', '1.5rem !important'],
              paddingLeft: ['1.5rem !important', '0 !important'],
              ...style
            }}>
            {chart}
          </Grid>
        </CardContent>
      </TabContext>
    </Card>
  )
}

export default CardMembership
