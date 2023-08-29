import React from 'react'
import Counts from './Counts'
import { Grid } from '@mui/material'

const Dashboard = () => {
  return (
  <>
   <Grid container spacing={2}>
   <Grid item xs={6} md={8}>
 <Counts/>
   </Grid>

   </Grid>
 
  </>
  )
}

export default Dashboard