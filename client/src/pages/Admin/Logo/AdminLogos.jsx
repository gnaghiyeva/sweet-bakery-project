import React, { useEffect, useState } from 'react'
import { getAllLogo } from '../../../api/requests'
import { Button, Card, CardActions, CardMedia, Grid } from '@mui/material'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import favicon from '../../../assets/favicon-logo.png'
const AdminLogos = () => {
  const [logos, setLogos] = useState([])
  useEffect(() => {
    getAllLogo().then((res) => {
      setLogos(res.data)
      console.log(res.data)
    })
  }, [logos])
  return (
    <>
      <Helmet>
        <title>Admin Logo</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
      <h1 style={{textAlign: 'center', fontFamily: 'Lobster' }}>Logos</h1>

      <Grid container spacing={2} style={{ padding: '0 40px' }}>
        {logos && logos.map((logo) => {
          return (
            <Grid item xs={6} md={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={logo.image}
                  title="green iguana"
                />
                <CardActions>
                  <Button size="small"><Link style={{ textDecoration: 'none' }} to={`/admin/logo/edit/${logo._id}`}>Edit</Link></Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}

      </Grid>

    </>
  )
}

export default AdminLogos