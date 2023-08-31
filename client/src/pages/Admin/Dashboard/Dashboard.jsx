import React from 'react'
import Counts from './Counts'
import { Grid } from '@mui/material'
import Skills from './Skills'
import Team from './Team'
import Cards from './Cards'
import favicon from '../../../assets/favicon-logo.png'
import { Helmet } from 'react-helmet'
const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
      <Cards />
      <Grid container spacing={2} style={{ padding: '0 30px', backgroundColor: 'rgb(244,245,250)' }}>
        <Grid item xs={12} md={12} >
          <Team />

        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ padding: '0 30px', backgroundColor: 'rgb(244,245,250)' }}>
        <Grid item xs={12} md={6}>
          <Counts />
        </Grid>
        <Grid item xs={12} md={6}>
          <Skills />
        </Grid>

      </Grid>

    </>
  )
}

export default Dashboard