import React, { useEffect, useState } from 'react'
import { deleteLogo, getAllLogo } from '../../../api/requests'
import { Button, Card, CardActions, CardMedia, Grid } from '@mui/material'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

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
    <h1 style={{fontFamily:'sans-serif', textAlign:'center', fontFamily:'Lobster'}}>Logos</h1>

    <Grid container spacing={2} style={{padding:'0 40px'}}>
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
                  <Button size="small" onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteLogo(logo._id).then((res) => {
                          Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )

                        })
                        setLogos(logos.filter((x) => x._id !== logo._id))
                      }
                    })
                  }}>Delete</Button>
                  <Button size="small"><Link style={{textDecoration:'none'}} to={`/admin/logo/edit/${logo._id}`}>Edit</Link></Button>
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